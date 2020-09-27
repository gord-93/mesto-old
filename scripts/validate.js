const showInputError = (formElement,  inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    
    errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement) => {

}

const checkInputValidity = (formElement, inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(inputElement, errorMessage); 
    } else {
        hideInputError(inputElement);
    }
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(document.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
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

setEventListeners();