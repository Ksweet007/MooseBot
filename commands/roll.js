const { RollMultipleGroupsOfDice } = require('../utils/roller');

module.exports = {
    name: 'roll',
    description: 'Dice Roller',
    execute(msg, args) {
        const totalRoll = RollMultipleGroupsOfDice(msg, args);
        msg.reply(`You rolled a ${totalRoll}`);
    },
};