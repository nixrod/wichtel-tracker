const UserService = require('../service/user.service');
const AssignmentService = require('../service/assignment.service');
const StateService = require('../service/state.service');

class UserController {


    constructor() {
        this.userService = new UserService();
        this.assignmentService = new AssignmentService();
        this.stateService = new StateService();
    }


    async getUser(req, res) {
        const accessId = req.params.accessId;

        let user = await this.userService.getUser(accessId);
        res.json(user);
    }

    async getAssignment(req, res) {
        const accessId = req.params.accessId;

        const state = await this.stateService.getState();
        if (state === 'WISHES_OPEN') {
            res.status(400);
            res.send('Assignment not available yet');
            return;
        }

        const user = await this.userService.getUser(accessId);
        const assignment = await this.assignmentService.getAssignmentForUser(user.id);

        res.json(assignment);
    }

    async putUser(req, res) {
        const body = req.body;
        const accessId = req.params.accessId;

        if (!accessId || !body.wishes || !body.address) {
            res.status(400);
            res.send('Missing wishlist parameter');
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

        let user = await this.userService.getUser(accessId);
        if (!user) {
            res.status(400);
            res.send('User does not exist');
            return;
        }

        await Promise.all([
            this.userService.updateUserAddress(user.id, body.address),
            this.userService.updateUserWishlist(user.id, body.wishes)
        ]);

        res.status(201);
        res.end();
    }


}

module.exports = UserController;
