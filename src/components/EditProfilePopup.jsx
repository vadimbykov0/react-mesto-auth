import { useContext, useEffect } from "react";

import useFormValidation from "../utils/useFormValidation";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { setValue, reset, values, errors, isValid, isInputValid, handleChange } = useFormValidation();

  useEffect(() => {
    setValue("name", currentUser.name);
    setValue("about", currentUser.about);
  }, [currentUser, setValue]);

  function resetForClose() {
    onClose();
    reset({
      name: currentUser.name,
      about: currentUser.about
    })
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about
    }, reset)
  };

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={resetForClose}
      isValid={isValid}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__input ${isInputValid.name === undefined || isInputValid.name ? "" : `popup__input-error`}`}
        placeholder="Введите имя"
        id="name"
        name="name"
        type="text"
        minLength={2}
        maxLength={40}
        required
        onChange={handleChange}
        value={values.name ? values.name : ''}
        disabled={isLoading}
      />
      <span className="popup__error popup__error_visible">{errors.name}</span>
      <input
        className={`popup__input ${isInputValid.about === undefined || isInputValid.about ? "" : `popup__input-error`}`}
        placeholder="Введите описание"
        id="about"
        name="about"
        type="text"
        minLength={2}
        maxLength={200}
        required
        onChange={handleChange}
        value={values.about ? values.about : ''}
        disabled={isLoading}
      />
      <span className="popup__error popup__error_visible">{errors.about}</span>
    </PopupWithForm>
  );
}