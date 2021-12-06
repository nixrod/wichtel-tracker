const express = require('express');
const router = express.Router();

const UserController = require('./controller/user.controller');
const userController = new UserController();

const AuthController = require('./controller/auth.controller');
const authController = new AuthController();

const AdminController = require('./controller/admin.controller');
const adminController = new AdminController();

const StateController = require('./controller/state.controller');
const stateController = new StateController();


// Authentication definitions
router.use('/state/finalize', (req, res, next) => {
    authController.authenticateAdmin(req, res, next);
});

router.use('/admin*', (req, res, next) => {
    authController.authenticateAdmin(req, res, next);
});

// Endpoint Definitions
router.get('/users/:accessId', async (req, res) => {
    await userController.getUser(req, res);
});

router.get('/users/:accessId/assignment', async (req, res) => {
    await userController.getAssignment(req, res);
});

router.put('/users/:accessId', async (req, res) => {
    await userController.putUser(req, res);
});

router.post('/admin/init', async (req, res) => {
    await adminController.init(req, res);
});

router.get('/state', async (req, res) => {
    await stateController.getState(req, res);
});

router.post('/state/finalize', async (req, res) => {
    await stateController.setState(req, res);
});

module.exports = router;
