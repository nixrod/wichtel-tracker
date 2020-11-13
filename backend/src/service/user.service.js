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

    async getUsersWithWishlist() {
        return new Promise(resolve => {
            db.connection.query(
                'SELECT u.*, w.wishes\n' +
                'FROM users u\n' +
                'LEFT JOIN wishlists w on u.id = w.user_id', function (err, rows) {
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

    async updateUserAddress(userId, address) {
        return new Promise(resolve => {
            db.connection.query('UPDATE users SET address = ? WHERE id= ?', [address, userId], function (err) {
                if (err) throw err;
                resolve();
            });
        });
    }

}

module.exports = UserService;
