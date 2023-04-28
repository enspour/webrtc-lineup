FROM node:18.16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies  
COPY ./package*.json ./
COPY ./auth-service/package*.json ./auth-service/
COPY ./core/package*.json ./core/

RUN npm install

# Copy app source
COPY ./auth-service/ ./auth-service/
COPY ./core/ ./core/

RUN npx prisma generate

EXPOSE 3000

CMD cd auth-service && npm run dev