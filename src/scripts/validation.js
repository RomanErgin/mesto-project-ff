export { enableValidation, clearValidation }; 

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

const validationRules = {
  name: {
    min: 2,
    max: 40,
    pattern: /^[A-Za-zА-Яа-яЁё\-\s]+$/,
    emptyMsg: 'Вы пропустили это поле.',
    lengthMsg: 'Минимальное количество символов',
    patternMsg: 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы'
  },
  description: {
    min: 2,
    max: 200,
    pattern: /^[A-Za-zА-Яа-яЁё\-\s]+$/,
    emptyMsg: 'Вы пропустили это поле.',
    lengthMsg: 'Минимальное количество символов',
    patternMsg: 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы'
  },
  'place-name': {
    min: 2,
    max: 30,
    pattern: /^[A-Za-zА-Яа-яЁё\-\s]+$/,
    emptyMsg: 'Вы пропустили это поле.',
    lengthMsg: 'Минимальное количество символов',
    patternMsg: 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы'
  },
  link: {
    emptyMsg: 'Вы пропустили это поле.'
    // URL проверяется браузером
  }
};

function validateInput(input, rules) {
  const value = input.value;
  if (value.length === 0) {
    return 'Вы пропустили это поле.';
  }
  if (value.length === 1) {
    return 'Минимальное количество символов: 2. Длина текста сейчас: 1 символ.';
  }
  if (rules.max && value.length > rules.max) {
    return `Максимальное количество символов: ${rules.max}.`;
  }
  return '';
}

function handleInputValidation(input, config) {
  const rules = validationRules[input.name];
  let error = '';
  if (rules) {
    error = validateInput(input, rules);
  }
  // Для поля ссылки используем стандартные браузерные сообщения
  if (!error && !input.validity.valid) {
    error = input.validationMessage;
  }
  if (error) {
    setError(input, error);
    input.dataset.error = error;
    return false;
  } else {
    clearError(input);
    input.dataset.error = '';
    return true;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid || inputElement.dataset.error);
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      handleInputValidation(inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    // Добавляем спаны для ошибок, если их нет
    Array.from(formElement.querySelectorAll(config.inputSelector)).forEach(input => {
      let errorElem = formElement.querySelector(`#${input.name}-error`);
      if (!errorElem) {
        errorElem = document.createElement('span');
        errorElem.className = 'popup__error';
        errorElem.id = `${input.name}-error`;
        input.insertAdjacentElement('afterend', errorElem);
      }
    });
    setEventListeners(formElement, config);
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
  });
}

function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
    inputElement.dataset.error = '';
  });
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

function setError(input, message) {
  const formElement = input.closest('form');
  const config = window.validationConfig || {};
  showInputError(formElement, input, message, config);
}

function clearError(input) {
  const formElement = input.closest('form');
  const config = window.validationConfig || {};
  hideInputError(formElement, input, config);
}