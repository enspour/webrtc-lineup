[Go to readme](../README.md)

## Development mode

1. Install all dependencies (**current folder is core folder of project**)

``` bash
cd backend/ && npm install
```

``` bash
cd ../client/ && npm install
```

2. Need to create ssh-keys for Auth Service (**current folder is core folder of project**)

- **creating folders for keys**
 
``` bash
cd backend/auth-service/ && mkdir keys && cd keys
```

``` bash
mkdir accessToken && mkdir refreshToken
```

- generate ssh keys for access token

``` bash
cd accessToken && ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
```

``` bash
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```

- generate ssh keys for refresh token

``` bash
cd ../refreshToken && ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
```

``` bash
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
```

3. Setting environment variables (**current folder is core folder of project**).

- Postgres settings

``` bash
cd backend/core && echo "DATABASE_URL=postgresql://admin:mysecretpassword@localhost:5432/lineup" > .env
```


4. Initialize prisma (**current folder is core folder of project**)

- Run postgres

``` bash
cd backend/core/postgresql/docker && docker compose -f docker-compose.dev.yml up
```

- Initialize (**current folder is core folder of project**)

``` bash
cd backend/core && npx prisma generate && npx prisma db push
```

5. Run 

- With tmux

``` bash
sh dev.sh
```