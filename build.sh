#!/bin/bash

pushd ./credit-history; ./build.sh
popd

pushd ./loan; ./build.sh
popd

pushd ./loans-lah-app; npm i; npm test; npm run build;
popd

pushd ./api-tests; ./build.sh
popd

pushd ./loans-lah-web; npm i; npm test;
popd