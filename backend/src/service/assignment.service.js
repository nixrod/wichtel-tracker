const db = require('../mysql');

class AssignmentService {

    verifyAssignmentReadiness(usersAndWishes) {
        return usersAndWishes.every(user => {
            return user.wishes != null && user.email != null && user.address != null;
        })
    }

    performAssignment(usersAndWishes) {
        let assignments = usersAndWishes.reduce((map, obj) => {
            map[obj.id] = obj.id;
            return map;
        }, {})

        // reshuffle until each giver has a different receiver
        while (!this.checkThatAllElementsAreShuffled(assignments)) {
            let assignees = Object.values(assignments);
            assignees = this.shuffleArray(assignees);

            let assigneeIterator = 0;
            Object.keys(assignments)
                .forEach(key => {
                    assignments[key] = assignees[assigneeIterator];
                    assigneeIterator++;
                });
        }

        return assignments;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    checkThatAllElementsAreShuffled(assignments) {
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
}

module.exports = AssignmentService;
