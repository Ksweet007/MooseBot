require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const { prefix } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

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

    if (!client.commands.has(command)) return;

    if (msg.author.username === "FChopin666") {
        msg.channel.send("Sorry, Gai Bois can't use the dice roller.");
        return;
    }

    try {
        client.commands.get(command).execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
});