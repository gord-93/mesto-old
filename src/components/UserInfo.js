export default class UserInfo {
    constructor({userName, userAbout}) {
        this._name = document.querySelector(userName);
        this._about = document.querySelector(userAbout);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        };
    }
    
    setUserInfo({name, about}) {
        this._name.textContent = name;
        this._about.textContent = about;
    }
}

