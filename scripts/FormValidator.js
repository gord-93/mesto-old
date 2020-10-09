export default class FormValidator {
    constructor(allClasses, validatedForm) {
        this._validatedForm = validatedForm;
        this._inputSelector = allClasses.inputSelector;
        this._submitButtonSelector = allClasses.submitButtonSelector;
        this._inactiveButtonClass = allClasses.inactiveButtonClass;
        this._inputErrorClass = allClasses.inputErrorClass;
        this._errorClass = allClasses.errorClass;
    }
    _formValidation = () => {
        const form = this._validatedForm;
        return form;
    }
    _activeSubmitButton = () => {
        const buttonElement = this._element.querySelector(this._submitButtonSelector);
        buttonElement.classList.remove(this.__inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
    _disabledSubmitButton = () => {
        const buttonElement = this._element.querySelector(this._submitButtonSelector);
        buttonElement.classList.add(this.__inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'true');
    }
    _showInputError = (inputElement) => {
        const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.inputErrorMessage;
        errorElement.classList.add(this._errorClass);
    };
    
    _hideInputError = (inputElement) => {
        const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };
    _checkInputValidity = (inputElement) => {
        const isInputNotValid = !inputElement.validity.valid;
        if (isInputNotValid) {
            showInputError(inputElement);
        } else {
            hideInputError(inputElement);
        }
    };
    _hasInvalidInput = () => {
        const inputList = Array.from(this._element.querySelectorAll(this._inputSelector))
        return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
        });
    };
    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
        this._disabledSubmitButton();
        } else {
        this._activeSubmitButton();
        };
    };
    _setEventListeners = () => {
        const inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
        this._toggleButtonState();
        inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._hasInvalidInput(inputElement);
            this._toggleButtonState();
            });
        });
        this._element.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._disabledSubmitButton();
        });
    };
    enableValidation = () => {
        this._element = this._formValidation();
        this._setEventListeners();
    };
};








