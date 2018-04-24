const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
client.user.setGame(`Test Bots | >help`);
  console.log(`Bot is Online!`);
});

client.on('message', msg => {
  if (msg.content === '${prefix}ping') {
    msg.reply('Pong!');
  }
});

client.login(process.env.BOT_TOKEN);
