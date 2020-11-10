export default class Card {
    constructor(data, cardSelector, ownerId, handleCardClick, handleCardRemove, handleLikeClick, handleRemoveLikeClick) {
        this.title = data.name;
        this.imageLink = data.link;
        this._cardSelector = cardSelector;
        this._id = data._id
        this._owner = data.owner;
        this._ownerId = ownerId;
        this.isLiked = false;
        this._handleCardClick = handleCardClick;
        this._handleCardRemove = handleCardRemove;
        this._handleLikeClick = handleLikeClick;
        this._handleRemoveLikeClick = handleRemoveLikeClick;
        this._likes = data.likes;
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
    _likeActive(evt) {
        evt.target.classList.toggle('elements__like-button_active');
    }
    _checkLiked(evt) {
        if (evt.target.classList.contains('elements__like-button_active')) {
            return true;
        }
        return false;
    }
    removeCard(evt) {
        const element = evt.target.closest('.elements__element');
        element.remove();
    }
    disableRemoveButton() {
        this._element.querySelector('.elements__reset-button').remove();
    }
    _setEventListeners() {
        this._elementsCard = this._element.querySelector('.elements__element');
        this._element.querySelector('.elements__like-button').addEventListener('click', this._likeActive);
        this._removeButtonIcon = this._element.querySelector('.elements__reset-button');
        if(this._owner._id === this._ownerId) {
            this._removeButtonIcon.addEventListener('click', () => { 
            this._handleCardRemove(this._elementsCard, this._id);
            });
        } else {
            this._removeButtonIcon.remove();
    }

        this._imageElement.addEventListener('click', (evt) => {
            this._handleCardClick(this._data);
        });
    }
}