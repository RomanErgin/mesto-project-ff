// токен  b78062c5-5b7d-495f-bdff-93ab343408f0 
// Идентификатор нашей когорты: wff-cohort-41 
const cohortId = 'wff-cohort-41'; 
const token = 'b78062c5-5b7d-495f-bdff-93ab343408f0'; 

// Универсальный метод для обработки ответов от сервера
function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  // Проверяем, есть ли тело ответа перед вызовом json()
  return res.text().then(text => {
    return text ? JSON.parse(text) : {};
  });
}

export { getUser, getCards, deleteCardFromServer, likeCard, unlikeCard, updateAvatar, addCard, updateProfile }; 

// Получение данных пользователя
function getUser() { 
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, { 
    method: 'GET', 
    headers: { 
      authorization: token 
    } 
  }) 
    .then(getResponseData); 
} 

// Получение карточек
function getCards() { 
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, { 
    method: 'GET', 
    headers: { 
      authorization: token 
    } 
  }) 
    .then(getResponseData); 
} 

// Обновление профиля пользователя
function updateProfile(name, about) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, { 
    method: 'PATCH', 
    headers: { 
      authorization: token, 
      'Content-Type': 'application/json' 
    }, 
    body: JSON.stringify({ 
      name: name, 
      about: about 
    }) 
  }) 
    .then(getResponseData); 
}

// Удаление карточки с сервера 
function deleteCardFromServer(cardId) { 
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, { 
    method: 'DELETE', 
    headers: { 
      authorization: token 
    } 
  })
    .then(getResponseData); 
} 

// Лайкнуть карточку 
function likeCard(cardId) { 
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, { 
    method: 'PUT', 
    headers: { 
      authorization: token 
    } 
  }) 
    .then(getResponseData); 
} 

// Снять лайк 
function unlikeCard(cardId) { 
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, { 
    method: 'DELETE', 
    headers: { 
      authorization: token 
    } 
  }) 
    .then(getResponseData); 
} 

// Обновление аватара пользователя
function updateAvatar(avatarUrl) { 
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, { 
    method: 'PATCH', 
    headers: { 
      authorization: token, 
      'Content-Type': 'application/json' 
    }, 
    body: JSON.stringify({ 
      avatar: avatarUrl 
    }) 
  }) 
    .then(getResponseData); 
} 

// Добавление карточки 
function addCard(name, link) { 
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, { 
    method: 'POST', 
    headers: { 
      authorization: token, 
      'Content-Type': 'application/json' 
    }, 
    body: JSON.stringify({ 
      name: name, 
      link: link 
    }) 
  }) 
    .then(getResponseData); 
}