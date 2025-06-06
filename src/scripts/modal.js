// Функция-обработчик нажатия Escape
export function handleEscape(event) {
    if (event.key === 'Escape') {
        const openedModal = document.querySelector('.popup_is-opened');
        if (openedModal) {
            closeModal(openedModal);
        }
    }
}

// Функция открытия модального окна
export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape);
}

// Функция закрытия модального окна
export function closeModal(modal) {
    if (modal.classList.contains('popup_is-opened')) {
        modal.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', handleEscape);
    }
}