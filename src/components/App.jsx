import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

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
  const [deleteCardId, setDeleteCardId] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  const [headerEmail, setHeaderEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopup || isDeletePopupOpen || isInfoTooltipPopup;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);

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

  function closeAllPopups() {
    setProfilePopupOpen(false);
    setPlacePopupOpen(false);
    setAvatarPopupOpen(false);
    setDeletePopupOpen(false);
    setImagePopup(false);
    setIsInfoTooltipPopup(false);
  };

  function handleLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then(
        (newCard) => {
          const newCards = cards.map((currentCard) => currentCard._id === card._id ? newCard : currentCard)
          setCards(newCards);
        },
        (err) => {
          console.log(err);
        }
      );
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
    localStorage.removeItem("jwt");
    setHeaderEmail("");
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

  function handleDeleteClick(cardId) {
    setDeleteCardId(cardId);
    setDeletePopupOpen(true);
  };

  function handleDeleteSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    api.deleteCard(deleteCardId)
      .then(() => {
        setCards(cards.filter((i) => {
            return i._id !== deleteCardId;
          })
        );
        closeAllPopups();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  };

  function handleUpdateUser(dataUser, reset) {
    setIsLoading(true);
    api.changeUserInfo(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  };

  function handleUpdateAvatar(dataUser, reset) {
    setIsLoading(true);
    api.setUserAvatar(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  };

  function handleAddPlaceSubmit(dataCard, reset) {
    setIsLoading(true);
    api.addNewCard(dataCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
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
                onDelete={handleDeleteClick}
                onCardLike={handleLike}
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
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name='delete'
          title='Вы уверены?'
          buttonText='Да'
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onSubmit={handleDeleteSubmit}>
        </PopupWithForm>

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