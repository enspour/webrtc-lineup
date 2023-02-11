[Go to readme](../README.md)

## Set up the project manually 

1. Install all dependencies. **Start to run this command in base folder of project.**

``` bash
cd backend && npm install
```

``` bash
cd ../client && npm install
```

2. Creating ssh-keys for Auth Service. **Start to run this command in base folder of project.**

- Creating folders for keys
 
``` bash
cd backend/auth-service/ && mkdir keys && cd keys
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
cd backend/core && echo "DATABASE_URL=postgresql://admin:mysecretpassword@localhost:5432/lineup" > .env
```

4. Initialize prisma. 

- Run postgresql in docker. **Start to run this command in base folder of project.**

``` bash
cd backend/core/postgresql/docker && docker compose -f docker-compose.dev.yml up
```

- Generate and push db. **Start to run this command in base folder of project.**

``` bash
cd backend/core && npx prisma generate && npx prisma db push
```
- Stop postgresql docker container.


## Set up the project with script 

``` bash
./scripts/getting-started.sh
```

## Run service in development mode

- Run lineup with tmux

``` bash
./scripts/tmux-development.sh
```