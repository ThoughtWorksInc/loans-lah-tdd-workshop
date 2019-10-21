#!/bin/bash

pushd ./credit-history; ./build.sh
popd

pushd ./loan; ./build.sh
popd

pushd ./loans-lah-app; npm i; npm run build;
popd