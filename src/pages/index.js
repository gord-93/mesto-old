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

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escClosePopup);
    popup.addEventListener('click', closePopupOverlay);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', escClosePopup);
    popup.removeEventListener('click', closePopupOverlay);
}

function escClosePopup(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        closePopup(openedPopup);
    };
} 

function closePopupOverlay(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup')) {
        closePopup(openedPopup);
    };
}


function submitProfileInfo(evt) {
    evt.preventDefault();
    profileName.textContent = popupTextName.value;
    profileAbout.textContent = popupTextAbout.value;
    closePopup(popupProfileEdit);
}

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

popupFormProfile.addEventListener('submit', submitProfileInfo);

editProfileButton.addEventListener('click', () => {
    popupTextName.value = profileName.textContent;
    popupTextAbout.value = profileAbout.textContent;
    profileValidated.removeErrors();
    openPopup(popupProfileEdit);
});

addCardButton.addEventListener('click', () => {
    cardName.value = "";
    cardLink.value = "";
    cardValidated.removeErrors();
    openPopup(cardForm);
});

closeButton.addEventListener('click', function(evt) {
    closePopup(popupProfileEdit);
});

closeFormButton.addEventListener('click', function() {
    closePopup(cardForm);
});

popupForm.addEventListener('submit', submitProfileInfo);

newCardForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    addNewCard({
        name: cardName.value,
        link: cardLink.value
    })
    closePopup(cardForm);
});





