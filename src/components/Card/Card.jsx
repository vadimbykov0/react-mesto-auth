import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import api from "../../utils/api";

export default function Card({ card, onCardClick, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const [isLiked, setIsLiked] = useState(false);
  const [isCounted, setIsCounted] = useState(card.likes.length);

  const isOwn = card.owner._id === currentUser._id;

  const cardLikeButtonClassName = (`element__like-button ${isLiked ? 'element__like-button_active' : ''}`);

  useEffect(() => {
    setIsLiked(card.likes.some(i => i._id === currentUser._id))
  }, [card.likes, currentUser._id]);

  const handleImageOpenClick = () => onCardClick({
    link: card.link,
    name: card.name
  });

  const handleCardIdDelete = () => onDelete(card._id);

  function handleCardLike() {
    if (isLiked) {
      api.removeLike(card._id)
      .then(res => {
        setIsLiked(false)
        setIsCounted(res.likes.length)
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      api.addLike(card._id)
      .then(res => {
        setIsLiked(true)
        setIsCounted(res.likes.length)
      })
      .catch((err) => {
        console.log(err)
      })
    };
  };

  return (
    <li className="element">
      <img
        className="element__img"
        src={card.link}
        alt={card.name}
        onClick={handleImageOpenClick}
      />
      <div className="element__info">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__box">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleCardLike}
          />
          <span className="element__counter-likes">{isCounted}</span>
        </div>
      </div>
      {isOwn && <button
        className="element__remove-button"
        type="button"
        aria-label="Удалить место"
        onClick={handleCardIdDelete}
      />}
    </li>
    )
};