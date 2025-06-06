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