export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose, onSubmit, isSendingPopup, isValid=true }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__container">
        <h2 className={`popup__title ${name === 'delete-card' ? 'popup__title_type_delete' : ''}`}>{title}</h2>
        <form
          className="popup__form"
          name={name}
          method="get"
          action="#"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`popup__save-button ${isValid ? '' : 'popup__save-button_disabled'}`}
            type="submit"
            disabled={isSendingPopup}
          >
          {isSendingPopup ? `${titleButton} ...` : titleButton}
          </button>
        </form>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
    )
};