export default class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserAttribute() {
        return fetch(this.baseUrl + '/users/me', {
        headers: this.headers,
        })
        .then((res) => this._checkResponse(res));
    }

    getInitialCards() {
        return fetch (this.baseUrl + '/cards', {
            headers: this.headers,
        })
        .then((res) => this._checkResponse(res));
    }

    promiseAll() {
        return Promise.all([this.getUserAttribute(), this.getInitialCards()]);
    }

    renderLoading(button, isLoading, text) {
        if(isLoading) {
            this._buttonText = button.textContent;
            button.textContent = text;
        } else {
            button.textContent = this._buttonText;
        }
    }

    setUserAttribute(inputName, inputAbout) {
        return fetch(this.baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: inputName,
                about: inputAbout
            }),
        })
        .then((res) => this._checkResponse(res))
    }

    addCard(inputName, inputLink) {
        return fetch(this.baseUrl + '/cards', {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: inputName,
                link: inputLink,
            }),
        })
        .then((res) => this._checkResponse(res))
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
        })
        .then((res) => this._checkResponse(res))
    }

    dislikeCard(cardId) {
        return fetch(this.baseUrl + '/cards/likes/' + cardId, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then((res) => this._checkResponse(res));
    }

    changeAvatar(avatar) {
        return fetch(this.baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
            avatar: avatar,
            }),
        })
        .then((res) => this._checkResponse(res));
    }
}
