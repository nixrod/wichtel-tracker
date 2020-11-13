const express = require('express');
const router = express.Router();

const UserController = require('./controller/user.controller');
const userController = new UserController();

const WishlistController = require('./controller/wishlist.controller');
const wishlistController = new WishlistController();

const AssignmentController = require('./controller/assignment.controller')
const assignmentController = new AssignmentController();


router.get('/users', async (req, res) => {
    await userController.getUser(req, res);
});

router.post('/users/:userId/wishlist', async (req, res) => {
    await wishlistController.postWishlist(req, res);
});

router.post('/admin/assignments', async (req, res) => {
    await assignmentController.postAssignment(req, res);
});


module.exports = router;
