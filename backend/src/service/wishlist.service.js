const db = require('../mysql');

class WishlistService {

    async upsertWishlist(userId, wishes) {
        if (await this._doesWishlistWithUserIdExist(userId)) {
            await this._updateWishlist(userId, wishes);
        } else {
            await this._createWishlist(userId, wishes);
        }
    }

    async _doesWishlistWithUserIdExist(userId) {
        return new Promise(resolve => {
            db.connection.query('SELECT * FROM wishlists WHERE user_id = ?', [userId], function (err, rows) {
                if (err) throw err;
                resolve(rows.length === 1);
            });
        });
    }

    async _createWishlist(userId, wishes) {
        return new Promise(resolve => {
            db.connection.query('INSERT into wishlists(user_id, wishes) VALUES (?, ?)',
                [userId, wishes], function (err) {
                    if (err) throw err;
                    resolve();
                });
        });
    }

    async _updateWishlist(userId, wishes) {
        return new Promise(resolve => {
            db.connection.query('UPDATE wishlists SET wishes=? WHERE user_id=?', [wishes, userId], function (err) {
                if (err) throw err;
                resolve();
            });
        });
    }


}

module.exports = WishlistService;
