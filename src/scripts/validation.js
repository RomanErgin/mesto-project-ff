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
 
function handleInputValidation(input, config) { 
  // Проверка на пустое поле
  if (input.value.trim() === '') {
    showInputError(input.closest('form'), input, 'Вы пропустили это поле.', config);
    return false;
  }
  
  if (input.validity.valid) { 
    hideInputError(input.closest('form'), input, config); 
    return true; 
  } else { 
    // Используем кастомное сообщение из data-error-message для ошибок паттерна, иначе из title, иначе стандартное сообщение браузера
    let errorMessage;
    if (input.validity.patternMismatch && input.dataset.errorMessage) {
      errorMessage = input.dataset.errorMessage;
    } else {
      errorMessage = input.title || input.validationMessage;
    }
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