let page = document.querySelector('.page');
let profile = document.querySelector('.profile');
let editProfileButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let popup = page.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let popupForm = popup.querySelector('.popup__form');
let popupTextName = popupForm.querySelector('.popup__text-name');
let popupTextAbout = popupForm.querySelector('.popup__text-about');
let submitButton = popupForm.querySelector('.popup__save-button');

function popupOpen() {
    popupTextName.value = profileName.textContent;
    popupTextAbout.value = profileAbout.textContent;
    popup.classList.add('popup_opened');
}

function popupClosed() {
    popup.classList.remove('popup_opened');
}

function submitProfileInfo(evt) {
    evt.preventDefault();
    profileName.textContent = popupTextName.value;
    profileAbout.textContent = popupTextAbout.value;
    popupClosed();
}

editProfileButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClosed);
popupForm.addEventListener('submit', submitProfileInfo);

