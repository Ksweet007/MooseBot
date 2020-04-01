function parseArgument(arg) {
    let regEx = new RegExp('([1-9][0-9]*)d([1-9][0-9]*)\\+?([0-9]*)')
    const isValid = regEx.test(arg);
    if (!isValid) {
        throw new Error("Bad Input");
    }

    const regExGroups = regEx.exec(arg);
    return [parseInt(regExGroups[1]), parseInt(regExGroups[2]), parseInt(regExGroups[3])]
}

function RollMultipleGroupsOfDice(msg, diceGroups) {
    let arrayOfRolls = [];
    diceGroups.forEach(diceRoll => {
        const [numberOfDiceToRoll, sizeOfDiceToRoll, bonus] = parseArgument(diceRoll);
        const thisRoll = Roll(numberOfDiceToRoll, sizeOfDiceToRoll, msg);
        const valueWithBonus = thisRoll + bonus;
        arrayOfRolls.push(valueWithBonus);
    })
    return arrayOfRolls.reduce(addTogetherRolls, 0);
}

function Roll(numberOfDiceToRoll, sizeOfDiceToRoll, msg) {
    let totalValue = 0;
    let rollArray = [];
    for (let i = 0; i < numberOfDiceToRoll; i++) {
        const rolledValue = (1 + Math.floor(Math.random() * sizeOfDiceToRoll));
        rollArray.push(rolledValue);
        totalValue += rolledValue;
    }
    rollArray.sort(function (a, b) { return a - b });
    msg.channel.send(`${rollArray}`);

    return totalValue;
}

function addTogetherRolls(total, num) {
    return total + num;
}

module.exports = { RollMultipleGroupsOfDice, Roll }