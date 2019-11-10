const db = require('../mysql');

class WishlistService {

    async upsertWishlist(userId, wishes, partnerId) {
        if (await this._doesWishlistWithUserIdExist(userId)) {
            await this._updateWishlist(userId, wishes, partnerId);
        } else {
            await this._createWishlist(userId, wishes, partnerId);
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

    async _createWishlist(userId, wishes, partnerId) {
        return new Promise(resolve => {
            db.connection.query('INSERT into wishlists(user_id, wishes, partner_id) VALUES (?, ?, ?)',
                [userId, wishes, partnerId], function (err) {
                    if (err) throw err;
                    resolve();
                });
        });
    }

    async _updateWishlist(userId, wishes, partnerId) {
        return new Promise(resolve => {
            db.connection.query('UPDATE wishlists SET wishes=?, partner_id=? WHERE user_id=?', [wishes, partnerId, userId], function (err) {
                if (err) throw err;
                resolve();
            });
        });
    }


}

module.exports = WishlistService;
