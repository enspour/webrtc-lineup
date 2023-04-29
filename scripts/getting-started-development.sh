#!/bin/bash

SCRIPT_DIR=$(dirname $0)

cd $SCRIPT_DIR/..

WORK_DIR=$(pwd)

clear

# Downloading necessary images of docker
echo "-- Downloading necessary images of docker"
docker pull node:18.16
docker pull nginx:1.23.2-alpine
docker pull postgres:14.5-alpine
docker pull cassandra:4.1

clear

# Installing all dependencies
# Installing backend dependencies
echo "-- Installing backend dependencies...";

cd $WORK_DIR/app/backend/ && npm install;

clear

# Installing frontend dependencies
echo "-- Installing frontend dependencies...";

cd $WORK_DIR/app/client/ && npm install;

clear

# Generation ssh keys for auth service.
echo "-- Generating ssh-keys...";

cd $WORK_DIR/app/backend/services/auth-service/;

# Create folder for keys
mkdir keys;

# Create folders for access and refresh token
cd keys;
mkdir accessToken;
mkdir refreshToken;

clear

# Generate ssh keys for access token
echo "-- Generating ssh keys for access token...";
cd $WORK_DIR/app/backend/services/auth-service/keys/accessToken;
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key -N "";
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub

clear

# Generate ssh keys for refresh token
echo "-- Generating ssh keys for refresh token...";
cd $WORK_DIR/app/backend/services/auth-service/keys/refreshToken;
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key -N "";
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub

clear

# Setting environment variables
echo "-- Setting environment variables...";

cd $WORK_DIR/app/backend/databases/postgresql;

echo "DATABASE_URL=postgresql://admin:mysecretpassword@localhost:5432/lineup" > .env

CONTAINER_ID=$(docker run --rm -d \
	    -e POSTGRES_USER=admin \
		-e POSTGRES_PASSWORD=mysecretpassword \
	    -v $WORK_DIR/app/data/postgresql:/var/lib/postgresql/data \
        -p 5432:5432 \
		--health-cmd='pg_isready -U admin' \
		--health-interval=10s \
		--health-timeout=5s \
		--health-retries=5 \
	    postgres:14.5-alpine
    )

until [ "`docker inspect -f {{.State.Health.Status}} $CONTAINER_ID`"=="healthy" ]; do
    sleep 0.5;
done;

npx prisma generate
npx prisma db push

docker stop $CONTAINER_ID