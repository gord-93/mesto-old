import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import {editProfileButton, addCardButton,popupTextName, popupTextAbout, cardName, cardLink, 
    newCardForm, popupFormProfile, initialCards, allFormsClasses} from '../utils/constants.js';



const profileValidated = new FormValidator(allFormsClasses, popupFormProfile);
const cardValidated =  new FormValidator(allFormsClasses, newCardForm);
const openFullImage = new PopupWithImage('.popup__fullscreen');
const userInfo = new UserInfo('.profile__name', '.profile__about');

const initCardElements = new Section({
    items: initialCards,
    renderer: (data) => {
        const newCard = new Card(data, '#card-template', () => {openFullImage.open(data);});
        const newCardElement = newCard.createCard();
        initCardElements.addItem(newCardElement);
    }}, '.elements');

const profileEdit = new PopupWithForm(() => {
    userInfo.setUserInfo(popupTextName.value, popupTextAbout.value);
    profileEdit.close();
}, '.popup__profile-edit');

const cardEdit = new PopupWithForm((evt) => {
    evt.preventDefault();
    const data = {
                name: cardName.value,
                link: cardLink.value
            };
    const newCard = new Card(data, '#card-template', () => {openFullImage.open(data);});
    const newCardElement = newCard.createCard();
    initCardElements.addItem(newCardElement);
    cardEdit.close();
}, '.popup__card-form');

profileValidated.enableValidation();
cardValidated.enableValidation();
openFullImage.setEventListeners();
initCardElements.render();
profileEdit.setEventListeners();
cardEdit.setEventListeners();

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





