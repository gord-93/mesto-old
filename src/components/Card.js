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
        this._likeButton = this._element.querySelector('.elements__like-button');
        this._likeScorer = this._element.querySelector('.elements__like-scorer');
        this._imageElement = this._element.querySelector('.elements__image');
        this._likes.forEach((item) => {
            if (item._id === this._ownerId) {
                this._likeButton.classList.add('elements__like-button_active');
            } else {
                this._likeButton.classList.remove('elements__like-button_active');
            }
        })
        this._setEventListeners();
        this._imageElement.src = this.imageLink;
        this._imageElement.alt = this.title;
        this._element.querySelector('.elements__title').textContent = this.title;
        this._likeScorer.textContent = this._likes.length;
        return this._element;
    }

    _likeActive() {
        this._likeButton.classList.toggle('elements__like-button_active');
    }

    _checkLiked() {
        return this._likeButton.classList.contains('elements__like-button_active'); 
    }

    showLikesScore(likes) {
        this._likeScorer.textContent = likes.length;
        this._likeActive();
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
        this._likeButton.addEventListener('click', () => {
            if (!this._checkLiked()) {
                this._handleLikeClick(this._id);
            } else {
                this._handleRemoveLikeClick(this._id);
            }
        });
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