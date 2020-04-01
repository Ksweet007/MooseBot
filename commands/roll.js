module.exports = {
    name: 'roll',
    description: 'Dice Roller',
    execute(msg, args) {
        const totalRoll = RollMultipleGroupsOfDice(msg, args);
        msg.reply(`You rolled a ${totalRoll}`);
    },
};

function RollMultipleGroupsOfDice(msg, diceGroups) {
    let totalRoll = 0;
    diceGroups.forEach(diceRoll => {
        const [numberOfDiceToRoll, sizeOfDiceToRoll] = GetNumberOfDiceAndSizeOfDice(diceRoll);
        const thisRoll = Roll(numberOfDiceToRoll, sizeOfDiceToRoll);
        totalRoll += thisRoll;
        msg.channel.send(`${diceRoll} Rolled a ${thisRoll}`);
    })
    return totalRoll;
}

function Roll(numberOfDiceToRoll, sizeOfDiceToRoll) {
    let totalValue = 0;
    for (let i = 0; i < numberOfDiceToRoll; i++) {
        totalValue += (1 + Math.floor(Math.random() * sizeOfDiceToRoll))
    }

    return totalValue;
}

function GetNumberOfDiceAndSizeOfDice(diceRoll) {
    if (diceRoll.indexOf("d") === 0) {
        //Rolling a single dice
        return [1, diceRoll.substring(1)];
    }

    //Rolling multiple dice
    const numberOfDiceToRoll = diceRoll.substring(0, diceRoll.indexOf("d"));
    const dieSizeToRoll = diceRoll.substring(2);

    return [numberOfDiceToRoll, dieSizeToRoll];
}