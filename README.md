# Rest vs GraphQL Demo
The intention behind this project to draw comparison between how can one create APIs using Rest and GraphQL 

## Setup

At the very least you should have nodejs/npm installed. If not you can get it from [here](https://nodejs.org/en/download/)

* All necessary packages are defined in `packages.json`. So run the following command to install the necessary packages
```
npm install
```
* If you have a mysql database running locally, ignore this command but if not and have [docker](https://docs.docker.com/get-docker/) installed run the following command
```
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql;
```
* The schema file can be found under `ddl.sql`, if you have gone the docker way run the following command
```
cd database
docker exec -i some-mysql mysql -uroot -ppassword <<< $(cat ./ddl.sql)
```
* Update `.env` file with necessary database configuration
```
PORT=3000
DB_PORT=3306
DB_HOST="localhost"
DB_USER="root"
DB_PWD="password"
DB_NAME="master_db"
```

## Running The Project

### Running REST APIs
To run the RESTful APIs, run the following command
```
npm run dev-rest
```
This will start the server on port `3000`

### Running GraphQL APIs
To run the GraphQL APIs, run the following command
```
npm run graphql-rest
```
This will start the server on port `4000`

### Endpoints
The sample postman collection can be imported from [here](https://www.getpostman.com/collections/627ec9a469be78f77d4c)