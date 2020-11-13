const UserService = require('../service/user.service');
const AssignmentService = require('../service/assignment.service');

class AssignmentController {


    constructor() {
        this.userService = new UserService();
        this.assignmentService = new AssignmentService();
    }


    async postAssignment(req, res) {
        if (!await this.assignmentService.hasAssignmentHasAlreadyBeenPerformed()) {
            res.status(400);
            res.send('Assignment has already been performed for this year.');
            return;
        }

        let usersAndWishes = await this.userService.getUsersWithWishlist();

        if (!this.assignmentService.verifyAssignmentReadiness(usersAndWishes)) {
            res.status(400);
            res.send('Assignment can not be performed because information is missing');
            return;
        }

        let assignments = this.assignmentService.performAssignment(usersAndWishes);
        await this.assignmentService.storeAssignments(assignments);

        res.json(assignments);
    }


}

module.exports = AssignmentController;
