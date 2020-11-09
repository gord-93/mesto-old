import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {editProfileButton, addCardButton,popupTextName, popupTextAbout, cardName, cardLink, 
newCardForm, popupFormProfile, initialCards, allFormsClasses, profileName, profileAbout, profileAvatar, avatarEditButton,
popupTextCard, popupLinkCard} from '../utils/constants.js';
import Api from '../components/Api.js';

const profileValidated = new FormValidator(allFormsClasses, popupFormProfile);
const cardValidated =  new FormValidator(allFormsClasses, newCardForm);
const openFullImage = new PopupWithImage('.popup__fullscreen');
const userInfo = new UserInfo({userName: '.profile__name', userAbout: '.profile__about', userAvatar: '.profile__avatar'});
const popupAvatar = new PopupWithForm((res) => {console.log(res)}, '.popup__edit-avatar')
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
    userInfo.setUserAvatar(user.avatar);
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
    api.setUserAttribute(popupTextName.value, popupTextAbout.value)
        .then((user) => {
            userInfo.setUserInfo({name: user.name, about: user.about, userId: user._id});
        })
        .then(() => {
            profileEdit.close();
        })
}, '.popup__profile-edit');

const cardEdit = new PopupWithForm((evt) => {
    evt.preventDefault();
    api.addCard(popupTextCard.value, popupLinkCard.value)
        .then((data) => {
            initCardElements.addItem(addNewCard(data));
        })
        .then(() => {
            cardEdit.close();
        })
}, '.popup__card-form');






profileValidated.enableValidation();
cardValidated.enableValidation();
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
});