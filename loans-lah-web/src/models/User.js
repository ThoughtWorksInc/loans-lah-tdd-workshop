export default class User {
    constructor(name, loggedIn) {
        this.name = name;
        this.loggedIn = loggedIn;
    }
}

export const GUEST_USER = new User("Guest", false);