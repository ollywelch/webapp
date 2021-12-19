#!/bin/bash

docker build -t ollywelch/webapp-frontend:latest frontend
docker build -t ollywelch/webapp-backend:latest backend
docker-compose push