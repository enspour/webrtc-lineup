[Go to readme](../README.md)

## Set up the project with script 

``` bash
./scripts/getting-started-development.sh
```

## Set up the project manually 
1. Download necessary docker images
``` bash
docker pull node:18.16
docker pull nginx:1.23.2-alpine
docker pull postgres:14.5-alpine
docker pull cassandra:4.1
```

2. Install all dependencies. **Start to run this command in base folder of project.**

``` bash
cd app/backend && npm install
```

``` bash
cd ../client && npm install
```

3. Creating ssh-keys for Auth Service. **Start to run this command in base folder of project.**

- Creating folders for keys
 
``` bash
cd app/backend/services/auth-service/ && mkdir keys && cd keys
```

``` bash
mkdir accessToken && mkdir refreshToken
```

- Generate ssh keys for access token

``` bash
cd accessToken && ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
```

``` bash
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```

- Generate ssh keys for refresh token

``` bash
cd ../refreshToken && ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
```

``` bash
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```

3. Setting environment variables. **Start to run this command in base folder of project.**

- Postgres settings

``` bash
cd app/backend/databases/postgresql && echo "DATABASE_URL=postgresql://admin:mysecretpassword@localhost:5432/lineup" > .env
```

4. Initialize prisma. 

- Run postgresql in docker. **Start to run this command in base folder of project.**

``` bash
docker run --rm \
    -e POSTGRES_USER=admin \
    -e POSTGRES_PASSWORD=mysecretpassword \
    -v app/data/postgresql:/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres:14.5-alpine
```

- Generate and push db. **Start to run this command in base folder of project.**

``` bash
cd app/backend/databases/postgresql && npx prisma generate && npx prisma db push
```
- Stop postgresql docker container.

## Run service in development mode

- Run lineup with tmux

``` bash
./scripts/tmux-development.sh
```