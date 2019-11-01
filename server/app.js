const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
//Execute express
const app = express();
app.use(bodyParser.json());
app.use(cors());

//Import routes
const empresasRoutes = require('./routes/empresas');
app.use('/empresas', empresasRoutes);

//mongoose.Promise = global.Promise

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => console.log('Connect to DB'));

//Listen to the server
app.listen(4000);
