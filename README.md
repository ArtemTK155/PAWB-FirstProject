# VueJs, NodeJs, Express, Mongoose, AdminMongo in Docker

Service using docker to create a simple full stack CRUD.
Front-end using VueJs and Vuetify framework.
Back-end using NodeJs and Express framework for the api.
Database used was Mongoose and a adminMongo docker image to view database data from a web dashboard.


## How to run

Clone this repo

```
git clone https://github.com/ArtemTK155/PAWB-FirstProject.git
```

Go to the project folder and run the docker command

```
docker-compose up
```

## Services

Front-end is served on port 8080

```
http://localhost:8080/crud
```

```
http://localhost:8080/search
```


Back-end is served on port 4000

To generate some data in the database use a get request to

```
http://localhost:4000/empresas/data
```

To access adminMongo to see data in database go to 

```
http://localhost:1234/app/connection_list
```

In the "Connection string" field add --> mongodb://db:27017/core
In the "Connection name" give a name ex: myDB
Press "Add Connection" button, wait a sec for it to add and press "Connect" (Grey button)
