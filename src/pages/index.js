import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {editProfileButton, addCardButton,popupTextName, popupTextAbout,
newCardForm, popupFormProfile, allFormsClasses, avatarEditButton,
popupTextCard, popupLinkCard, popupAvatarForm, popupAvatarLink, popupEditSaveButton,
popupCardSaveButton, popupAvatarSaveButton, popupRemoveSaveButton, elements} from '../utils/constants.js';
import Api from '../components/Api.js';
import PopupWithRemove from '../components/PopupWithRemove';

const profileValidated = new FormValidator(allFormsClasses, popupFormProfile);
const cardValidated =  new FormValidator(allFormsClasses, newCardForm);
const avatarValidated = new FormValidator(allFormsClasses, popupAvatarForm);
const openFullImage = new PopupWithImage('.popup__fullscreen');
const userInfo = new UserInfo({userName: '.profile__name', userAbout: '.profile__about', userAvatar: '.profile__avatar'});

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
    headers: {
        authorization: '95ba4cb9-0c59-47de-9637-4b548933da0f',
        'Content-Type': 'application/json'
    }
});

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
            newCard.showLikesScore(item.likes);
        })
        .catch((err) => {
            console.log(err);
        });
    },
    (cardId) => {
        return api.dislikeCard(cardId)
        .then((item) => {
            newCard.showLikesScore(item.likes);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    );
    const newCardElement = newCard.createCard();
    return newCardElement;
}

api.promiseAll()
    .then(([user, initialCards]) => {
        userInfo.setUserInfo({name: user.name, about: user.about, userId: user._id});
        userInfo.setUserAvatar({avatar: user.avatar});
        const initCardElements = new Section(
            {
                renderer: (data) => {
                    initCardElements.addItem(addNewCard(data));
            }
        },
        '.elements');
        initCardElements.render(initialCards);
})
    .catch((err) => {
        console.log(err);
});

const profileEdit = new PopupWithForm((evt) => {
    evt.preventDefault();
    api.renderLoading(popupEditSaveButton, true, 'Загрузка...');
    api.setUserAttribute(popupTextName.value, popupTextAbout.value)
        .then((user) => {
            userInfo.setUserInfo({name: user.name, about: user.about, userId: user._id});
        })
        .catch((err) => {
            console.log(err);
        })
        .then(() => {
            api.renderLoading(popupEditSaveButton);
            profileEdit.close();
        })
}, '.popup__profile-edit');

const cardEdit = new PopupWithForm((evt) => {
    evt.preventDefault();
    api.renderLoading(popupCardSaveButton, true, 'Загрузка...');
    api.addCard(popupTextCard.value, popupLinkCard.value)
        .then((data) => {
            elements.prepend(addNewCard(data));
        })
        .catch((err) => {
            console.log(err);
        })
        .then(() => {
            api.renderLoading(popupCardSaveButton, false);
            cardEdit.close();
        })
}, '.popup__card-form');

const popupAvatar = new PopupWithForm((evt) => {
    evt.preventDefault();
    api.renderLoading(popupAvatarSaveButton, true, 'Сохранение...');
    api.changeAvatar(popupAvatarLink.value)
    .then((user) => {
        userInfo.setUserAvatar({avatar: user.avatar});
    })
    .catch((err) => {
        console.log(err);
    })
    .then(() => {
        api.renderLoading(popupAvatarSaveButton, false);
        popupAvatar.close();
    })
}, '.popup__edit-avatar');

const popupRemoveCard = new PopupWithRemove((cardId, card, popup) => {
    api.renderLoading(popupRemoveSaveButton, true, 'Удаление...');
    api.removeCard(cardId)
    .then(() => {
        card.remove();
        api.renderLoading(popupRemoveSaveButton, false);
        popup.close();
    })
    .catch((err) => {
        console.log(err);
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