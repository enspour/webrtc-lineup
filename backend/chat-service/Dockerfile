FROM node:18.16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies  
COPY ./package*.json ./
COPY ./chat-service/package*.json ./chat-service/
COPY ./core/package*.json ./core/

RUN npm install

# Copy app source
COPY ./chat-service/ ./chat-service/
COPY ./core/ ./core/

EXPOSE 3000

CMD cd chat-service && npm run dev