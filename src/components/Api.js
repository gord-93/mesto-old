export default class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }
    getUserAttribute() {
        return fetch(this.baseUrl + "/users/me", {
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
    setUserAttribute() {
        return fetch(this.baseUrl + "/users/me", {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            }),
        }).then((res) => {
            if (res.ok) {
            return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    addCard({ name, link }) {
        return fetch(this.baseUrl + "/cards", {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
            name: name,
            link: link,
            }),
        }).then((res) => {
            if(res.ok) {
            return res.json();
            }
        return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    deleteCard(cardId) {
        return fetch(this.baseUrl + "/cards/" + cardId, {
            method: "DELETE",
            headers: this.headers,
        });
    }
    isLiked(cardId) {
        return fetch(this.baseUrl + "/cards/likes/" + cardId, {
            method: "PUT",
            headers: this.headers,
        }).then((res) => {
            if (res.ok) {
            return res.json();
            }
        return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    disLike(cardId) {
        return fetch(this.baseUrl + "/cards/likes/" + cardId, {
            method: "DELETE",
            headers: this.headers,
        }).then((res) => {
            if(res.ok) {
            return res.json();
            }
        return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
    changeAvatar(avatar) {
        return fetch(this.baseUrl + "/users/me/avatar", {
            method: "PATCH",
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
