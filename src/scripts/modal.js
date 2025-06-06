// Функция открытия модального окна
export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    
    function handleEscape(event) {
        if (event.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', handleEscape);
        }
    }
    
    document.addEventListener('keydown', handleEscape);
}

// Функция закрытия модального окна
export function closeModal(modal) {
    if (modal.classList.contains('popup_is-opened')) {
        modal.classList.remove('popup_is-opened');
    }
}