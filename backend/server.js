'use strict';

const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: 'root',
    password: process.env.DB_PW,
    database: 'wichtel'
});

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.static('static/webapp'));
// TODO: only use in dev
app.use(cors());
connection.connect();


app.get('/api/users', (req, res) => {
    connection.query('SELECT * FROM users ORDER BY name', function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
