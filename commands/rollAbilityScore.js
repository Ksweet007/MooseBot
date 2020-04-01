module.exports = {
    name: 'rollabilityscore',
    description: 'Dice Roller For Ability Scores',
    execute(msg, args) {
        const totalRoll = RollMultipleGroupsOfDice(msg, args);
        msg.reply(`You rolled a ${totalRoll}`);
    },
};

function parseArgument(arg) {
    let regEx = new RegExp('([1-9][0-9]*)d([1-9][0-9]*)')
    const isValid = regEx.test(arg);
    if (!isValid) {
        throw new Error("Bad Input");
    }

    const regExGroups = regEx.exec(arg);
    return [parseInt(regExGroups[1]), parseInt(regExGroups[2])]
}

function RollMultipleGroupsOfDice(msg, diceGroups) {
    let arrayOfRolls = [];

    diceGroups.forEach(diceRoll => {
        const [numberOfDiceToRoll, sizeOfDiceToRoll] = parseArgument(diceRoll);
        const thisRoll = Roll(numberOfDiceToRoll, sizeOfDiceToRoll, msg);

        arrayOfRolls.push(thisRoll);
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

    const rollArrayCopy = [...rollArray];
    const droppedScore = rollArray.shift();

    msg.channel.send(`Rolled ${rollArrayCopy} - Dropped ${droppedScore}`);

    return rollArray.reduce(addTogetherRolls, 0);
}

function addTogetherRolls(total, num) {
    return total + num;
}