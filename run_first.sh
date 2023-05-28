#!/bin/sh
set -e

echo "setting up the django api project"

if [ -d "app/core" ];then
    echo "Django API project already initiated."
else
    echo "Setting up the Django API project with name core ."
    docker-compose run --rm backend sh -c 'django-admin startproject core .'
    echo "Django API project setup completed."
fi

echo "setting up the react ui project"

if [ -d "app/frontend" ];then
    echo "React App already exists."
else
    echo "Creating react app, kindly follow the screen."
    docker-compose run --rm frontend sh -c 'npx create-react-app frontend'
    echo "React APP setup completed".
fi
    
