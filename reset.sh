#!/bin/bash

readonly containers=$(docker ps -qa)
readonly images=$(docker images -q | grep loan)

if [[ -n "$containers" ]]; then
    docker kill $containers
    docker rm -f $containers
fi

if [[ -n "$images" ]]; then
    docker rmi -f $images
fi

