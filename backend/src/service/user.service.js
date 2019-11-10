const db = require('../mysql');

class UserService {

    async getUsers() {
        return new Promise(resolve => {
            db.connection.query('SELECT * FROM users ORDER BY name', function (err, rows) {
                if (err) throw err;
                resolve(rows);
            });
        });
    }

    async doesUserIdExist(userId) {
        return new Promise(resolve => {
            db.connection.query('SELECT * FROM users WHERE id = ?', [userId], function (err, rows) {
                if (err) throw err;
                resolve(rows.length === 1);
            });
        });
    }

    async updateUserEmail(userId, email) {
        return new Promise(resolve => {
            db.connection.query('UPDATE users SET email = ? WHERE id= ?', [email, userId], function (err) {
                if (err) throw err;
                resolve();
            });
        });
    }

}

module.exports = UserService;
