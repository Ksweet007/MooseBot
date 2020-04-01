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

    if (!command.toLowerCase() === "roll") return;

    let totalRollValue = 0;
    args.forEach(diceRoll => {
        //Roll for each of the supplied arguments
        let rollValue = HandleRoll(diceRoll);
        totalRollValue += rollValue;
        msg.channel.send(`${diceRoll} Rolled a ${rollValue}`);
    });

    msg.reply(`Rolled a ${totalRollValue}`)

});


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