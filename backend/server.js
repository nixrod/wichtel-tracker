'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./src/router');
const db = require('./src/mysql');
const path = require('path');

const PORT = 8080;
const HOST = '0.0.0.0';


// Initialize Mysql connection
db.connect();


// Initialize App
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', router);

app.use(express.static(path.join(__dirname, 'static/webapp')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'static/webapp/index.html'));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
