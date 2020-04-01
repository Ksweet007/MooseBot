const { RollMultipleGroupsOfDice, Roll, GetNumberOfDiceAndSizeOfDice } = require('./roller');

//GetNumberOfDiceAndSizeOfDice function tests
test('GetNumberOfDiceAndSizeOfDice Returns 1 die of size 6 Given 1d6', () => {
    const [numberOfDiceToRoll, sizeOfDiceToRoll] = GetNumberOfDiceAndSizeOfDice("1d6");
    expect(numberOfDiceToRoll).toBe(1);
    expect(sizeOfDiceToRoll).toBe(6);
});

test('GetNumberOfDiceAndSizeOfDice Returns 1 die of size 6 Given d6', () => {
    const [numberOfDiceToRoll, sizeOfDiceToRoll] = GetNumberOfDiceAndSizeOfDice("d6");
    expect(numberOfDiceToRoll).toBe(1);
    expect(sizeOfDiceToRoll).toBe(6);
});

test('GetNumberOfDiceAndSizeOfDice Returns 1 die of size 0 Given d', () => {
    const [numberOfDiceToRoll, sizeOfDiceToRoll] = GetNumberOfDiceAndSizeOfDice("d");
    expect(numberOfDiceToRoll).toBe(1);
    expect(sizeOfDiceToRoll).toBe(0);
});

test('GetNumberOfDiceAndSizeOfDice Returns 2 die of size 6 Given 2d6', () => {
    const [numberOfDiceToRoll, sizeOfDiceToRoll] = GetNumberOfDiceAndSizeOfDice("2d6");
    expect(numberOfDiceToRoll).toBe(2);
    expect(sizeOfDiceToRoll).toBe(6);
});

test('GetNumberOfDiceAndSizeOfDice Returns 2 die of size 0 Given 2d', () => {
    const [numberOfDiceToRoll, sizeOfDiceToRoll] = GetNumberOfDiceAndSizeOfDice("2d");
    expect(numberOfDiceToRoll).toBe(2);
    expect(sizeOfDiceToRoll).toBe(0);
});

//Roll function tests
test('Roll Returns value greater than 0 And less than or equal to 6 Given 1d6', () => {
    const valueRolled = Roll(1, 6);
    expect(valueRolled).toBeWithinRange(1, 6);
});



expect.extend({
    toBeWithinRange(received, floor, ceiling) {
        const pass = received >= floor && received <= ceiling;
        if (pass) {
            return {
                message: () =>
                    `expected ${received} not to be within range ${floor} - ${ceiling}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${received} to be within range ${floor} - ${ceiling}`,
                pass: false,
            };
        }
    },
});