import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(submitForm, popupSelector) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputSelector = document.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputSelector.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._submitForm);
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}

