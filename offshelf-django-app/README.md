# OFFSHELF BACKEND

## STEPS TO RUN THE BACKEND

> Create a docker network

```sh
docker network create mynetwork
```

> Run the MySQL container

```sh
docker run -d --name mysql-container --network=mynetwork -e MYSQL_ROOT_PASSWORD=mysql12345 -e MYSQL_DATABASE=offshelf mysql:8.1.0
```

> Note down the container host

```sh
docker inspect -f '{{.HostConfig.NodeName}}' mysql-container
```

> Create the Django pod image

```sh
cd <project_root>/offshelf-django-app
docker build -t offshelf:1.0 -f offshelf.dockerfile .
```

> Run the container

```sh
docker run -d --name django-container --network=mynetwork -e SQL_SERVER_HOST=<HOST IP FROM MYSQL CONTAINER> -p 8000:8000 offshelf:4.3
```
