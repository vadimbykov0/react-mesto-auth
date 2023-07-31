import { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormValidation from "../../utils/useFormValidation";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSendingPopup }) {
  const { isValues, isError, isValid, isInputValid, handleInputChange, resetInput } = useFormValidation();
  const input = useRef();

  function resetAfterClosePopup() {
    onClose();
    resetInput();
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
        avatar: input.current.value
    }, resetInput);
  };

  return (
    <PopupWithForm
      name='change-avatar'
      title='Обновить аватар'
      titleButton='Сохранить'
      isOpen = {isOpen}
      onClose = {resetAfterClosePopup}
      onSubmit={handleSubmit}
      isSendingPopup={isSendingPopup}
      isValid={isValid}
    >
      <label className="popup__form-container">
        <input
          className={`popup__input ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input_type_error'}`}
          placeholder="Ссылка на картинку"
          id="avatar"
          name="avatar"
          type="url"
          required
          ref={input}
          value={isValues.avatar ? isValues.avatar : ''}
          onChange={handleInputChange}
          disabled={isSendingPopup}
        />
        <span className="popup__input-error" id="avatar-error">{isError.avatar}</span>
      </label>
    </PopupWithForm>
    )
};