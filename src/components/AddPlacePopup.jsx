import useFormValidation from "../utils/useFormValidation";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation();

  function resetForClose() {
    onClose();
    reset();
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      title: values.title,
      link: values.link
    }, reset)
  };

  return (
    <PopupWithForm
      name='add-place'
      title='Новое место'
      buttonText='Создать'
      isOpen={isOpen}
      onClose={resetForClose}
      isValid={isValid}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label className="popup__form-container">
        <input
          className={`popup__input ${isInputValid.title === undefined || isInputValid.title ? '' : 'popup__input-error'}`}
          placeholder="Название"
          id="title"
          name="title"
          type="text"
          minLength={2}
          maxLength={30}
          required
          onChange={handleChange}
          disabled={isLoading}
          value={values.title ? values.title : ''}
      />
        <span className="popup__error popup__error_visible">{errors.title}</span>
      </label>
      <label className="popup__form-container">
        <input
          className={`popup__input ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input-error'}`}
          placeholder="Ссылка на картинку"
          id="link"
          name="link"
          type="url"
          required
          onChange={handleChange}
          disabled={isLoading}
          value={values.link ? values.link : ''}
        />
        <span className="popup__error popup__error_visible">{errors.link}</span>
      </label>
    </PopupWithForm>
  );
}