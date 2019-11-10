const express = require('express');
const router = express.Router();

const UserController = require('./controller/user.controller');
const userController = new UserController();

const WishlistController = require('./controller/wishlist.controller');
const wishlistController = new WishlistController();


router.get('/users', async (req, res) => {
    await userController.getUser(req, res);
});

router.post('/wishlists', async (req, res) => {
    await wishlistController.postWishlist(req, res);
});


module.exports = router;
