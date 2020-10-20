export {closeButton, fullscreenImage, fullscreenTitle, fullscreenCard, closeFullscreenButton,
    profile, editProfileButton, addCardButton, profileName, profileAbout, elementArea, popup, popupForm, popupTextName, popupTextAbout, closeFormButton,
    cardName, cardLink, popupProfileEdit, cardForm, newCardForm, popupFormProfile, initialCards, allFormsClasses};


const profile = document.querySelector('.profile');
const editProfileButton = profile.querySelector('.profile__edit-button');
const addCardButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const elementArea = document.querySelector('.elements');
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