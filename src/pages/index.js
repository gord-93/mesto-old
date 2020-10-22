import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import {closeButton, fullscreenImage, fullscreenTitle, fullscreenCard, closeFullscreenButton,
    profile, editProfileButton, addCardButton, profileName, profileAbout, elementArea, popup, popupForm, popupTextName, popupTextAbout, closeFormButton,
    cardName, cardLink, popupProfileEdit, cardForm, newCardForm, popupFormProfile, initialCards, allFormsClasses} from '../utils/constants.js';



const profileValidated = new FormValidator(allFormsClasses, popupFormProfile);
const cardValidated =  new FormValidator(allFormsClasses, newCardForm);
profileValidated.enableValidation();
cardValidated.enableValidation();

function addCard(container, element) {
    container.prepend(element);
};

function addNewCard(data) {
    const newCard = new Card(data, '#card-template');
    const newCardElement = newCard.createCard();
    addCard(elementArea, newCardElement);
    
}

initialCards.forEach(function(item) {
    addNewCard(item);
});

const openFullImage = new PopupWithImage('.popup__fullscreen');
openFullImage.setEventListeners();


const userInfo = new UserInfo('.profile__name', '.profile__about');

const profileEdit = new PopupWithForm(submitForm, '.popup__profile-edit');
profileEdit.setEventListeners();

function submitForm({name, about}) {
    userInfo.setUserInfo({name, about});
    profileEdit.close();
}


editProfileButton.addEventListener('click', () => {
    profileEdit.open();
    profileName.value = userInfo.getUserInfo().name;
    profileAbout.value = userInfo.getUserInfo().about;
});

const cardEdit = new PopupWithForm(submitForm, '.popup__card-form');
cardEdit.setEventListeners();

addCardButton.addEventListener('click', () => {
    cardEdit.open();

});

// // const profileEdit = new PopupWithForm();

// const popupAddCard = new PopupWithForm(cardForm);


// const popupEdit = new PopupWithForm(popupProfileEdit, submitForm);



// const userInfo = new UserInfo(profileName, profileAbout);


// function submitForm(name, about) {
//     userInfo.setUserInfo(name, about);
//     popupEdit.close();
// }







// editProfileButton.addEventListener('click', () => {
//     popupProfile.open();
//     const {name, about} = userInfo.getUserInfo();
//     profileName.value = name;
//     profileAbout.value = about;
// });



// function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', escClosePopup);
//     popup.addEventListener('click', closePopupOverlay);
// }

// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', escClosePopup);
//     popup.removeEventListener('click', closePopupOverlay);
// }

// function escClosePopup(evt) {
//     const openedPopup = document.querySelector('.popup_opened');
//     if (evt.key === 'Escape') {
//         closePopup(openedPopup);
//     };
// } 

// function closePopupOverlay(evt) {
//     const openedPopup = document.querySelector('.popup_opened');
//     if (evt.target.classList.contains('popup')) {
//         closePopup(openedPopup);
//     };
// }



// const userInfo = new UserInfo({
//     userName: '.profile__name',
//     userAbout: '.profile__about'
// });


// function submitProfileInfo(evt) {
//     evt.preventDefault();
//     profileName.textContent = popupTextName.value;
//     profileAbout.textContent = popupTextAbout.value;
// } 







// popupFormProfile.addEventListener('submit', submitProfileInfo);


// editProfileButton.addEventListener('click', () => {
//     popupTextName.value = profileName.textContent;
//     popupTextAbout.value = profileAbout.textContent;
//     profileValidated.removeErrors();
//     openPopup(popupProfileEdit);
// });

// addCardButton.addEventListener('click', () => {
//     cardName.value = "";
//     cardLink.value = "";
//     cardValidated.removeErrors();
//     openPopup(cardForm);
// });

// closeButton.addEventListener('click', function(evt) {
//     closePopup(popupProfileEdit);
// });

// closeFormButton.addEventListener('click', function() {
//     closePopup(cardForm);
// });

// popupForm.addEventListener('submit', submitProfileInfo);

// newCardForm.addEventListener('submit', function(evt) {
//     evt.preventDefault();
//     addNewCard({
//         name: cardName.value,
//         link: cardLink.value
//     })
//     closePopup(cardForm);
// });




