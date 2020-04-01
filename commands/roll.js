module.exports = {
    name: 'roll',
    description: 'Dice Roller',
    execute(msg, args) {
        const totalRoll = RollMultipleGroupsOfDice(msg, args);
        msg.reply(`You rolled a ${totalRoll}`);
    },
};

function parseArgument(arg) {
    let regEx = new RegExp('([1-9][0-9]*)d([1-9][0-9]*)\\+?([0-9]*)')
    const isValid = regEx.test(arg);
    if (!isValid) {
        throw new Error("Bad Input");
    }

    const regExGroups = regEx.exec(arg);
    const numberOfDiceToRoll = regExGroups[1];
    const sizeOfDiceToRoll = regExGroups[2];
    const bonus = regExGroups[3] === "" ? 0 : regExGroups[3];

    return [numberOfDiceToRoll, sizeOfDiceToRoll, bonus]
}

function RollMultipleGroupsOfDice(msg, diceGroups) {
    let arrayOfRolls = [];
    diceGroups.forEach(diceRoll => {
        const [numberOfDiceToRoll, sizeOfDiceToRoll, bonus] = parseArgument(diceRoll);
        const thisRoll = Roll(numberOfDiceToRoll, sizeOfDiceToRoll, msg);
        const valueWithBonus = parseInt(thisRoll) + parseInt(bonus);
        arrayOfRolls.push(valueWithBonus);

    })
    return arrayOfRolls.reduce(addTogetherRolls, 0);
}

function Roll(numberOfDiceToRoll, sizeOfDiceToRoll, msg) {
    let rollArray = [];
    for (let i = 0; i < numberOfDiceToRoll; i++) {
        const rolledValue = (1 + Math.floor(Math.random() * sizeOfDiceToRoll));
        rollArray.push(rolledValue);
    }
    rollArray.sort(function (a, b) { return a - b });
    msg.channel.send(`${rollArray}`);

    return rollArray.reduce(addTogetherRolls, 0);
}

function addTogetherRolls(total, num) {
    return total + num;
}