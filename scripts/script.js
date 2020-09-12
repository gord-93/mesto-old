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
const cardTemplate = document.querySelector('#card-template');




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

function addCard(cardTitle, imageSrc) {
    const cardElement = cardTemplate.cloneNode(true).content;
    const cardPicture = cardElement.querySelector('.elements__image');
    cardElement.querySelector('.elements__title').textContent = cardTitle;
    cardPicture.src = imageSrc;
    cardPicture.alt = cardTitle;
    cardPicture.addEventListener('click', function() {
        const fullscreenImage = document.querySelector('.popup__image');
        const fullscreenTitle = document.querySelector('.popup__image-title');
        fullscreenImage.src = imageSrc;
        fullscreenTitle.textContent = cardTitle;
        fullscreenImage.alt = cardTitle;
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
    addCard(cardName.value, cardLink.value);
    popupClose(cardForm);
});

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

