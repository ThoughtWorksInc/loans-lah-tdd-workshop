import fetchMock from "fetch-mock";
import API from '../api';

afterEach(fetchMock.reset);

describe('login', function () {
    it('calls POST /api/users/login with username and password', function () {
        const expectedJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";
        let response = {
            status: 200,
            body: { jwt: expectedJwt }
        };
        let username = 'johndoe';
        let password = 'foobar';
        let options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: { name: username, password }
        };
        fetchMock.post('/api/users/login', response, options);

        return API.login(username, password)
            .then(jwt => {
                expect(jwt).toEqual(expectedJwt);
            });
    });
});

describe('register', function () {
    it('calls POST /api/users with username and password', function () {
        let username = 'johndoe';
        let password = 'foobar';
        let options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: { name: username, password }
        };
        fetchMock.post('/api/users', 201, options);

        return API.register(username, password)
            .then(result => {
                expect(result).toBe(true);
            });
    });
});