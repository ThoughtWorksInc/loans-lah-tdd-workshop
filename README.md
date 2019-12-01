# loans-lah-tdd-workshop

## Modules
### api-tests
End to end tests for Loans Lah!

### loan
Backend application, exposes api for taking a loan.

### db
Database module, used by docker

### loans-lah-app 
BFF for loans-lah backend services

### loans-lah-web
UI for loans-lah

### loans-lah-e2e
e2e test suite for loans-lah

## Setup
Setup for project for [IntelliJ](https://github.com/ThoughtWorksInc/loans-lah-tdd-workshop/blob/master/doc/SETUP.md)

## Requirements
`openjdk-11`

`docker` latest version

`docker-compose` [compatible](https://docs.docker.com/compose/compose-file/) with version 3.7 of compose files

`Nodejs` version `12.x`

## How to test
Run `./build.sh` from the main directory to build all modules

## How to build & run
Run `./build.sh` from the main directory to build all modules

Next, run `./start.sh` to run all of them.

## Troubleshooting
### My artifact used by Docker seems to be old ...
Both `loan` and `loan-lah-app` exposes `/actuator/info` which contains git sha info.
It helps you to verify which git commit has been taken by Docker.
Send `GET` to `http://localhost:8910/actuator/info` for `loan-lah-app`
Send `GET` to `http://localhost:8010/actuator/info` for `loan`  
You'll see similar response
```json
{
  "git": {
    "branch": "master",
    "commit": {
      "id": "a38c485",
      "time": "2019-12-01T06:38:19Z"
    }
  }
}
```
Compare it with `git rev-parse --short HEAD` output. All SHAs should be the same.

### I want to remove LoanLah's docker images & containers
If you'd like to remove LoansLah's docker containers and images run `./reset.sh`
