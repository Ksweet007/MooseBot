require('dotenv').config();
const Discord = require('discord.js');
const { prefix } = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

client.on('message', msg => {
    //If the message doesn't start with our prefix or a bot sent it, exit early
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    //Create args which will remove the prefix and move args to an array
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //USE FOR DEBUGGING WHAT COMMANDS WERE PROVIDED
    //msg.channel.send(`Command name: ${command}\nArguments: ${args}`);

    //TODO: Change this to look at multiple arguments
    const diceCountWithDiceSize = args[0];
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