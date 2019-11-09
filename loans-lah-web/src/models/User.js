export default class User {
    constructor(name, jwt) {
        this.name = name;
        this.jwt = jwt;
        this.loggedIn = (jwt != null);
    }
}

export const GUEST_USER = new User("Guest", null);