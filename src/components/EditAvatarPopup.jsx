import { useRef } from "react";

import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../utils/useFormValidation";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const input = useRef();

  const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation();

  function resetForClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: input.current.value
    }, reset)
  };

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={isValid}
    >
      <input
        className={`popup__input ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input-error'}`}
        placeholder="Ссылка на картинку"
        id="avatar"
        name="avatar"
        type="url"
        required
        ref={input}
        onChange={handleChange}
        value={values.avatar ? values.avatar : ''}
        disabled={isLoading}
      />
      <span className="popup__error popup__error_visible">{errors.avatar}</span>
    </PopupWithForm>
  );
}