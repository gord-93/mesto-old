import Popup from './Popup.js';
import {fullscreenImage, fullscreenTitle} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open = (data) => {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', this._handleOverlayClose);
        fullscreenImage.src = data.link;
        fullscreenTitle.textContent = data.name;
        fullscreenImage.alt = data.name;
    }
}