#!/bin/bash

if [ -z "$SERVER" ]; then
    echo "SERVER variable not set"
    read -e -p "Please provide the FQDN of the service:" SERVER
fi

if [ -z "$STACK" ]; then
    echo "STACK variable not set"
    read -e -p "Please provide the name of the stack to be deployed:" STACK
fi

export SERVER=$SERVER
export STACK=$STACK

for component in frontend backend
do
    # Pull from remote registry
    docker pull ollywelch/webapp-${component}:latest
    # Tag, ready to be pushed to local registry
    docker tag ollywelch/webapp-${component}:latest localhost:5000/webapp-${component}:latest 
done

# Push to local registry
docker-compose push

# Deploy the docker stack
docker stack deploy --compose-file docker-compose.yml ${STACK}