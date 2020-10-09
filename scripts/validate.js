(function() {

const showInputError = (formElement, inputElement, inputErrorMessage, allClasses) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(allClasses.inputErrorClass);
    errorElement.textContent = inputErrorMessage;
    errorElement.classList.add(allClasses.errorClass);
}

const hideInputError = (formElement, inputElement, allClasses) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(allClasses.inputErrorClass);
    errorElement.classList.remove(allClasses.errorClass);
    errorElement.textContent = '';
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    });
}

const checkButtonStatus = (inputList, buttonElement, allClasses) => {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(allClasses.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'true');
    } else {
    buttonElement.classList.remove(allClasses.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
    }
}

const checkInputValidity = (formElement, inputElement, allClasses) => {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
        const inputErrorMessage = inputElement.validationMessage;
        showInputError(formElement, inputElement, inputErrorMessage, allClasses);
    } else {
        hideInputError(formElement, inputElement, allClasses);
    }
}

const setEventListeners = (formElement, allClasses) => {
    const inputList = Array.from(formElement.querySelectorAll(allClasses.inputSelector));
    const buttonElement = formElement.querySelector(allClasses.submitButtonSelector);
    checkButtonStatus(inputList, buttonElement, allClasses);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, allClasses);
            checkButtonStatus(inputList, buttonElement, allClasses);
        }); 
    });
}

const enableValidation = (allClasses) => {
    const formList = Array.from(document.querySelectorAll(allClasses.formSelector));
    formList.forEach((formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        
            setEventListeners(formElement, allClasses);
    }));
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}); 


})();
