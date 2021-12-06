const db = require('../mysql');

class StateService {

    async getState() {
        return new Promise(resolve => {
            db.connection.query('SELECT state from state WHERE id = 1', [], function (err, rows) {
                if (err) throw err;
                resolve(rows[0].state);
            });
        });
    }

    async setState(state) {
        return new Promise(resolve => {
            db.connection.query('UPDATE state SET state = ? WHERE id= 1', [state], function (err) {
                if (err) throw err;
                resolve();
            });
        });
    }
}

module.exports = StateService;
