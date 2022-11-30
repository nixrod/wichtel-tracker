# wichtel-tracker
Manages the Weihnachtswichtel christmas process of the Happel Family.

It consists of multiple components:
- A frontend written in Angular. 
- A backend using Node.js.
- A MYSQL Database.


## 🚶 Setting up local dev environment

### 1. Set up all the secrets
Configure the .env file with your secrets.

### 2. Start docker compose

This starts the backend and mysql database in detached mode.
```sh
docker-compose up -d
```

### 3. Initialize the database

**First adapt the db password in the sql-init.sql file according to the .env file**

Option 1:
```sh
# Either connect to the docker container with preinstalled mysql
docker exec -it <container_id> /bin/bash

# Then connect to the db
mysql -h 127.0.0.1 -uroot -p wichtel

# Then copy/paste and execute the sql commands from sql-init.sql
```

Option 2:
```sh
# Directly execute the script. Requires mysql installed on os level
mysql -h 127.0.0.1 -uroot -p wichtel <sql-init.sql
```

### 4. Pick which component to work on

#### Webapp
```sh
cd webapp
npm install
npm run start
```
Make sure that you set the prod environment variables before deployment on a server.

#### Backend
```sh
cd backend
docker stop wichtel-tracker_web_1
DB_PW=<see .env> HOST=localhost npm run start
```

## 🏃 Deploy on prod environment

1. Adapt the backend hostname in the frontend app prod env variables and build and push the docker images
2. Clone git repository
3. Follow Steps 1-3 above to run docker-compose in production

## 🔨 Continuous Integration
A github action exists, which automatically builds and pushes the docker 
container for every push to develop.
Commits tagged with vX.X.X are published as releases.

### Manual Build and Push
#### Build
```sh
docker build -t ghcr.io/nixrod/wichtel-tracker .
```

#### Push to container registry
```sh
docker push ghcr.io/nixrod/wichtel-tracker
```

## ✨ Initializing the Backend

Use the /api/admin/init endpoint to populate the database with initial user data and performing the wish assignments.
