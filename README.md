# loans-lah-tdd-workshop

## Modules
### api-tests
End to end tests for Loans Lah!

### credit-history
Legacy 3rd party application, used as a dependency in loans-lah app to calculate credit eligibility.

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
In any case you'd like to clean docker containers and LoansLah docker's images run `./reset.sh`
