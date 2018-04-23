const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
client.user.setGame(`Test Bots`);
  console.log(`Bot is Online!`);
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = process.env.BOT_PREFIX;
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

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(process.env.BOT_TOKEN);
