class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
    this._authorization = config.headers.authorization;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    } else {
      return res.json();
    }
  };

  // Обновление аватара пользователя
  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._getResponseData)
  };

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._getResponseData)
  };

  // Загрузка карточек с сервера
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._getResponseData)
  };

  // Изменение данных профиля
  changeUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._getResponseData)
  }

  // Добавление новой карточки
  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link
      })
    })
    .then(this._getResponseData)
  };

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._getResponseData)
  };

  // Установка и снятие лайка
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.deleteLike(id);
    } else {
      return this.setLike(id);
    }
  };

  setLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._getResponseData)
  };

  deleteLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._getResponseData)
  };
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '9137bb04-e1de-4ad8-8efa-6ed924c50a68',
    'Content-Type': 'application/json'
  }
});

export default api;