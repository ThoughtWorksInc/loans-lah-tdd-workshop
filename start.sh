#!/bin/bash

docker-compose down --remove-orphans

trap "exit" INT TERM ERR
trap "kill 0" EXIT

docker-compose up --build --force-recreate &
pushd ./loans-lah-web; npm start &
popd

wait