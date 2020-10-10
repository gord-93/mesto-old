import Card from './Card.js';
import FormValidator from './FormValidator.js'
export {closeButton, fullscreenImage, fullscreenTitle, popupOpen, popupClose, fullscreenCard, closeFullscreenButton};
const profile = document.querySelector('.profile');
const editProfileButton = profile.querySelector('.profile__edit-button');
const addCardButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const elements = document.querySelector('.elements');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const popupForm = popup.querySelector('.popup__form');
const popupTextName = popupForm.querySelector('.popup__text-name');
const popupTextAbout = popupForm.querySelector('.popup__text-about');
const closeFormButton = document.querySelector('.popup__close-button_card');
const cardName = document.querySelector('.popup__text-name_card');
const cardLink = document.querySelector('.popup__link');
const popupProfileEdit = document.querySelector('.popup__profile-edit');
const cardForm = document.querySelector('.popup__card-form');
const fullscreenCard = document.querySelector('.popup__fullscreen');
const closeFullscreenButton = document.querySelector('.popup__close-button_fullscreen');
const newCardForm = document.querySelector('.popup__newcard-form');
const popupFormProfile = document.querySelector('.popup__form-profile');
const fullscreenImage = document.querySelector('.popup__image');
const fullscreenTitle = document.querySelector('.popup__image-title');
const errors = Array.from(document.querySelectorAll('.popup__input_error'));
const inputSelector = Array.from(document.querySelectorAll('.popup__input'));
const initialCards = [
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    }
];

const allFormsClasses = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};


function popupOpen(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', escClosePopup);
    popup.addEventListener('click', overlayClosePopup);
}

function popupClose(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', escClosePopup);
    popup.removeEventListener('click', overlayClosePopup);
    removeErrors();
}

function escClosePopup(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        popupClose(openedPopup);
    };
}

function overlayClosePopup(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup')) {
        popupClose(openedPopup);
    };
}

function submitProfileInfo(evt) {
    evt.preventDefault();
    profileName.textContent = popupTextName.value;
    profileAbout.textContent = popupTextAbout.value;
    popupClose(popupProfileEdit);
}

function addCard(container, element) {
    container.prepend(element);
};

function addNewCard(data) {
    const newCard = new Card(data, '#card-template');
    const newCardElement = newCard.createCard();
    addCard(elements, newCardElement);
}

function validate(allClasses, formValid) {
    const validatedForm = new FormValidator(allClasses, formValid);
    validatedForm.enableValidation();
}

function removeErrors() {
    errors.forEach(function(errorElement) {
        errorElement.textContent = "";
    });
    inputSelector.forEach(function(inputElement) {
        inputElement.classList.remove("popup__input_type_error");
    });
}

initialCards.forEach(function(item) {
    addNewCard(item);
});

popupFormProfile.addEventListener('submit', submitProfileInfo);

editProfileButton.addEventListener('click', function() {
    popupTextName.value = profileName.textContent;
    popupTextAbout.value = profileAbout.textContent;
    popupOpen(popupProfileEdit);
});

addCardButton.addEventListener('click', function() {
    cardName.value = "";
    cardLink.value = "";
    popupOpen(cardForm);
});

closeButton.addEventListener('click', function(evt) {
    popupClose(popupProfileEdit);
});

closeFormButton.addEventListener('click', function() {
    popupClose(cardForm);
});

popupForm.addEventListener('submit', submitProfileInfo);

newCardForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    addNewCard({
        name: cardName.value,
        link: cardLink.value
    })
    popupClose(cardForm);
});

validate(allFormsClasses, popupFormProfile);
validate(allFormsClasses, newCardForm);







