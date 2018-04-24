const Discord = require('discord.js');
const client = new Discord.Client();

bot.on('ready', () => {
bot.user.setGame(`Test Bots | >help`);
  console.log(`Bot is Online!`);
});

bot.on("message", async message => {
  bot.user.setStatus("online");
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = ">";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
     .setDescription("Server Information")
     .setColor("#15f153")
     .setThumbnail(sicon)
     .addField("Server Name", message.guild.name)
     .addField("Created On", message.guild.createdAt)
     .addField("Joined At", message.member.joinedAt)
     .addField("Members", message.guild.memberCount);

   return message.channel.send(serverembed);
 }

bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(process.env.BOT_TOKEN);
