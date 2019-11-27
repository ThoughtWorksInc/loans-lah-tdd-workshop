#!/bin/bash

function check_changes() {
    local current_sha=`git rev-parse --short HEAD`
    local remote_sha=`git rev-parse --short origin/master`
    if [ "$current_sha" != "$remote_sha" ]; then
        echo "New changes in master, current: $current_sha, remote: $remote_sha"
        git --no-pager log --decorate=short --pretty=oneline "$current_sha"^.."$remote_sha"
    fi
}

# check_changes

docker-compose down --remove-orphans

pushd ./credit-history; ./build.sh
popd

pushd ./loan; ./build.sh
popd

pushd ./payment; ./build.sh
popd

pushd ./loans-lah-app; npm i; npm test; npm run build;
popd

pushd ./api-tests; ./build.sh
popd

pushd ./loans-lah-web; npm i; npm test;
popd

docker-compose build