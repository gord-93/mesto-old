import Popup from './Popup.js';

export default class PopupWithRemove extends Popup {
    constructor(submitForm, popupSelector) {
        super(popupSelector);
        this._acceptButton = this._popup.querySelector('.popup__save-button_delete-accept');
        this._submit = submitForm;
    }
    open(card, cardId) {
        super.open();
        this._card = card;
        this._id = cardId;
    }
    setEventListeners() {
        super.setEventListeners();
        this._acceptButton.addEventListener('click', () => {
            this._submit(this._id, this._card, this)
        });
    }
}