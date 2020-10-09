import {closeButton, fullscreenImage, fullscreenTitle, popupOpen, popupClose, fullscreenCard} from './index.js';

export default class Card {
    constructor(data, cardSelector) {
        this.title = data.title;
        this.imageLink = data.imageLink;
        this._cardSelector = cardSelector;
    }
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector)
        .content
        .cloneNode(true);
        return cardElement;
    }
    _like() {
        this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
    }
    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.elements__image').src = this.imageLink;
        this._element.querySelector('.elements__image').alt = this.title;
        this._element.querySelector('.elements__title').textContent = this.title;
        return this._element;
    }
    _removeCard (){
        this._element.remove();
    }
    _popupFullAct() {
        fullscreenImage.src = this.imageLink;
        fullscreenTitle.textContent = this.title;
        fullscreenImage.alt = this.title;
        popupOpen(fullscreenCard);
    }
    _popupFullDeact() {
        fullscreenImage.src = '';
        fullscreenTitle.textContent = '';
        fullscreenImage.alt = '';
        popupClose(fullscreenCard);
    }
    _setEventListeners() {
        this._element.querySelector('.elements__like-button').addEventListener('click', function(){
            this._like();
        })
        this._element.querySelector('.elements__reset-button').addEventListener('clicl', function() {
            this._removeCard();
        })
        this._element.querySelector('.elements__image').addEventListener('click', function() {
            this._popupFullAct();
        })
        closeButton.addEventListener('click', function() {
            this._popupFullDeact();
        })
    }
    
}