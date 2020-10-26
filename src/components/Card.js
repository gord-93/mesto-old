export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this.title = data.name;
        this.imageLink = data.link;
        this._cardSelector = cardSelector;
        this.isLiked = false;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector)
        .content
        .cloneNode(true);
        return cardElement;
    }
    createCard() {
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector('.elements__image');
        this._setEventListeners();
        this._imageElement.src = this.imageLink;
        this._imageElement.alt = this.title;
        this._element.querySelector('.elements__title').textContent = this.title;
        return this._element;
    }
    _like(evt) {
        evt.target.classList.toggle('elements__like-button_active');
    }
    _removeCard(evt) {
        const element = evt.target.closest('.elements__element');
        element.remove();
    }
    
    _setEventListeners() {
        this._element.querySelector('.elements__like-button').addEventListener('click', this._like);
        this._element.querySelector('.elements__reset-button').addEventListener('click', this._removeCard);
        this._imageElement.addEventListener('click', () => {
            this._handleCardClick(this._data);
        });
    }
}