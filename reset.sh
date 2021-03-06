#!/bin/bash

readonly containers=$(docker ps -a | grep loans | awk '{print $1}')
readonly images=$(docker images | grep loans | awk '{print $3}')

if [[ -n "$containers" ]]; then
    docker kill $containers
    docker rm -f $containers
fi

if [[ -n "$images" ]]; then
    docker rmi -f $images
fi

