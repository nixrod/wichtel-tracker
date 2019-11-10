const mysql = require('mysql');


exports.connect = function () {
    const connection = mysql.createConnection({
        host: process.env.HOST,
        user: 'root',
        password: process.env.DB_PW,
        database: 'wichtel'
    });
    connection.connect();
    exports.connection = connection;
};

