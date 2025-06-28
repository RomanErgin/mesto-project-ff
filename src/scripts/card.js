import { deleteCardFromServer, likeCard, unlikeCard } from './api.js';
export { createCard, deleteCard, handleLikeClick };

// @todo: Функция создания карточки 
function createCard(card, likeHandler, imageHandler, cardTemplate, currentUserId) {
    const cardContent = cardTemplate.querySelector('.card').cloneNode(true);
    const image = cardContent.querySelector('.card__image');
    image.src = card.link;
    image.alt = card.name;
    cardContent.querySelector('.card__title').textContent = card.name;

    // Устанавливаем количество лайков 
    const likeCount = cardContent.querySelector('.card__like-count');
    likeCount.textContent = card.likes.length;

    // Кнопка удаления 
    const deleteBtn = cardContent.querySelector('.card__delete-button');
    if (card.owner._id === currentUserId) {
        deleteBtn.addEventListener('click', () => {
            deleteCardFromServer(card._id)
                .then(res => {
                    if (res.ok) {
                        cardContent.remove();
                    } else {
                        return res.json().then(data => Promise.reject(data));
                    }
                })
                .catch(err => {
                    console.error('Ошибка удаления карточки:', err);
                });
        });
    } else {
        deleteBtn.style.display = 'none'; // Скрыть кнопку, если не владелец 
    }

    const likeButton = cardContent.querySelector('.card__like-button');
    // Устанавливаем активное состояние, если лайк уже есть 
    if (card.likes.some(user => user._id === currentUserId)) {
        likeButton.classList.add('card__like-button_is-active');
    }
    likeButton.addEventListener('click', () => {
        const isLiked = likeButton.classList.contains('card__like-button_is-active');
        const action = isLiked ? unlikeCard : likeCard;
        action(card._id)
            .then(updatedCard => {
                likeCount.textContent = updatedCard.likes.length;
                if (updatedCard.likes.some(user => user._id === currentUserId)) {
                    likeButton.classList.add('card__like-button_is-active');
                } else {
                    likeButton.classList.remove('card__like-button_is-active');
                }
            })
            .catch(err => {
                console.error('Ошибка лайка:', err);
            });
    });

    image.addEventListener('click', imageHandler);

    return cardContent;
}

// @todo: Функция удаления карточки 
function deleteCard(evt) {
    const card = evt.target.closest('.card');
    card.remove();
}

// Функция обработки клика по лайку 
function handleLikeClick(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
} 