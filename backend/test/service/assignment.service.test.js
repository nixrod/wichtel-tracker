const AssignmentService = require('../../src/service/assignment.service')
let service;
let users;

beforeEach(() => {
    service = new AssignmentService();

    users = [
        {
            id: 1,
            name: 'TesterA',
        },
        {
            id: 2,
            name: 'TesterB',
        },
        {
            id: 3,
            name: "TesterC",
        },
    ]
});

test('shuffle verifier returns true for correct shuffle', () => {
    let assignment = {
        "1": 2,
        "2": 3,
        "3": 1
    }
    expect(service._checkThatAllElementsAreShuffled(assignment)).toBeTruthy();
});

test('shuffle verifier returns false for incorrect shuffle', () => {
    let assignment = {
        "1": 1,
        "2": 3,
        "3": 2
    }
    expect(service._checkThatAllElementsAreShuffled(assignment)).toBeFalsy();
});

test('unshuffled assignment is eventually returned shuffled', () => {
    let assignment = service.performAssignment(users);
    expect(service._checkThatAllElementsAreShuffled(assignment)).toBeTruthy();
});
