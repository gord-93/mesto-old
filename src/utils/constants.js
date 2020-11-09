export {fullscreenImage, fullscreenTitle, editProfileButton, addCardButton,popupTextName, popupTextAbout, cardName, cardLink, 
    newCardForm, popupFormProfile, allFormsClasses, escButton, popupSaveButton, avatarEditButton,
    popupAvatarForm, resetCardButton, initialCards, profileName, profileAbout, profileAvatar, popupTextCard, popupLinkCard,
    popupAvatarLink, saveButtonAvatar, popupSaveCard};


const profile = document.querySelector('.profile');
const editProfileButton = profile.querySelector('.profile__edit-button');
const addCardButton = profile.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__form');
const popupTextName = popupForm.querySelector('.popup__text-name');
const popupTextAbout = popupForm.querySelector('.popup__text-about');
const cardName = document.querySelector('.popup__text-name_card');
const cardLink = document.querySelector('.popup__link');
const newCardForm = document.querySelector('.popup__newcard-form');
const popupFormProfile = document.querySelector('.popup__form-profile');
const fullscreenImage = document.querySelector('.popup__image');
const fullscreenTitle = document.querySelector('.popup__image-title');
const popupSaveButton = document.querySelector('.popup__save-button');
const avatarEditButton = document.querySelector('.profile__edit-icon');
const saveButtonAvatar = document.querySelector('.popup__save-button_avatar');
const popupAvatarForm = document.querySelector('.popup__avatar-form');
const resetCardButton = document.querySelector('.elements__reset-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileAvatar = document.querySelector('.profile__avatar');
const popupTextCard = document.querySelector('.popup__text-name_card');
const popupLinkCard = document.querySelector('.popup__link');
const popupAvatarLink = document.querySelector('.popup__avatar-link');
const popupSaveCard = document.querySelector('.popup__save-button_card');
const escButton = 'Escape';
const initialCards = [
    // {
    //     name: 'Байкал',
    //     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    // },
    // {
    //     name: 'Холмогорский район',
    //     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    // },
    // {
    //     name: 'Камчатка',
    //     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    // },
    // {
    //     name: 'Иваново',
    //     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    // },
    // {
    //     name: 'Челябинская область',
    //     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    // },
    // {
    //     name: 'Архыз',
    //     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    // }
];

const allFormsClasses = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};