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

### 3. Run the Docker container
```
## runs the container in detached mode and exposes port 80
docker run -p 80:8080 -d wichtel-tracker

## Debug using those commands

# Print app output
docker logs <container id>

# Enter the container
docker exec -it <container id> /bin/bash
```

### 3. Connect to DB

