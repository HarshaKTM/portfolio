#!/bin/bash

# Build the Docker image
docker build -t portfolio .

# Stop any existing container
docker stop portfolio || true
docker rm portfolio || true

# Run the new container
docker run -d --name portfolio -p 3000:3000 portfolio 