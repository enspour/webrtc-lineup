FROM node:18.16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies  
COPY ./package*.json ./
COPY ./signal-service/package*.json ./signal-service/
COPY ./core/package*.json ./core/

RUN npm install

# Copy app source
COPY ./signal-service/ ./signal-service/
COPY ./core/ ./core/

EXPOSE 3000

CMD cd signal-service && npm run dev