import '../pages/index.css';
import { initialCards} from './cards.js';
import {createCard, handleLikeClick } from './card.js';
import {openModal, closeModal, handleEscape} from './modal.js';


// Импортируем все изображения
import '../images/logo.svg';
import '../images/avatar.jpg';
import '../images/add-icon.svg';
import '../images/delete-icon.svg';
import '../images/edit-icon.svg';
import '../images/like-active.svg';
import '../images/like-inactive.svg';
import '../images/close.svg';

// Находим форму и ее инпуты
const addForm = document.querySelector('form[name="new-place"]');
const placeInput = document.querySelector('.popup__input_type_card-name');
const linkInput = document.querySelector('.popup__input_type_url');

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// Находим кнопку редактирования и попап
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');

// Находим кнопку добавления и попап
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');

// Массив попапов
const modals = [
    document.querySelector('.popup_type_edit'),
    document.querySelector('.popup_type_new-card'),
    document.querySelector('.popup_type_image')
];

// Находим форму в DOM
const editFormElement = document.querySelector('form[name="edit-profile"]');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name') ;
const jobInput = document.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

// Функция обработки клика по изображению
function handleImageClick(evt) {
    // const imagePopup = document.querySelector('.popup_type_image');
    // const popupImage = imagePopup.querySelector('.popup__image');
    // const popupCaption = imagePopup.querySelector('.popup__caption');
    
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    imagePopupCaption.textContent = evt.target.alt;
    
    openModal(imagePopup);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
    const cardElement = createCard(card, handleLikeClick, handleImageClick, cardTemplate);
    placesList.append(cardElement);
});

// Добавляем обработчик клика по кнопке редактирования
editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(editPopup);
});

// Добавляем обработчик клика по кнопке добавления карточки
addButton.addEventListener('click', () => {
    openModal(addPopup);
});

// Обработчик закрытия попапов
modals.forEach(modal => {
    modal.addEventListener('click', (event) => {
        if(event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
            closeModal(modal);
        }
    });
});

document.addEventListener('keydown', handleEscape);

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(editPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием "submit" - «отправка»
editFormElement.addEventListener('submit', handleEditFormSubmit);

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: placeInput.value,
        link: linkInput.value,
        alt: placeInput.value
    };
    const cardElement = createCard(newCard, handleLikeClick, handleImageClick, cardTemplate);
    placesList.prepend(cardElement);
    addForm.reset();
    closeModal(addPopup);
}

addForm.addEventListener('submit', handleAddFormSubmit);