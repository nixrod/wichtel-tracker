# Stage 1: Install webapp
FROM node:10
WORKDIR /usr/src/webapp
# copy package and package-log for dependency install
COPY webapp/package*.json ./
RUN npm install
# copy app source to workdir
COPY webapp .
RUN npm run build

# Stage 2: Test backend
FROM node:10
WORKDIR /usr/src/app
COPY backend/package*.json ./
RUN npm install
COPY backend .
RUN npm run test

# Stage 3: Bundle
FROM node:10-alpine
WORKDIR /usr/src/app
COPY backend/package*.json ./
RUN npm install --only=prod
COPY backend .
COPY --from=0 /usr/src/webapp/dist static

CMD [ "node", "server.js" ]
