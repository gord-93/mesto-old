import {closeButton, fullscreenImage, fullscreenTitle, popupOpen, popupClose, fullscreenCard} from './index.js';

export default class Card {
    constructor(data, cardSelector) {
        this.title = data.title;
        this.imageLink = data.imageLink;
        this._cardSelector = cardSelector;
    }
    _getTemplate = () => {
        const cardElement = document.querySelector(this._cardSelector)
        .content
        .cloneNode(true);
        return cardElement;
    }
    createCard = () => {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.elements__image').src = this.imageLink;
        this._element.querySelector('.elements__image').alt = this.title;
        this._element.querySelector('.elements__title').textContent = this.title;
        return this._element;
    }
    _like = () => {
        this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
    }
    _removeCard = () => {
        this._element.remove();
    }
    _popupFullAct = () => {
        fullscreenImage.src = this.imageLink;
        fullscreenTitle.textContent = this.title;
        fullscreenImage.alt = this.title;
        popupOpen(fullscreenCard);
        document.addEventListener("keyup", this._closeOnEsc);
        fullscreenCard.addEventListener("click", this._closeOnOverlay);
    }
    _popupFullDeact = () => {
        fullscreenImage.src = '';
        fullscreenTitle.textContent = '';
        fullscreenImage.alt = '';
        popupClose(fullscreenCard);
        document.removeEventListener("keyup", this._closeOnEsc);
        fullscreenCard.removeEventListener("click", this._closeOnOverlay);
    }
    _closeOnEsc = (evt) => {
        if (evt.key === "Escape") {
        this._popupFullAct();
        }
    }
    
    _closeOnOverlay = (evt) => {
        if(evt.target.classList.contains("popup")) {
        this._popupFullDeact();
        }
    }

    _setEventListeners = () => {
        this._element.querySelector('.elements__like-button').addEventListener('click', () => {
            this._like();
        })
        this._element.querySelector('.elements__reset-button').addEventListener('clicl', () => {
            this._removeCard();
        })
        this._element.querySelector('.elements__image').addEventListener('click', () => {
            this._popupFullAct();
        })
        closeButton.addEventListener('click', () => {
            this._popupFullDeact();
        })
    }
}