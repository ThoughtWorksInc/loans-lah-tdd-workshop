function checkStatus(res) {
    if (res.ok) {
        return res;
    } else {
        throw new Error(res.statusText);
    }
}

const API = {
    login(username, password) {
        let payload = {
            name: username,
            password
        };

        return fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(checkStatus)
            .then(res => res.json())
            .then(data => data.jwt);
    },
    register(username, password) {
        let payload = {
            name: username,
            password
        };

        return fetch('/api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(checkStatus)
            .then(data => true);
    },
    applyNewLoan({ jwt, loan: { amount, duration } }) {
        let payload = {
            amount,
            durationInDays: duration
        };

        return fetch('/api/loans', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify(payload)
        }).then(checkStatus)
            .then(data => true);
    }
};

export default API;