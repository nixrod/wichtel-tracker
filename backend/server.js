'use strict';

const express = require('express');
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
connection.connect();


app.get('/api', (req, res) => {
    connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
        if (err) throw err;

        console.log('The solution is: ', rows[0].solution);
        res.send('Hello world\n' + rows[0].solution);
    });

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
