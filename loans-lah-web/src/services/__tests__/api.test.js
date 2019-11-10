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

describe('applyNewLoan', function () {
    it('calls POST /api/loans with amount and duration', function () {
        let jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";
        let amount = 10.2;
        let duration = 30;
        let response = {
            status: 200,
            body: { status: "ok", location: { url: "/api/v1/accounts/1/loans/1" } }
        };
        let options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: { amount, durationInDays: duration }
        };
        fetchMock.post('/api/loans', response, options);

        return API.applyNewLoan({ jwt, loan: { amount, duration } })
            .then(result => {
                expect(result).toBe(true);
            });
    });
});

describe('getAllLoans', function () {
    it('calls GET /api/loans to fetch all loans of the user', function () {
        let jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U";
        let loans = [
            { id: 1, amount: 200 },
            { id: 2, amount: 500 }
        ];
        let response = {
            status: 200,
            body: loans
        };
        let options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        };
        fetchMock.get('/api/loans', response, options);

        return API.getAllLoans({ jwt })
            .then(result => {
                expect(result).toEqual(loans);
            });
    });
});