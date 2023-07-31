import { useEffect, useState } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [isSendingPopup, setIsSendingPopup] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);
  const [isDeleteCard, setIsDeleteCard] = useState('');

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setIsDeletePopup(false)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }

  function handleDeleteClick(cardId) {
    setIsDeleteCard(cardId)
    setIsDeletePopup(true)
  }

  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
    .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser)
        setCards(dataCards)
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  function handleCardDelete(evt) {
    evt.preventDefault();
    setIsSendingPopup(true);
    api.deleteCard(isDeleteCard)
    .then(() => {
      setCards(cards.filter(i => {
        return i._id !== isDeleteCard
      }))
      closeAllPopups();
      setIsSendingPopup(false);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => setIsSendingPopup(false))
  };

  function handleUpdateUser(dataUser, resetInput) {
    setIsSendingPopup(true);
    api.setUserInfo(dataUser)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups();
      resetInput();
      setIsSendingPopup(false);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => setIsSendingPopup(false))
  };

  function handleUpdateAvatar(dataUser, resetInput) {
    setIsSendingPopup(true);
    api.setUserAvatar(dataUser)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups();
      resetInput();
      setIsSendingPopup(false);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => setIsSendingPopup(false))
  };

  function handleAddPlaceSubmit(dataCard, resetInput) {
    setIsSendingPopup(true);
    api.addNewCard(dataCard)
    .then(res => {
      setCards([res, ...cards]);
      closeAllPopups();
      resetInput();
      setIsSendingPopup(false);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => setIsSendingPopup(false))
  };

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <Header />

    <Main
      onEditProfile = {handleEditProfileClick}
      onAddPlace = {handleAddPlaceClick}
      onEditAvatar = {handleEditAvatarClick}
      onCardClick = {handleCardClick}
      onDelete = {handleDeleteClick}
      cards={cards}
    />

    <Footer />

    <EditProfilePopup
      isOpen = {isEditProfilePopupOpen}
      onClose = {closeAllPopups}
      isSendingPopup = {isSendingPopup}
      onUpdateUser = {handleUpdateUser}
    />

    <AddPlacePopup
      isOpen = {isAddPlacePopupOpen}
      onClose = {closeAllPopups}
      isSendingPopup = {isSendingPopup}
      onAddPlace = {handleAddPlaceSubmit}
    />

    <EditAvatarPopup
      isOpen = {isEditAvatarPopupOpen}
      onClose = {closeAllPopups}
      isSendingPopup = {isSendingPopup}
      onUpdateAvatar = {handleUpdateAvatar}
    />

    <PopupWithForm
      name='delete-card'
      title='Вы уверены?'
      titleButton='Да'
      isOpen={isDeletePopup}
      onClose={closeAllPopups}
      isSendingPopup={isSendingPopup}
      onSubmit={handleCardDelete}
    />
    
    <ImagePopup
      isOpen={isImagePopupOpen}
      onClose={closeAllPopups}
      card={selectedCard}
    />

  </CurrentUserContext.Provider>
  );
}

export default App;