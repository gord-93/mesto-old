import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {editProfileButton, addCardButton,popupTextName, popupTextAbout, cardName, cardLink, 
    newCardForm, popupFormProfile, allFormsClasses, popupSaveButton, 
    avatarEditButton, popupAvatarForm} from '../utils/constants.js';
import Api from '../components/Api.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
    headers: {
        authorization: '95ba4cb9-0c59-47de-9637-4b548933da0f',
        "Content-type": "application/json",
    },
});

const profileValidated = new FormValidator(allFormsClasses, popupFormProfile);
const cardValidated =  new FormValidator(allFormsClasses, newCardForm);
const openFullImage = new PopupWithImage('.popup__fullscreen');
const userInfo = new UserInfo({userName: '.profile__name', userAbout: '.profile__about', userAvatar: '.profile__avatar'});

const avatarEdit = new PopupWithForm(submitAvatar, '.popup__edit-avatar'); 

const profileEdit = new PopupWithForm(function submitProfileInfo({name, about}) {
    api
        .setUserAttribute({name: name, about: about})
        .then(() => {
            userInfo.setUserInfo({name: popupTextName.value, about: popupTextAbout.value});
        })
        .finally(() => {
            profileEdit.close();
        })
}, '.popup__profile-edit');

const cardEdit = new PopupWithForm((evt) => {
    evt.preventDefault();
    const data = {
                name: cardName.value,
                link: cardLink.value
            };
    const newCard = new Card(data, '#card-template', () => {openFullImage.open(data);});
    const newCardElement = newCard.createCard();
    initCardElements.addItem(newCardElement);
    cardEdit.close();
}, '.popup__card-form');


function loadingStatus(isLoading, popupSubmit) {
    if (isLoading) {
        popupSubmit.value = popupSubmit.value + "...";
    } else {
        popupSubmit.value = popupSubmit.value.slice(0, popupSubmit.value.length - 3);
    }
}

profileValidated.enableValidation();
cardValidated.enableValidation();
openFullImage.setEventListeners();
profileEdit.setEventListeners();
cardEdit.setEventListeners();
avatarEdit.setEventListeners();

editProfileButton.addEventListener('click', () => {
    profileEdit.open();
    profileValidated.removeErrors();
    popupTextName.value = userInfo.getUserInfo().name;
    popupTextAbout.value = userInfo.getUserInfo().about;
});

addCardButton.addEventListener('click', () => {
    cardValidated.removeErrors();
    cardEdit.open();
});

avatarEditButton.addEventListener('click', () => {
    avatarEdit.open();
})


function submitAvatar(avatar) {
    api
    .changeAvatar(avatar.link)
    .then(() => {
        userInfo.setUserAvatar(avatar.link);
    })
    .finally(() => {
        avatarEdit.close();
    })
}



api.promiseAll().then(([user, initialCards]) => {
    userInfo.setUserInfo({ name: user.name, about: user.about, userId: user._id });
    userInfo.setUserAvatar(user.avatar);
    const initialCardsElements = new Section({
        items: initialCards,
        renderer: (data) => {
            const newCard = new Card(data, '#card-template', () => {openFullImage.open(data);});
            const newCardElement = newCard.createCard();
            initialCardsElements.addItem(newCardElement);
        },
    },
    '.elements'
    );
    initialCardsElements.render();
});


