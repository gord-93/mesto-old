import {closeButton, fullscreenImage, fullscreenTitle, openPopup, closePopup, fullscreenCard, closeFullscreenButton} from './index.js';

export default class Card {
    constructor(data, cardSelector) {
        this.title = data.name;
        this.imageLink = data.link;
        this._cardSelector = cardSelector;
        this.isLiked = false;
    }
    _getTemplate = () => {
        const cardElement = document.querySelector(this._cardSelector)
        .content
        .cloneNode(true);
        return cardElement;
    }
    createCard = () => {
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector('.elements__image');
        this._setEventListeners();
        this._imageElement.src = this.imageLink;
        this._imageElement.alt = this.title;
        this._element.querySelector('.elements__title').textContent = this.title;
        return this._element;
    }
    _like = (evt) => {
        evt.target.classList.toggle('elements__like-button_active');
    }
    _removeCard = (evt) => {
        const element = evt.target.closest('.elements__element');
        element.remove();
    }
    _popupFullImageActiv = () => {
        fullscreenImage.src = this.imageLink;
        fullscreenTitle.textContent = this.title;
        fullscreenImage.alt = this.title;
        openPopup(fullscreenCard);
        document.addEventListener('keyup', this._closeOnEsc);
        fullscreenCard.addEventListener('click', this._closeOnOverlay);
    }
    _popupFullImageDeactivate = () => {
        fullscreenImage.src = '';
        fullscreenTitle.textContent = '';
        fullscreenImage.alt = '';
        closePopup(fullscreenCard);
        document.removeEventListener('keyup', this._closeOnEsc);
        fullscreenCard.removeEventListener('click', this._closeOnOverlay);
    }
    _closeOnEsc = (evt) => {
        if (evt.key === 'Escape') {
        this._popupFullImageDeactivate();
        }
    }
    
    _closeOnOverlay = (evt) => {
        if(evt.target.classList.contains('popup')) {
        this._popupFullImageDeactivate();
        }
    }
    _setEventListeners = () => {
        this._imageElement.addEventListener('click', () => {
            this._popupFullImageActiv();
        })
        closeButton.addEventListener('click', () => {
            this._popupFullImageDeactivate();
        })
        closeFullscreenButton.addEventListener('click', () => {
            this._popupFullImageDeactivate();
        })
        this._element.querySelector('.elements__like-button').addEventListener('click', this._like);
        this._element.querySelector('.elements__reset-button').addEventListener('click', this._removeCard);
    }
}