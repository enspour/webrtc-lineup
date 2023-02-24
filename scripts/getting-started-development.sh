#!/bin/bash

workdir=$(pwd)

clear

# Downloading necessary images of docker
echo "-- Downloading necessary images of docker"
docker pull nginx:1.23.2-alpine
docker pull postgres:14.5-alpine
docker pull cassandra:4.1

clear

# Installing all dependencies
# Installing backend dependencies
echo "-- Installing backend dependencies...";

cd $workdir/backend/ && npm install;

clear

# Installing frontend dependencies
echo "-- Installing frontend dependencies...";

cd $workdir/client/ && npm install;

clear

# Generation ssh keys for auth service.
echo "-- Generating ssh-keys...";

cd $workdir/backend/auth-service/;

# Create folder for keys
mkdir keys;

# Create folders for access and refresh token
cd keys;
mkdir accessToken;
mkdir refreshToken;

clear

# Generate ssh keys for access token
echo "-- Generating ssh keys for access token...";
cd $workdir/backend/auth-service/keys/accessToken;
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key -N "";
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub

clear

# Generate ssh keys for refresh token
echo "-- Generating ssh keys for refresh token...";
cd $workdir/backend/auth-service/keys/refreshToken;
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key -N "";
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub

clear

# Setting environment variables
echo "-- Setting environment variables...";

cd $workdir/backend/core;
echo "DATABASE_URL=postgresql://admin:mysecretpassword@localhost:5432/lineup" > .env

clear

# Initializing prisma
echo "-- You need to launch postgresql in docker. Run the following commands."
echo 1. cd $workdir/backend/core/postgresql/docker
echo 2. docker compose -f docker-compose.dev.yml up

echo "-- Wait for the database to start. After that press any key to continue."
read -N 1 -s -r

cd $workdir/backend/core
npx prisma generate
npx prisma db push

echo "-- Stop postgresql docker container"
