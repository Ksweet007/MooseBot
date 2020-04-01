// Run dotenv
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);

client.on('message', msg => {
    if (!msg.content.startsWith(prefix)) return;

    //Get indexes for brackets to be able to grab out the value provided
    const indexOfFirstBracket = msg.content.indexOf('[');
    const indexOfSecondBracket = msg.content.indexOf(']');

    //Get the Value of what is being rolled without brackets
    const diceCountWithDiceSize = msg.content.substring(indexOfFirstBracket + 1, indexOfSecondBracket);

    let numberOfDiceToRoll;
    let dieSizeToRoll;
    if (diceCountWithDiceSize.indexOf("d") === 0) {
        //Rolling a single dice
        numberOfDiceToRoll = 1;
        dieSizeToRoll = diceCountWithDiceSize.substring(1)
    }
    else {
        //Rolling multiple dice
        dieSizeToRoll = diceCountWithDiceSize.substring(2);
        numberOfDiceToRoll = diceCountWithDiceSize.substring(0, diceCountWithDiceSize.indexOf("d"));
    }

    const valueRolled = Roll(numberOfDiceToRoll, dieSizeToRoll);
    msg.reply(`Rolled a ${valueRolled}`)

});


function Roll(numberOfDiceToRoll, dieSizeToRoll) {
    let totalValue = 0;
    for (let i = 0; i < numberOfDiceToRoll; i++) {
        totalValue += (1 + Math.floor(Math.random() * dieSizeToRoll))
    }

    return totalValue;
}