// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card) {
    const cardContent = cardTemplate.querySelector('.card').cloneNode(true);
    cardContent.querySelector('.card__image').src = card.link;
    cardContent.querySelector('.card__title').textContent = card.name;
    
    const deleteBtn = cardContent.querySelector('.card__delete-button');
    deleteBtn.addEventListener('click', deleteCard);
    
    return cardContent;
};

// @todo: Функция удаления карточки
function deleteCard(evt) {
    const card = evt.target.closest('.card');
    card.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
    const cardElement = createCard(card);
    placesList.append(cardElement);
});