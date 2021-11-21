const db = require('../mysql');

class AssignmentService {

    performAssignment(users) {
        let assignments = users.reduce((map, obj) => {
            map[obj.id] = obj.id;
            return map;
        }, {});

        // reshuffle until each giver has a different receiver
        while (!this._checkThatAllElementsAreShuffled(assignments)) {
            let assignees = Object.values(assignments);
            assignees = this._shuffleArray(assignees);

            let assigneeIterator = 0;
            Object.keys(assignments)
                .forEach(key => {
                    assignments[key] = assignees[assigneeIterator];
                    assigneeIterator++;
                });
        }

        return assignments;
    }

    _shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    _checkThatAllElementsAreShuffled(assignments) {
        let shuffleValid = true;
        Object.keys(assignments)
            .forEach(key => {
                if (parseInt(key) === assignments[key]) {
                    shuffleValid = false;
                }
            });
        return shuffleValid;
    }

    async hasAssignmentHasAlreadyBeenPerformed() {
        return new Promise(resolve => {
            db.connection.query('SELECT COUNT(*) as count FROM assignments', function (err, rows) {
                if (err) throw err;
                resolve(rows[0].count === 0);
            });
        });
    }

    async storeAssignments(assignments) {
        let values = [];
        Object.keys(assignments)
            .forEach(key => {
                values.push([key, assignments[key].toString()])
            });

        return new Promise(resolve => {
            db.connection.query('INSERT into assignments(giver_id, receiver_id) VALUES ?',
                [values], function (err) {
                    if (err) throw err;
                    resolve();
                });
        });
    }

    async getAssignmentForUser(userId) {
        return new Promise(resolve => {
            db.connection.query('SELECT user.name as user_name, assignment.name as assignment_name, assignment.address as assignment_address, assignment.wishes as assignment_wishes\n' +
                'FROM assignments a\n' +
                'LEFT JOIN users as user on a.giver_id  = user.id\n' +
                'LEFT JOIN users as assignment on a.receiver_id = assignment.id\n' +
                'WHERE user.id  = ?', [userId], function (err, rows) {
                if (err) throw err;
                resolve(rows[0]);
            });
        });
    }
}

module.exports = AssignmentService;
