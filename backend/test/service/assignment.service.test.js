const AssignmentService = require('../../src/service/assignment.service')
let service;
let usersAndWishes;

beforeEach(() => {
    service = new AssignmentService();

    usersAndWishes = [
        {
            id: 1,
            name: "TesterA",
            email: "test@test.com",
            address: "Heidenheimer Str. 82 \n 94383 Narenrotten",
            wishes: "Cello"
        },
        {
            id: 2,
            name: "TesterB",
            email: "test1@test.com",
            address: "Heidenheimer Str. 11 \n 94383 Narenrotten",
            wishes: "Flight Simulator"
        },
        {
            id: 3,
            name: "TesterC",
            email: "test2@test.com",
            address: "Rotweg 3 2938 Neuff",
            wishes: "Schlagzeug\nFette Beats zum drummen"
        },
    ]
});

test('shuffle verifier returns true for correct shuffle', () => {
    let assignment = {
        "1": 2,
        "2": 3,
        "3": 1
    }
    expect(service.checkThatAllElementsAreShuffled(assignment)).toBeTruthy();
});

test('shuffle verifier returns false for incorrect shuffle', () => {
    let assignment = {
        "1": 1,
        "2": 3,
        "3": 2
    }
    expect(service.checkThatAllElementsAreShuffled(assignment)).toBeFalsy();
});

test('unshuffled assignment is eventually returned shuffled', () => {
    let assignment = service.performAssignment(usersAndWishes);
    expect(service.checkThatAllElementsAreShuffled(assignment)).toBeTruthy();
});

test('verification passes on correct input', () => {
    expect(service.verifyAssignmentReadiness(usersAndWishes)).toBeTruthy();
});

test('verification fails on missing wishes', () => {
    usersAndWishes[0].wishes = null;
    expect(service.verifyAssignmentReadiness(usersAndWishes)).toBeFalsy();
});

test('verification fails on missing email', () => {
    usersAndWishes[1].email = null;
    expect(service.verifyAssignmentReadiness(usersAndWishes)).toBeFalsy();
});

test('verification fails on missing address', () => {
    usersAndWishes[2].address = null;
    expect(service.verifyAssignmentReadiness(usersAndWishes)).toBeFalsy();
});
