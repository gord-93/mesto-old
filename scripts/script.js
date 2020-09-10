let page = document.querySelector('.page');
let profile = document.querySelector('.profile');
let editProfileButton = profile.querySelector('.profile__edit-button');
let addCardButton = profile.querySelector('.profile__add-button');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let popupCardForm = document.querySelector('.popup__card');
let popup = page.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let popupForm = popup.querySelector('.popup__form');
let popupTextName = popupForm.querySelector('.popup__text-name');
let popupTextAbout = popupForm.querySelector('.popup__text-about');
let submitButton = popupForm.querySelector('.popup__save-button');
let closeFormButton = document.querySelector('.popup__close-button_card');
let elements = document.querySelector('.elements');
let likeButton = document.querySelector('.elements__like-button');
let cardCreateButton = document.querySelector('.popup__save-button_card');
let nameCard = document.querySelector('.popup__text-name_card');
let linkCard = document.querySelector('.popup__link');
let resetButton = document.querySelector('.elements__reset-button');
let fullImage = document.querySelector('.full-image');



const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach(function(item) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.elements__title').textContent = item.name;
    cardElement.querySelector('.elements__image').src = item.link;
    cardElement.querySelector('.elements__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like-button_active')});
    cardElement.querySelector('.elements__reset-button').addEventListener('click', function(evt) {
        const elementOfElements = evt.target.parentNode;
        elementOfElements.remove();
        });
    elements.append(cardElement);
});

function popupEditProfileOnOff() {
    popup.classList.toggle('popup_opened');
}

function popupCardFormOnOff() {
    popupCardForm.classList.toggle('popup_opened');
}

function submitProfileInfo(evt) {
    evt.preventDefault();
    profileName.textContent = popupTextName.value;
    profileAbout.textContent = popupTextAbout.value;
    popupEditProfileOnOff();
}

function addCard(evt) {
    evt.preventDefault();
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.elements__title').textContent = nameCard.value;
    cardElement.querySelector('.elements__image').src = linkCard.value;
    cardElement.querySelector('.elements__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('elements__like-button_active')});
    cardElement.querySelector('.elements__reset-button').addEventListener('click', function() {
        const elementOfElements = document.querySelector('.elements__element');
        elementOfElements.remove();
    });
    elements.prepend(cardElement);
    popupCardFormOnOff();
}

editProfileButton.addEventListener('click', function() {
    popupTextName.value = profileName.textContent;
    popupTextAbout.value = profileAbout.textContent;
    popupEditProfileOnOff();
});

addCardButton.addEventListener('click', function() {
    nameCard.value = "";
    linkCard.value = "";
    popupCardFormOnOff();
});

closeButton.addEventListener('click', popupEditProfileOnOff);
popupForm.addEventListener('submit', submitProfileInfo);
closeFormButton.addEventListener('click', popupCardFormOnOff);
cardCreateButton.addEventListener('click', addCard);
