// токен  b78062c5-5b7d-495f-bdff-93ab343408f0
// Идентификатор нашей когорты: wff-cohort-41
const cohortId = 'wff-cohort-41';
const token = 'b78062c5-5b7d-495f-bdff-93ab343408f0';

export { getUser, getCards, deleteCardFromServer, likeCard, unlikeCard, updateAvatar, addCard };

function getUser() {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: 'GET',
    headers: {
      authorization: token
    }
  })
    .then(res => {
      if (!res.ok) console.log(`Ошибка: ${res.status}`);
      return res.json();
    });
}

function getCards() {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: 'GET',
    headers: {
      authorization: token
    }
  })
    .then(res => {
      if (!res.ok) console.log(`Ошибка: ${res.status}`);
      return res.json();
    });
}

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

let currentUserId;

//Запрос пользователя
fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
  method: 'GET',
  headers: {
    authorization: token
  }
})
  .then(res => {
    if (!res.ok) {
      console.log(`Ошибка: ${res.status}`);
    }
    return res.json();
  })
  .then(user => {
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url('${user.avatar}')`;
    currentUserId = user._id;
    console.log('Пользователь загружен:', user);
  })
  .catch(err => {
    console.error('Ошибка запроса:', err);
  });

  //Запрос карточек
  fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: 'GET',
    headers: {
      authorization: token
    }
  })
  .then(res => {
    return res.json();
  })
  .then(res => {
    console.log(res)
  })

  //Редактирование профиля
  fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Роман Ергин',
      about: 'Пытается в веб разработку'
    })
  })
  .then(res => {
    res.json()
  })
  .then(res => {
    console.log(res)
  })

  //Удаление карточки с сервера
  function deleteCardFromServer(cardId) {
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: token
      }
    });
  }

  //Лайкнуть карточку
function likeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: token
    }
  })
    .then(res => {
      if (!res.ok) console.log(`Ошибка: ${res.status}`);
      return res.json();
    });
}
 //Снять лайк
function unlikeCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  })
    .then(res => {
      if (!res.ok) console.log(`Ошибка: ${res.status}`);
      return res.json();
    });
}

//Редактирование аватарки пользователя
fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        avatar: 'https://s0.rbk.ru/v6_top_pics/ampresize/media/img/7/75/347472273420757.jpeg'
    })
})
.then(res => res.json())
.then(user => {
    document.querySelector('.profile__image').style.backgroundImage = `url('${user.avatar}')`;
})
.catch(err => {
    console.error('Ошибка смены аватара:', err);
});

//Смена аватарки
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
    .then(res => {
      if (!res.ok) console.log(`Ошибка: ${res.status}`);
      return res.json();
    });
}

//Добавление карточки
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
    .then(res => {
      if (!res.ok) console.log(`Ошибка: ${res.status}`);
      return res.json();
    });
}