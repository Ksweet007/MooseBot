module.exports = {
    name: 'roll',
    description: 'Dice Roller',
    execute(msg, args) {
        const whatWasRolled = ProcessArguments(msg, args);
        msg.reply(`You rolled a ${whatWasRolled}`);
    },
};

function ProcessArguments(msg, args) {
    let totalRollValue = 0;
    args.forEach(diceRoll => {
        //Roll for each of the supplied arguments
        let rollValue = HandleRoll(diceRoll);
        totalRollValue += rollValue;
        msg.channel.send(`${diceRoll} Rolled a ${rollValue}`);
    });

    return totalRollValue;
}

function Roll(numberOfDiceToRoll, dieSizeToRoll) {
    let totalValue = 0;
    for (let i = 0; i < numberOfDiceToRoll; i++) {
        totalValue += (1 + Math.floor(Math.random() * dieSizeToRoll))
    }

    return totalValue;
}

function HandleRoll(diceRoll) {
    let numberOfDiceToRoll;
    let dieSizeToRoll;
    if (diceRoll.indexOf("d") === 0) {
        //Rolling a single dice
        numberOfDiceToRoll = 1;
        dieSizeToRoll = diceRoll.substring(1)
    }
    else {
        //Rolling multiple dice
        dieSizeToRoll = diceRoll.substring(2);
        numberOfDiceToRoll = diceRoll.substring(0, diceRoll.indexOf("d"));
    }

    return Roll(numberOfDiceToRoll, dieSizeToRoll);
}