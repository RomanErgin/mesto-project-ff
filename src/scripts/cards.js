export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "Фото гористой местности в селе Архыз",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "Фото реки в лесу Челябинской области",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "Фото жилого района города Иваново",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "Фото подножья горы на Камчатке",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "Фото железной дорогги в лесу Холмогорского района",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "Фото холмов у озера Байкал"
  }
];

// @todo: Функция создания карточки
export function createCard(card, likeHandler, imageHandler, cardTemplate) {
  const cardContent = cardTemplate.querySelector('.card').cloneNode(true);
  const image = cardContent.querySelector('.card__image');
  image.src = card.link;
  image.alt = card.alt;
  cardContent.querySelector('.card__title').textContent = card.name;
  
  const deleteBtn = cardContent.querySelector('.card__delete-button');
  deleteBtn.addEventListener('click', deleteCard);
  
  const likeButton = cardContent.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeHandler);
  
  image.addEventListener('click', imageHandler);
  
  return cardContent;
}

// @todo: Функция удаления карточки
export function deleteCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

// Функция обработки клика по лайку
export function handleLikeClick(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}