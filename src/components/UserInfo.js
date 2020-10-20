export default class UserInfo {
    constructor(userName, userAbout) {
        this._name = userName.profileName;
        this._about = userAbout.profileAbout;
    }

    getUserInfor() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        }
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
    }
}