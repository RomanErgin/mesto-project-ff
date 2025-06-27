// import './api.js'; // Удалено, чтобы не было двойного подключения
import '../pages/index.css';
import {getUser, getCards, updateAvatar, addCard} from './api.js';
import {createCard, handleLikeClick } from './card.js';
import {openModal, closeModal, handleEscape} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';


// Импортируем все изображения
import '../images/logo.svg';
import '../images/avatar.jpg';
import '../images/add-icon.svg';
import '../images/delete-icon.svg';
import '../images/edit-icon.svg';
import '../images/like-active.svg';
import '../images/like-inactive.svg';
import '../images/close.svg';
import '../images/vector.png';

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
const profileImage = document.querySelector('.profile__image');

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

const avatarEditIcon = document.querySelector('.profile__avatar-edit');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = document.querySelector('form[name="edit-avatar"]');
const avatarInput = document.querySelector('.popup__input_type_avatar-url');

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

// @todo: Вывести карточки на страницу только после загрузки пользователя
let currentUserId;

Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    // Подставляем данные пользователя
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url('${user.avatar}')`;
    currentUserId = user._id;
    // Рендерим карточки
    cards.forEach(card => {
      const cardElement = createCard(card, handleLikeClick, handleImageClick, cardTemplate, currentUserId);
      placesList.append(cardElement);
    });
  })
  .catch(err => {
    console.error('Ошибка загрузки данных:', err);
  });

// Конфиг для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

// Открытие попапа профиля с очисткой ошибок
editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(editFormElement, validationConfig);
    openModal(editPopup);
});

// Открытие попапа добавления карточки с очисткой ошибок
addButton.addEventListener('click', () => {
    addForm.reset();
    clearValidation(addForm, validationConfig);
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

// Получаем кнопку сохранения профиля
const saveProfileButton = editFormElement.querySelector('.popup__button');
const addCardButton = addForm.querySelector('.popup__button');
const saveAvatarButton = avatarForm.querySelector('.popup__button');

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    const originalText = saveProfileButton.textContent;
    saveProfileButton.textContent = 'Сохранение...';
    // Здесь должен быть PATCH-запрос на сервер для профиля, например updateProfile(...)
    // Пока просто имитируем задержку через Promise.resolve
    Promise.resolve().then(() => {
      profileName.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closeModal(editPopup);
    }).finally(() => {
      saveProfileButton.textContent = originalText;
    });
}

editFormElement.addEventListener('submit', handleEditFormSubmit);

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const originalText = addCardButton.textContent;
    addCardButton.textContent = 'Сохранение...';
    addCard(placeInput.value, linkInput.value)
      .then(card => {
        const cardElement = createCard(card, handleLikeClick, handleImageClick, cardTemplate, currentUserId);
        placesList.prepend(cardElement);
        addForm.reset();
        clearValidation(addForm, validationConfig);
        closeModal(addPopup);
      })
      .catch(err => {
        console.error('Ошибка добавления карточки:', err);
      })
      .finally(() => {
        addCardButton.textContent = originalText;
      });
}

addForm.addEventListener('submit', handleAddFormSubmit);

profileImage.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

avatarForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const originalText = saveAvatarButton.textContent;
  saveAvatarButton.textContent = 'Сохранение...';
  const newAvatarUrl = avatarInput.value;
  updateAvatar(newAvatarUrl)
    .then(user => {
      profileImage.style.backgroundImage = `url('${user.avatar}')`;
      closeModal(avatarPopup);
    })
    .catch(err => {
      console.error('Ошибка смены аватара:', err);
    })
    .finally(() => {
      saveAvatarButton.textContent = originalText;
    });
});