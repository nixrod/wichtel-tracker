# wichtel-tracker
Manages the Weihnachtswichtel christmas process of the Happel Family.

It consists of multiple components:
- A frontend written in Angular. 
- A backend using Node.js.
- A MYSQL Database.
- Various management scripts.


## 🚶 Setting up local dev environment

### 1. Set up all the secrets
Configure the .env file with your API Key and secrets.

### 2. Start docker compose

This starts the backend and mysql database in detached mode.
```
docker-compose up -d
```

### 3. Initialize the database

First adapt the db password according to the .env file
To do this run the statements in the scripts/db-init.sql file
```
mysql -h 127.0.0.1 -uroot -p wichtel <scripts/db-init.sql
(enter pw from .env file)
```

### 4. Pick which component to work on

#### Webapp
```
cd webapp
npm install
npm run start
```

#### Backend
```
cd backend
docker stop wichtel-tracker_web_1
DB_PW=<see .env> HOST=localhost npm run start
```

## 🏃 Deploy on prod environment

1. Clone git repository
2. Follow Steps 1-3 above to run docker-compose in production

## 🔨 Continuous Integration
A github action exists, which automatically builds and pushes the docker 
container for every push to develop.
Commits tagged with v.X.X.X are published as releases.

### Manual Build and Push
#### Build
```
docker build -t ghcr.io/nixrod/wichtel-tracker .
```

#### Push to container registry
```
docker push ghcr.io/nixrod/wichtel-tracker
```
