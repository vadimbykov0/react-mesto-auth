import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup"

import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

import CurrentUserContext from "../contexts/CurrentUserContext";

import api from "../utils/api";
import auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isImagePopup, setImagePopup] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);

  const [cards, setCards] = useState([]);
  const [cardForDelete, setCardForDelete] = useState('');
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  const [headerEmail, setHeaderEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);
  
  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  function closeAllPopups() {
    setProfilePopupOpen(false);
    setPlacePopupOpen(false);
    setAvatarPopupOpen(false);
    setDeletePopupOpen(false);
    setImagePopup(false);
    setIsInfoTooltipPopup(false);
  }

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([dataUser, dataCards]) => {
          setCurrentUser(dataUser);
          setCards(dataCards);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      })
  };

  function handleRegister(data) {
    auth.register(data)
      .then((res) => {
        if (res && res.data) {
          setIsInfoTooltipSuccess(true);
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        setIsInfoTooltipSuccess(false);
        console.log(err);
      })
      .finally(() => setIsInfoTooltipPopup(true));
  };

  function checkToken() {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          if (res && res.data) {
            setLoggedIn(true);
            navigate("/");
            setHeaderEmail(res.data.email);
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      setLoggedIn(false);
    }
  };

  function handleLogin(data) {
    auth.login(data)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          navigate("/");
          setHeaderEmail(data.email);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        setIsInfoTooltipSuccess(false);
        setIsInfoTooltipPopup(true);
        console.log(err);
      });
  };

  function logOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setHeaderEmail('');
  };

  function handleEditProfileClick() {
    setProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setPlacePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setAvatarPopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
  };

  function handleDeleteClick(card) {
    setCardForDelete(card);
    setDeletePopupOpen(true);
  };

  function handleCardDelete(card) {
    setIsSending(true);
    api.deleteCard(cardForDelete._id)
      .then(() => {
        setCards(cards.filter((item) => item !== cardForDelete));
        closeAllPopups();
        setIsSending(false);
      })
      .catch((err) => {
        console.log(`Ошибка при удалении карточки места ${err}`)
      })
  };

  function handleUpdateUser(dataUser, reset) {
    setIsSending(true);
    api.changeUserInfo(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
        setIsSending(false);
      })
      .catch((err) => {
        console.log(`Ошибка при редактировании данных пользователя ${err}`)
      })
      .finally(() => setIsSending(false))
  };

  function handleUpdateAvatar(dataUser, reset) {
    setIsSending(true);
    api.setUserAvatar(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
        setIsSending(false);
      })
      .catch((err) => {
        console.log(`Ошибка при редактировании аватара ${err}`)
      })
      .finally(() => setIsSending(false))
  };

  function handleAddPlaceSubmit(dataCard, reset) {
    setIsSending(true);
    api.addNewCard(dataCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
        setIsSending(false);
      })
      .catch((err) => {
        console.log(`Ошибка при добавлении карточки места ${err}`)
      })
      .finally(() => setIsSending(false))
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          logOut={logOut}
          email={headerEmail}
        />

        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/" : "/sign-in"} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardDelete={handleDeleteClick}
                onCardLike={handleCardLike}
                loggedIn={loggedIn}
                element={Main}
                cards={cards}
              />
            }
          />
        </Routes>

        {loggedIn && <Footer />}
        
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isSending={isSending}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isSending={isSending}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isSending={isSending}
        />

        <ConfirmDeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCardConfirm={handleCardDelete}
          cardId={cardForDelete}
        />

        <ImagePopup
          isOpen={isImagePopup}
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <InfoTooltip
          name='tooltip'
          isOpen={isInfoTooltipPopup}
          onClose={closeAllPopups}
          isSuccess={isInfoTooltipSuccess}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;