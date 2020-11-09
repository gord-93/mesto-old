import PopupWithFrom from './PopupWithForm.js';

export default class PopupWithRemove extends PopupWithFrom {
    open(removeItem, itemId) {
        super.open();
        this.removeItem = removeItem;
        this.itemId = itemId;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListeners('submit', (evt) => {
            this._submitForm(evt);
        })
    }
}