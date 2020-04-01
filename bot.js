// Run dotenv
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

client.on('message', msg => {    
    if(msg.content.startsWith("/r")){
        //Get indexes for brackets to be able to grab out the value provided
        const indexOfFirstBracket = msg.content.indexOf('[');
        const indexOfSecondBracket = msg.content.indexOf(']');

        //Get the Value of what is being rolled without brackets
        const diceCountWithDiceSize = msg.content.substring(indexOfFirstBracket +1, indexOfSecondBracket);

        let valueRolled = 0;
        let numberOfDiceToRoll = 1;
        let dieSizeToRoll = 0;
        if(diceCountWithDiceSize.indexOf("d") === 0){
            //Rolling a single dice
            dieSizeToRoll = diceCountWithDiceSize.substring(1)            
            valueRolled = 1 + Math.floor(Math.random() * dieSizeToRoll);
        }
        else{
            //Rolling multiple dice
            dieSizeToRoll = diceCountWithDiceSize.substring(2);
            numberOfDiceToRoll = diceCountWithDiceSize.substring(0,diceCountWithDiceSize.indexOf("d"));
            for(let i =0; i < numberOfDiceToRoll;i++){
                valueRolled += (1 + Math.floor(Math.random() * dieSizeToRoll))
            }
        }
        msg.reply(`Rolled a ${valueRolled}`)        
    }
  });