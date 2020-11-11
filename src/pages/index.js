import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {editProfileButton, addCardButton,popupTextName, popupTextAbout,
newCardForm, popupFormProfile, allFormsClasses, avatarEditButton,
popupTextCard, popupLinkCard, popupAvatarForm, popupAvatarLink} from '../utils/constants.js';
import Api from '../components/Api.js';
import PopupWithRemove from '../components/PopupWithRemove';

const profileValidated = new FormValidator(allFormsClasses, popupFormProfile);
const cardValidated =  new FormValidator(allFormsClasses, newCardForm);
const avatarValidated = new FormValidator(allFormsClasses, popupAvatarForm);
const openFullImage = new PopupWithImage('.popup__fullscreen');
const userInfo = new UserInfo({userName: '.profile__name', userAbout: '.profile__about', userAvatar: '.profile__avatar'});
const initCardElements = new Section(
    {
        renderer: (data) => {
            addNewCard(data);
    }
},
'.elements');

const addNewCard = (data) => {
    const newCard = new Card(data, '#card-template', 
    userInfo.getUserId(),
    () => {
        openFullImage.open(data);
    },
    (card, cardId) => {
        popupRemoveCard.open(card, cardId);
    },
    (cardId) => {
        return api.likeCard(cardId)
        .then((item) => {
            newCard.likesScoreDisplay(item.likes);
        })
        .catch((err) => {
            console.log(err);
        });
    },
    (cardId) => {
        return api.dislikeCard(cardId)
        .then((item) => {
            newCard.likesScoreDisplay(item.likes);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    );
    const newCardElement = newCard.createCard();
    initCardElements.addItem(newCardElement);
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
    headers: {
        authorization: '95ba4cb9-0c59-47de-9637-4b548933da0f',
        'Content-Type': 'application/json'
    }
});

api.promiseAll()
    .then(([user, initialCards]) => {
    userInfo.setUserInfo({name: user.name, about: user.about, userId: user._id});
    userInfo.setUserAvatar({avatar: user.avatar});
    initCardElements.render(initialCards);
});

const profileEdit = new PopupWithForm((evt) => {
    evt.preventDefault();
    api.setUserAttribute(popupTextName.value, popupTextAbout.value)
        .then((user) => {
            userInfo.setUserInfo({name: user.name, about: user.about, userId: user._id});
        })
        .finally(() => {
            
            profileEdit.close();
        })
}, '.popup__profile-edit');

const cardEdit = new PopupWithForm((evt) => {
    evt.preventDefault();
    api.addCard(popupTextCard.value, popupLinkCard.value)
        .then((data) => {
            initCardElements.addItem(addNewCard(data));
        })
        .finally(() => {
            
            cardEdit.close();
        })
}, '.popup__card-form');

const popupAvatar = new PopupWithForm((evt) => {
    evt.preventDefault();
    api
    .changeAvatar(popupAvatarLink.value)
    .then((user) => {
        userInfo.setUserAvatar({avatar: user.avatar});
    })
    .finally(() => {
        popupAvatar.close();
    })
}, '.popup__edit-avatar');

const popupRemoveCard = new PopupWithRemove((cardId, card, popup) => {
    api
    .removeCard(cardId)
    .then(() => {
        card.remove();
    })
    .then(() => {
        popup.close();
    })
}, '.popup__delete-card'); 

profileValidated.enableValidation();
cardValidated.enableValidation();
avatarValidated.enableValidation();
openFullImage.setEventListeners();
profileEdit.setEventListeners();
cardEdit.setEventListeners();
popupAvatar.setEventListeners();
popupRemoveCard.setEventListeners();

editProfileButton.addEventListener('click', () => {
    profileEdit.open();
    profileValidated.removeErrors();
    popupTextName.value = userInfo.getUserInfo().name;
    popupTextAbout.value = userInfo.getUserInfo().about;
});

addCardButton.addEventListener('click', () => {
    cardValidated.removeErrors();
    cardEdit.open();
});

avatarEditButton.addEventListener('click', () => {
    popupAvatar.open();
    avatarValidated.removeErrors();
});