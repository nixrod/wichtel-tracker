'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./src/router');
const db = require('./src/mysql');

const PORT = 8080;
const HOST = '0.0.0.0';


// Initialize Mysql connection
db.connect();


// Initialize App
const app = express();

app.use(express.static('static/webapp'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', router);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
