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

## How to build & run
Run `./build.sh` from the main directory to build all modules, next `docker-compose up --force-recreate` to run all of them.


