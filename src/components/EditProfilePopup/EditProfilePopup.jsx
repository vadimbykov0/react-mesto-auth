import { useContext, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSendingPopup }) {
  const currentUser = useContext(CurrentUserContext);
  const { isValues, isError, isValid, isInputValid, handleInputChange, resetInput, setValue } = useFormValidation();

  useEffect(() => {
    setValue("username", currentUser.name);
    setValue("description", currentUser.about);
  }, [currentUser, setValue]);

  function resetAfterClosePopup() {
    onClose();
    resetInput({
        username: currentUser.name,
        description: currentUser.about
     });
  };

  function handleSubmit(e) {
    e.preventDefault(); 
    onUpdateUser({
        username: isValues.username,
        description: isValues.description
    }, resetInput)
  };

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      titleButton='Сохранить'
      isOpen = {isOpen}
      onClose = {resetAfterClosePopup}
      isValid={isValid}
      isSendingPopup={isSendingPopup}
      onSubmit={handleSubmit}
    > 
      <label className="popup__form-container">
        <input
          className={`popup__input ${isInputValid.username === undefined || isInputValid.username ? '' : 'popup__input_type_error'}`}
          placeholder="Введите имя"
          id="username"
          name="username"
          type="text"
          minLength={2}
          maxLength={40}
          required
          onChange={handleInputChange}
          value={isValues.username ? isValues.username : ''}
          disabled={isSendingPopup}
        />
        <span className="popup__input-error" id="username-error">{isError.username}</span>
      </label>
      <label className="popup__form-container">
        <input
          className={`popup__input ${isInputValid.description === undefined || isInputValid.description ? '' : 'popup__input_type_error'}`}
          placeholder="Введите описание"
          id="description"
          name="description"
          type="text"
          minLength={2}
          maxLength={200}
          required
          onChange={handleInputChange}
          value={isValues.description ? isValues.description : ''}
          disabled={isSendingPopup}
        />
        <span className="popup__input-error" id="description-error">{isError.description}</span>
      </label>
    </PopupWithForm>
  )
};