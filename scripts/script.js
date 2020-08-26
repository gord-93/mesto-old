let page = document.querySelector('.page');
let profile = document.querySelector('.profile');
let editProfileButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let popupForm = popup.querySelector('.popup__form');
let popupTextName = popupForm.querySelector('.popup__text-name');
let popupTextAbout = popupForm.querySelector('.popup__text-about');
let submitButton = popupForm.querySelector('.popup__save-button');

function popupOpen() {
    popup.classList.add('popup_opened');
    popupTextName.value = profileName.textContent;
    popupTextAbout.value = profileAbout.textContent;
}

editProfileButton.addEventListener('click', popupOpen);

function popupClosed() {
    popup.classList.remove('popup_opened')
}

closeButton.addEventListener('click', popupClosed);

function submitProfileInfo(evt) {
    evt.preventDefault();
    let nameInput = popupTextName.value;
    let aboutInput = popupTextAbout.value;
    profileName.textContent = nameInput;
    profileAbout.textContent = aboutInput;
    popupClose();
}

popupForm.addEventListener("submit", submitProfileInfo);