let page = document.querySelector('.page');
let profile = document.querySelector('.profile');
let editProfileButton = profile.querySelector('.profile__edit-button');
let addCardButton = profile.querySelector('.profile__add-button');
let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let elements = document.querySelector('.elements');
let popup = page.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let popupForm = popup.querySelector('.popup__form');
let popupTextName = popupForm.querySelector('.popup__text-name');
let popupTextAbout = popupForm.querySelector('.popup__text-about');
let closeFormButton = document.querySelector('.popup__close-button_card');
let nameCard = document.querySelector('.popup__text-name_card');
let linkCard = document.querySelector('.popup__link');
let popupProfileEdit = document.querySelector('.popup__profile-edit');
let cardForm = document.querySelector('.popup__card-form');
let fullscreenCard = document.querySelector('.popup__fullscreen');
let closeFullscreenButton = document.querySelector('.popup__close-button_fullscreen');
let newCardForm = document.querySelector('.popup__newcard-form');
let cardInputText = document.querySelector('.popup__text-name_card');
let cardTemplate = document.querySelector('#card-template');




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



function popupOpen(popup) {
    popup.classList.add('popup_opened');
}

function popupClose(popup) {
    popup.classList.remove('popup_opened');
}

function submitProfileInfo(evt) {
    evt.preventDefault();
    profileName.textContent = popupTextName.value;
    profileAbout.textContent = popupTextAbout.value;
    popupClose(popupProfileEdit);
}

function addCard(cardtitle, imageSrc) {
    const cardElement = cardTemplate.cloneNode(true).content;
    const cardPicture = cardElement.querySelector('.elements__image');
    cardElement.querySelector('.elements__title').textContent = cardtitle;
    cardPicture.src = imageSrc;
    cardPicture.addEventListener('click', function() {
        const fullscreenImage = document.querySelector('.popup__image');
        const fullscreenTitle = document.querySelector('.popup__image-title');
        fullscreenImage.src = imageSrc;
        fullscreenTitle.textContent = cardtitle;
        popupOpen(fullscreenCard);
    });
    cardElement.querySelector('.elements__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like-button_active');
    });
    cardElement.querySelector('.elements__reset-button').addEventListener('click', function(evt) {
        const elementOfElements = evt.target.closest('.elements__element');
        elementOfElements.remove();
    });
    elements.prepend(cardElement);
};


initialCards.forEach(function(item) {
    addCard(item.name, item.link);
});

newCardForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    addCard(cardInputText.value, linkCard.value);
    popupClose(cardForm);
});

editProfileButton.addEventListener('click', function() {
    popupTextName.value = profileName.textContent;
    popupTextAbout.value = profileAbout.textContent;
    popupOpen(popupProfileEdit);
});

addCardButton.addEventListener('click', function() {
    nameCard.value = "";
    linkCard.value = "";
    popupOpen(cardForm);
});

closeButton.addEventListener('click', function() {
    popupClose(popupProfileEdit);
});

closeFormButton.addEventListener('click', function() {
    popupClose(cardForm);
});

closeFullscreenButton.addEventListener('click', function() {
    popupClose(fullscreenCard);
});

popupForm.addEventListener('submit', submitProfileInfo);

