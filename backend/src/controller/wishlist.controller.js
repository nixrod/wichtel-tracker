const WishlistService = require('../service/wishlist.service');
const UserService = require('../service/user.service');

class WishlistController {


    constructor() {
        this.wishlistService = new WishlistService();
        this.userService = new UserService();
    }


    async postWishlist(req, res) {
        let body = req.body;
        let userId = req.params.userId;

        if (!userId || !body.wishes || !body.email || !body.address) {
            res.status(400);
            res.send('Missing wishlist parameter');
            return;
        }

        // email has 100 reserved characters
        if (body.email.length > 100) {
            res.status(400);
            res.send('Email is too long');
            return;
        }

        // Mysql TEXT fits about 21k utf-8 glyphs
        if (body.wishes.length > 21000) {
            res.status(400);
            res.send('Wishlist is too long');
            return;
        }

        if (body.address.length > 21000) {
            res.status(400);
            res.send('Address is too long');
            return;
        }

        if (!await this.userService.doesUserIdExist(userId)) {
            res.status(400);
            res.send('User does not exist');
            return;
        }

        await Promise.all([
            this.userService.updateUserEmail(userId, body.email),
            this.userService.updateUserAddress(userId, body.address),
            this.wishlistService.upsertWishlist(userId, body.wishes)
        ]);

        res.status(201);
        res.end();
    }


}

module.exports = WishlistController;
