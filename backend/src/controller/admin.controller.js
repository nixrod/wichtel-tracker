const UserService = require('../service/user.service');
const AssignmentService = require('../service/assignment.service');

class AdminController {


    constructor() {
        this.userService = new UserService();
        this.assignmentService = new AssignmentService();
    }

    async init(req, res) {
        if (!await this.assignmentService.hasAssignmentHasAlreadyBeenPerformed()) {
            res.status(400);
            res.send('Initialization has already been performed. Please drop the tables manually if you want to reinitialize.');
            return;
        }

        const body = req.body;

        for (let user of body.users) {
            await this.userService.createUser(user.name);
        }

        let users = await this.userService.getUsers();

        let assignments = this.assignmentService.performAssignment(users);
        await this.assignmentService.storeAssignments(assignments);

        res.status(201);
        res.send(`Initialization complete. Created ${body.users.length} users in the database and assigned them to each other.`);
    }


}

module.exports = AdminController;
