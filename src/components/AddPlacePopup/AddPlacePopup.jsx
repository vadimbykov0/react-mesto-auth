import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isSendingPopup }) {
  const { isValues, isError, isValid, isInputValid, handleInputChange, resetInput } = useFormValidation();
  
  function resetAfterClosePopup() {
    onClose();
    resetInput();
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
        title: isValues.title,
        link: isValues.link
    }, resetInput);
  };

  return (
    <PopupWithForm
      name='add-place'
      title='Новое место'
      titleButton='Создать'
      isOpen = {isOpen}
      onClose = {resetAfterClosePopup}
      isValid={isValid}
      onSubmit={handleSubmit}
      isSendingPopup={isSendingPopup}
    >
      <label className="popup__form-container">
        <input
          className={`popup__input ${isInputValid.title === undefined || isInputValid.title ? '' : 'popup__input_type_error'}`}
          placeholder="Название"
          id="title"
          name="title"
          type="text"
          minLength={2}
          maxLength={30}
          required
          onChange={handleInputChange}
          disabled={isSendingPopup}
          value={isValues.title ? isValues.title : ''}
        />
        <span className="popup__input-error" id="title-error">{isError.title}</span>
      </label>
      <label className="popup__form-container">
        <input
          className={`popup__input ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_type_error'}`}
          placeholder="Ссылка на картинку"
          id="link"
          name="link"
          type="url"
          required
          onChange={handleInputChange}
          disabled={isSendingPopup}
          value={isValues.link ? isValues.link : ''}
        />
          <span className="popup__input-error" id="link-error">{isError.link}</span>
      </label>
    </PopupWithForm>
  )
};