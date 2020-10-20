import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({submit}, popupSelector) {
        super(popupSelector);
        this._submit = submit;
    }

    _getInputValues() {
        this._inputSelector = this._popupSelector.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputSelector.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.querySelector(".popup__form").addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submit(this._getInputValues());
        });
    }
}

