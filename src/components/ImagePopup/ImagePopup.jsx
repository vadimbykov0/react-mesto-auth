export default function ImagePopup ({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_photo-place ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__container popup__container_type_photo-place">
        <figure className="popup__photo-container">
          <img className="popup__photo" src={card.link} alt={card.name} />
          <figcaption className="popup__photo-caption">{card.name}</figcaption>
        </figure>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть просмотр фотографии"
          onClick={onClose}
        />
      </div>
    </div>
    )
};