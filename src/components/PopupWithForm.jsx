export default function PopupWithForm({ name, title, buttonText, children, isOpen, onClose, onSubmit, isSending, isValid=true }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div
        className={`popup__container ${name === "delete" ? 'popup__container_delete' : ''} ${name === "avatar" ? 'popup__container_avatar' : ''}`}
      >
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form ${name === "delete" ? 'popup__form_delete' : ''} ${name === "avatar" ? 'popup__form_avatar' : ''}`}
          name={name}
          method="get"
          action="#"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`popup__button ${isValid ? '' : `popup__button_disabled`}`}
            type="submit"
            disabled={isSending}
          >
            {isSending ? `${buttonText} ...` : buttonText}
          </button>
        </form>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}