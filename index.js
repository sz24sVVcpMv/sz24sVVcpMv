const Discord = require('discord.js');
const client = new Discord.Client();

var servers = {};

const bot = new Discord.Client({disableEveryone: true});

bot.on('ready', () => {
bot.user.setGame(`Test Bots | >help`);
  console.log(`Bot is Online!`);
});

  let prefix = ">";

bot.on('message', msg => {
  if (msg.content === '${prefix}ping') {
    msg.reply('Pong!');
  }
});

client.login(process.env.BOT_TOKEN);
