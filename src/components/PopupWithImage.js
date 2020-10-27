import Popup from './Popup.js';
import {fullscreenImage, fullscreenTitle} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(data) {
        super.open();
        fullscreenImage.src = data.link;
        fullscreenTitle.textContent = data.name;
        fullscreenImage.alt = data.name;
    }
}