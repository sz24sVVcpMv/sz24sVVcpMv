const Discord = require("discord.js");
const client = new Discord.Client();
var bot = new Discord.Client();

client.on('ready', () => {
  client.user.setStatus("online");
  client.user.setGame("-help");
  console.log("Reload Completed!");
});

const prefix = "-";
client.on("message", (message) => {

  if (!message.content.startsWith(prefix)) return;

  if (message.content === (prefix + "embed")) {
    message.channel.send({embed: {
      color: 0x008000,
      title: "Title",
      description: "** **\nDescription",
      footer: 
      {
         icon_url: client.user.avatarURL,
         text: "TestBot"
      }
    }});
  } else
  if (message.content === (prefix + "creator")) {
    message.channel.send("The Creator of the Bot is `Derpy#6522`");
  } else
  if (message.content === (prefix + "invite")) {
    message.author.sendMessage("**__Invite The Bot:__**\n \nhttps://discordapp.com/api/oauth2/authorize?client_id=432950161778409472&permissions=0&scope=bot");
    message.reply("Please check your direct messages :mailbox_with_no_mail:")
  }
});

  client.on('message', message => {
    if (message.content === `-ping`) {
      message.reply(`Pong! The ping is **${(client.ping).toFixed(0)}**ms!  :ping_pong:`);
    }
  });

  client.on('message', message => {
    if (message.content === '-avatar') {
      message.reply(message.author.avatarURL);
    }
  });

  client.on('message', message => {
    if (message.content === '-say') {
      message.reply(channel.id);
    }
  });

  client.on('message', message => {
    if (message.content === 'test') {
      message.reply("I am Online");
    }
  });

client.login(process.env.BOT_TOKEN);
