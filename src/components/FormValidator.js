    export default class FormValidator {
    constructor(allClasses, validatedForm) {
        this._validatedForm = validatedForm;
        this._inputSelector = allClasses.inputSelector;
        this._submitButtonSelector = allClasses.submitButtonSelector;
        this._inactiveButtonClass = allClasses.inactiveButtonClass;
        this._inputErrorClass = allClasses.inputErrorClass;
        this._errorClass = allClasses.errorClass;
        this._buttonElement = this._validatedForm.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._validatedForm.querySelectorAll(this._inputSelector));
    };

    _formValidation() {
        const form = this._validatedForm;
        return form;
    };

    _activeSubmitButton() {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
    };

    _disabledSubmitButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', 'true');
    };

    _showInputError(inputElement) {
        const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError(inputElement) {
        const errorElement = this._element.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
        this._disabledSubmitButton();
        } else {
        this._activeSubmitButton();
        };
    };

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
            });
        });
    };

    enableValidation() {
        this._element = this._formValidation();
        this._setEventListeners();
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._disabledSubmitButton();
            });
            
    };
    
    removeErrors() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    };
};



