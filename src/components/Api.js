import { popupTextAbout, popupTextName } from "../utils/constants";

export default class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }
    getUserAttribute() {
        return fetch(this.baseUrl + '/users/me', {
        headers: this.headers,
        })
        .then((res) => {
            if (res.ok) {
            return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    getInitialCards() {
        return fetch (this.baseUrl + '/cards', {
            headers: this.headers,
        })
        .then((res) => {
            if (res.ok) {
            return res.json();
            }
        return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    promiseAll() {
        return Promise.all([this.getUserAttribute(), this.getInitialCards()]);
    }
    setUserAttribute(inputName, inputAbout) {
        return fetch(this.baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: inputName,
                about: inputAbout
            }),
        }).then((res) => {
            if (res.ok) {
            return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    addCard(inputName, inputLink) {
        return fetch(this.baseUrl + '/cards', {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: inputName,
                link: inputLink,
            }),
        }).then((res) => {
            if(res.ok) {
            return res.json();
            }
        return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    removeCard(cardId) {
        return fetch(this.baseUrl + '/cards/' + cardId, {
            method: 'DELETE',
            headers: this.headers,
        });
    }
    likeCard(cardId) {
        return fetch(this.baseUrl + '/cards/likes/' + cardId, {
            method: 'PUT',
            headers: this.headers,
        }).then((res) => {
            if (res.ok) {
            return res.json();
            }
        return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    dislikeCard(cardId) {
        return fetch(this.baseUrl + '/cards/likes/' + cardId, {
            method: 'DELETE',
            headers: this.headers,
        }).then((res) => {
            if(res.ok) {
            return res.json();
            }
        return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    changeAvatar(avatar) {
        return fetch(this.baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
            avatar: avatar,
            }),
        }).then((res) => {
            if (res.ok) {
            return res.json();
            }
        return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
}
