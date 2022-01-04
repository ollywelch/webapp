#!/bin/bash

registry=localhost:5000

while getopts r: flag
do
    case "${flag}" in
        r) registry=${OPTARG};;
    esac
done

# Build the images in the compose file
for component in frontend backend 
do
    docker build -t ${registry}/webapp-${component}:latest ${component}
    docker push ${registry}/webapp-${component}:latest
done

