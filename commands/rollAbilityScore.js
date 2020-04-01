module.exports = {
    name: 'rollabilityscore',
    description: 'Dice Roller For Ability Scores',
    execute(msg, args) {
        const totalRoll = RollMultipleGroupsOfDice(msg, args);
        msg.reply(`You rolled a ${totalRoll}`);
    },
};

function RollMultipleGroupsOfDice(msg, diceGroups) {
    let arrayOfRolls = [];

    diceGroups.forEach(diceRoll => {
        const [numberOfDiceToRoll, sizeOfDiceToRoll] = GetNumberOfDiceAndSizeOfDice(diceRoll);
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

function GetNumberOfDiceAndSizeOfDice(diceRoll) {
    let numberOfDiceToRoll = 0;
    let dieSizeToRoll = 0;

    if (diceRoll.indexOf("d") === 0) {
        //Rolling a single dice
        numberOfDiceToRoll = 1;
        dieSizeToRoll = diceRoll.substring(1) === "" ? 0 : diceRoll.substring(1)
    }
    else {
        //Rolling multiple dice
        numberOfDiceToRoll = diceRoll.substring(0, diceRoll.indexOf("d"));
        dieSizeToRoll = diceRoll.substring(diceRoll.indexOf("d") + 1) === "" ? 0 : diceRoll.substring(diceRoll.indexOf("d") + 1);
    }

    return [parseInt(numberOfDiceToRoll), parseInt(dieSizeToRoll)];
}

function addTogetherRolls(total, num) {
    return total + num;
}