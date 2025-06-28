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

// Функция для проверки текстовых полей на наличие только букв, дефисов и пробелов
function validateTextInput(input) {
  const value = input.value;
  const textPattern = /^[A-Za-zА-Яа-яЁё\s\-]*$/;
  
  if (value && !textPattern.test(value)) {
    return 'Разрешены только буквы, дефисы и пробелы.';
  }
  return '';
}
 
function handleInputValidation(input, config) { 
  // Проверка на пустое поле
  if (input.value.trim() === '') {
    showInputError(input.closest('form'), input, 'Вы пропустили это поле.', config);
    return false;
  }
  
  // Дополнительная проверка для текстовых полей (кроме URL)
  if (input.type === 'text' && input.name !== 'link' && input.name !== 'avatar') {
    const textError = validateTextInput(input);
    if (textError) {
      showInputError(input.closest('form'), input, textError, config);
      return false;
    }
  }
  
  if (input.validity.valid) { 
    hideInputError(input.closest('form'), input, config); 
    return true; 
  } else { 
    // Используем кастомное сообщение из title, если оно есть, иначе стандартное
    const errorMessage = input.title || input.validationMessage;
    showInputError(input.closest('form'), input, errorMessage, config); 
    return false; 
  } 
} 
 
function hasInvalidInput(inputList) { 
  return inputList.some((inputElement) => !inputElement.validity.valid); 
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
  }); 
  toggleButtonState(inputList, buttonElement, config);
}