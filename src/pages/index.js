import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {editProfileButton, addCardButton,popupTextName, popupTextAbout, cardName, cardLink, 
newCardForm, popupFormProfile, initialCards, allFormsClasses, profileName, profileAbout, profileAvatar, avatarEditButton,
popupTextCard, popupLinkCard, popupAvatarForm, popupAvatarLink, saveButtonAvatar, popupSaveButton, popupSaveCard} from '../utils/constants.js';
import Api from '../components/Api.js';

const profileValidated = new FormValidator(allFormsClasses, popupFormProfile);
const cardValidated =  new FormValidator(allFormsClasses, newCardForm);
const avatarValidated = new FormValidator(allFormsClasses, popupAvatarForm);

const openFullImage = new PopupWithImage('.popup__fullscreen');
const userInfo = new UserInfo({userName: '.profile__name', userAbout: '.profile__about', userAvatar: '.profile__avatar'});

const renderLoading = (submitButton, isLoading) => {
    if (isLoading) {
        submitButton.textContent = submitButton.textContent + '...';
    } else {
        submitButton.textContent = submitButton.textContent.slice(
        0,
        submitButton.textContent.length - 3
        );
    }
}



let initCardElements;


const addNewCard = (data) => {
    const newCard = new Card(data, '#card-template', () => {openFullImage.open(data);});
    const newCardElement = newCard.createCard();
    return newCardElement;
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
    initCardElements = new Section(
        {
            items: initialCards,
            renderer: (data) => {
            initCardElements.addItemAppend(addNewCard(data));
        }
    },
    '.elements'
    );
    initCardElements.render();
});

const profileEdit = new PopupWithForm((evt) => {
    evt.preventDefault();
    renderLoading(popupSaveButton, true);
    api.setUserAttribute(popupTextName.value, popupTextAbout.value)
        .then((user) => {
            userInfo.setUserInfo({name: user.name, about: user.about, userId: user._id});
        })
        .finally(() => {
            renderLoading(popupSaveButton, false);
            profileEdit.close();
        })
}, '.popup__profile-edit');

const cardEdit = new PopupWithForm((evt) => {
    evt.preventDefault();
    renderLoading(popupSaveCard, true);
    api.addCard(popupTextCard.value, popupLinkCard.value)
        .then((data) => {
            initCardElements.addItem(addNewCard(data));
        })
        .finally(() => {
            renderLoading(popupSaveCard, false);
            cardEdit.close();
        })
}, '.popup__card-form');

const popupAvatar = new PopupWithForm((evt) => {
    evt.preventDefault();
    renderLoading(saveButtonAvatar, true);
    api
    .changeAvatar(popupAvatarLink.value)
    .then((user) => {
        userInfo.setUserAvatar({avatar: user.avatar});
    })
    .finally(() => {
        renderLoading(saveButtonAvatar, false);
        popupAvatar.close();
    })
}, '.popup__edit-avatar');




profileValidated.enableValidation();
cardValidated.enableValidation();
avatarValidated.enableValidation();
openFullImage.setEventListeners();
profileEdit.setEventListeners();
cardEdit.setEventListeners();
popupAvatar.setEventListeners();


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