export default class UserInfo {
    constructor({userName, userAbout, userAvatar}) {
        this._name = document.querySelector(userName);
        this._about = document.querySelector(userAbout);
        this._avatar = document.querySelector(userAvatar);
    }
    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        };
    }
    setUserInfo({name, about, userId}) {
        this._name.textContent = name;
        this._about.textContent = about;
        this._id = userId;
    }
    setUserAvatar(avatar) {
        this._avatar.src = avatar;
    }
    getUserId() {
        return this._id;
    }
}

