export {editProfileButton, addCardButton,popupTextName, popupTextAbout,
    newCardForm, popupFormProfile, allFormsClasses, avatarEditButton,
    popupTextCard, popupLinkCard, popupAvatarForm, popupAvatarLink, 
    fullscreenImage, fullscreenTitle, escButton, initialCards,
    popupEditSaveButton, popupCardSaveButton, popupAvatarSaveButton, popupRemoveSaveButton,
    elements};

const profile = document.querySelector('.profile');
const editProfileButton = profile.querySelector('.profile__edit-button');
const addCardButton = profile.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__form');
const popupTextName = popupForm.querySelector('.popup__text-name');
const popupTextAbout = popupForm.querySelector('.popup__text-about');
const newCardForm = document.querySelector('.popup__newcard-form');
const popupFormProfile = document.querySelector('.popup__form-profile');
const fullscreenImage = document.querySelector('.popup__image');
const fullscreenTitle = document.querySelector('.popup__image-title');
const avatarEditButton = document.querySelector('.profile__edit-icon');
const popupAvatarForm = document.querySelector('.popup__avatar-form');
const popupTextCard = document.querySelector('.popup__text-name_card');
const popupLinkCard = document.querySelector('.popup__link');
const popupAvatarLink = document.querySelector('.popup__avatar-link');
const popupEditSaveButton = document.querySelector('.popup__save-button');
const popupCardSaveButton = document.querySelector('.popup__save-button_card');
const popupAvatarSaveButton = document.querySelector('.popup__save-button_avatar');
const popupRemoveSaveButton = document.querySelector('.popup__save-button_delete-accept');
const elements = document.querySelector('.elements');
const escButton = 'Escape';
const initialCards = [];

const allFormsClasses = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};