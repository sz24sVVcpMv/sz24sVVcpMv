const Discord = require('discord.js');
const client = new Discord.Client();
const botconfig = require("./botconfig.json");

client.on('ready', () => {
client.user.setGame(`Test Bots | >help`);
  console.log(`Bot is Online!`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;

client.on('message', msg => {
  if (msg.content === '${prefix}ping') {
    msg.reply('Pong!');
  }
});

client.login(process.env.BOT_TOKEN);
