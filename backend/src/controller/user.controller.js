const UserService = require('../service/user.service');

class UserController {


    constructor() {
        this.userService = new UserService();
    }


    async getUser(req, res) {
        let users = await this.userService.getUsers();
        res.json(users);
    }


}

module.exports = UserController;
