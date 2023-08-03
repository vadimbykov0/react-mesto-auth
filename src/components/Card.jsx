import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwnCard = card.owner._id === currentUser._id;
  const isLike = card.likes.some(i => i._id === currentUser._id);

  const handleCardIdDelete = () => onDelete(card._id);
  const handleOnCardLike = () => onCardLike(card);
  const handleImageOpenClick = () => onCardClick({
    link: card.link,
    name: card.name
  });

  return (
    <div className="element">
      <div className="element__item">
        <img
          className="element__image"
          src={card.link}
          alt={card.name}
          onClick={handleImageOpenClick}
        />
        <div className="element__image-info">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like-container">
          <button
            className={`element__like ${isLike ? 'element__like_active' : ''}`}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleOnCardLike}
          />
          <span className="element__like-counter">{card.likes.length}</span>
          </div>
          {isOwnCard && (
            <button
              className="element__image-basket"
              type="button"
              aria-label="Удалить место"
              onClick={handleCardIdDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}