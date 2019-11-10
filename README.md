# wichtel-tracker
Manages the wichtel christmas process

## How to Build

### 1. Build Webapp
```
# builds and copies the dist files to the express static folder
cd webapp
npm run buildeploy
```

### 2. Create Docker image
```
# creates a docker image containing the bundled backend and frontend
cd ../backend
docker build -t wichtel-tracker .
```

### 3. Create the Docker network
```
docker network create -d bridge my_network
```

### 4. Run the Docker container
```
# runs the container in detached mode and exposes port 80
docker run -p 80:8080 -e DB_PW=my-secret-pw --network my_network -d wichtel-tracker

# Debug using those commands

# Print app output
docker logs <container id>

# Enter the container
docker exec -it <container id> /bin/bash
```

### 5. Run the Mysql Docker container
```
# create data store folder
mkdir /etc/mysql
 
# start docker container use full path for volume
docker run --name mysql-db -p 3306:3306 -v /etc/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_DATABASE=wichtel --network my_network -d mysql:latest

# connect to the db and run db-init.sql using a GUI programm

# Debug using those commands
docker logs mysql-db
docker exec -it mysql-db bash

```
