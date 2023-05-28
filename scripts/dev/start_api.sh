#!/bin/sh
set -e
echo 'setttign up the database'
python manage.py makemigrations
python manage.py migrate
echo 'database setup completed.'

echo 'Superuser setup'
python manage.py user
echo 'Superuser setup completed.'

echo 'starting the dev server'
python manage.py runserver 0.0.0.0:8080