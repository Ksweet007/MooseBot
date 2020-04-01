function RollMultipleGroupsOfDice(msg, diceGroups) {
    let totalRoll = 0;
    diceGroups.forEach(diceRoll => {
        const [numberOfDiceToRoll, sizeOfDiceToRoll] = GetNumberOfDiceAndSizeOfDice(diceRoll);
        const thisRoll = Roll(numberOfDiceToRoll, sizeOfDiceToRoll, msg);
        totalRoll += thisRoll;
        msg.channel.send(`${diceRoll} Rolled a ${thisRoll}`);
    })
    return totalRoll;
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

module.exports = { RollMultipleGroupsOfDice, Roll, GetNumberOfDiceAndSizeOfDice }