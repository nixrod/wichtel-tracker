const db = require('../mysql');
const {v4: uuidv4} = require('uuid');

class UserService {

    async getUser(accessId) {
        return new Promise(resolve => {
            db.connection.query('SELECT * FROM users WHERE access_id = ?', [accessId], function (err, rows) {
                if (err) throw err;
                resolve(rows[0]);
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

    async updateUserWishlist(userId, wishes) {
        return new Promise(resolve => {
            db.connection.query('UPDATE users SET wishes = ? WHERE id= ?', [wishes, userId], function (err) {
                if (err) throw err;
                resolve();
            });
        });
    }

    async createUser(name) {
        const accessId = uuidv4();

        return new Promise(resolve => {
            db.connection.query('INSERT into users(name, access_id) VALUES (?, ?)',
                [name, accessId], function (err) {
                    if (err) throw err;
                    resolve();
                });
        });
    }
}

module.exports = UserService;
