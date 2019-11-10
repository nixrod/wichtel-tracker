const WishlistService = require('../service/wishlist.service');
const UserService = require('../service/user.service');

class WishlistController {


    constructor() {
        this.wishlistService = new WishlistService();
        this.userService = new UserService();
    }


    async postWishlist(req, res) {
        let body = req.body;

        if (!body.userId || !body.partnerId || !body.wishes || !body.email) {
            res.status(400);
            res.send('Missing wishlist parameter');
            return;
        }

        if (body.userId === body.partnerId) {
            res.status(400);
            res.send('User can\'t be it\'s own partner');
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

        if (!await this.userService.doesUserIdExist(body.userId)) {
            res.status(400);
            res.send('User does not exist');
            return;
        }

        if (!await this.userService.doesUserIdExist(body.partnerId)) {
            res.status(400);
            res.send('Partner does not exist');
            return;
        }

        await Promise.all([
            this.userService.updateUserEmail(body.userId, body.email),
            this.wishlistService.upsertWishlist(body.userId, body.wishes, body.partnerId)
        ]);

        res.status(201);
        res.end();
    }


}

module.exports = WishlistController;
