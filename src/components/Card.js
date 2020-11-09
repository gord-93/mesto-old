export default class Card {
    constructor(data, cardSelector, personalID, handleCardClick, removeButtonClick) {
        this.title = data.name;
        this.imageLink = data.link;
        this._id = data._id;
        this._cardSelector = cardSelector;
        this.isLiked = false;
        this._handleCardClick = handleCardClick;
        this._removeButtonClick = removeButtonClick;
        this._persona = data.persona;
        this._personalID = personalID;

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
    _likeButton(evt) {
        evt.target.classList.toggle('elements__like-button_active');
    }
    _checkLiked(evt) {
        if (evt.target.classList.contains('elements__like-button_active')) {
            return true;
        }
        return false;
    }
    _removeCard(evt) {
        const element = evt.target.closest('.elements__element');
        element.remove();
    }
    
    _setEventListeners() {
        this._element.querySelector('.elements__like-button').addEventListener('click', this._likeButton);
        this._card = this._element.querySelector('.elements__element');

        // this._removeButton = this._element.querySelector('.elements__reset-button');
        // if (this.persona._id === this._personalID) {
        //     this._removeButton.addEventListener('click', () => {
        //         this._removeButtonClick(this._card, this._id);
        //     });
        // } else {
        //     this._removeButton.remove();
        // }

        this._imageElement.addEventListener('click', () => {
            this._handleCardClick(this._data);
        });
    }
}