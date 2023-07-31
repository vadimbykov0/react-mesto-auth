import { useContext } from "react";
import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDelete, cards }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <button className="profile__avatar-change" type="button" onClick={onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
          </button>
          <div className="profile__info">
            <div className="profile__box-title">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="Изменить данные профиля"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить карточку с фотографией"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="elements__list">
            {cards.map(data => {
                return (
                  <Card
                    card={data}
                    key={data._id}
                    onCardClick={onCardClick}
                    onDelete={onDelete}
                  />
                )
            })}
        </ul>
      </section>
    </main>
    )
};