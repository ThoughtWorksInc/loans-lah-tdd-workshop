#!/bin/bash

pushd ./credit-history; ./build.sh
popd

pushd ./loan; ./build.sh
popd