const StateService = require('../service/state.service');

class StateController {


    constructor() {
        this.stateService = new StateService();
    }

    async getState(req, res) {
        const state = await this.stateService.getState();
        res.json({state: state});
    }

    async setState(req, res) {
        const state = req.body.state;
        if (!state || (state !== 'WISHES_OPEN' && state !== 'WISHES_CLOSED')) {
            res.status(400);
            res.send('Possible States can only be WISHES_OPEN and WISHES_CLOSED');
            return;
        }

        await this.stateService.setState(state);

        res.status(200);
        res.end();
    }
}

module.exports = StateController;
