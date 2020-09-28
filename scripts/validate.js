const showInputError = (formElement, inputElement, inputErrorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputErrorMessage;
    inputElement.classList.add('popup__input_error_border');
    errorElement.classList.add('popup__input_error_active');
}

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove('popup__input_error_border');
    errorElement.classList.remove('popup__input_error_active');
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    });
}

const checkButtonStatus = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_off');
    } else {
    buttonElement.classList.remove('popup__save-button_off');
    }
}

const checkInputValidity = (formElement, inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
        const inputErrorMessage = inputElement.validationMessage;
        showInputError(formElement, inputElement, inputErrorMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__save-button');
    checkButtonStatus(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            checkButtonStatus(inputList, buttonElement);
        }); 
    });
}

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        
            setEventListeners(formElement);
    }));
}
enableValidation();