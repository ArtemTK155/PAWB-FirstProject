Service using docker to create a simple full stack CRUD.
Front-end using VueJs and Vuetify framework.
Back-end using NodeJs and Express framework for the api.
Database used was Mongoose and a adminMongo docker image to view database data from a web dashboard.


How to run:

1)  Clone repository
2)  Run "docker-compose up"


Front-end:  
Served on port 8080
Page 1 - http://localhost:8080/crud
Page 2 - http://localhost:8080/search

Back-end:
Served on port 4000

Optional(To generate some data):
http://localhost:4000/empresas/data

Database:
To view database using adminMongo go to http://localhost:1234/app/connection_list

In the "Connection string" field add --> mongodb://db:27017/core
In the "Connection name" give a name ex: myDB
Press "Add Connection" button, wait a sec for it to add and press "Connect" (Grey button)
