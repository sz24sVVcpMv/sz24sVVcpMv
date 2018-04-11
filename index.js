const Discord = require("discord.js");
const client = new Discord.Client();
var bot = new Discord.Client();

client.on('ready', () => {
  client.user.setStatus("online");
  client.user.setGame("%help | ZombieBot");
  console.log("Reload Completed!");
});

const prefix = "%";
client.on("message", (message) => {

  if (!message.content.startsWith(prefix)) return;

  if (message.content === (prefix + "discord")) {
    message.channel.send({embed: {
      color: 3447003,
      title: "__Zombie Discord:__\n \n",
      description: "** **\nhttps://discord.gg/ZqsBYV5",
      footer: 
      {
          text: "ZombieBot"
      }
    }});
  } else
  if (message.content === (prefix + "creator")) {
    message.channel.send("The Creator of the Bot is `Derpy#6522`");
  } else
  if (message.content === (prefix + "youtube")) {
    message.channel.send("**Youtube Channel:**\n** **\nhttps://www.youtube.com/channel/UCKdMasMTxyCezkDItjstSHA");
  } else
  if (message.content === (prefix + "invite")) {
    message.author.sendMessage("**__Invite The Bot:__**\n \nhttps://discordapp.com/api/oauth2/authorize?client_id=432950161778409472&permissions=0&scope=bot");
    message.reply("Please check your direct messages :mailbox_with_no_mail:");
  } else
  if (message.content === (prefix + "help")) {
    message.author.sendMessage({embed: {
     color: 0xbf0000,
     title: "__Zombie Commands:__\n \n",
     description: "** **\n**%discord ** - Discord Link\n**%creator** - The Creators of the Bot\n**%ping** - Show to you how much Ping you have\n**%avatar** - show your avatar profile\n**%youtube** - Youtube Channel\n**%help** - Show this Menu",
     footer: 
     {
         timestamp: new Date(),
         icon_url: client.bot.avatarURL,
         text: "ZombieBot"
     }
   }});
    message.reply("Please check your direct messages :mailbox_with_no_mail:");
  }
});

  client.on('message', message => {
    if (message.content === `%ping`) {
      message.reply(`Pong! The ping is **${(client.ping).toFixed(0)}**ms!  :ping_pong:`);
    }
  });

  client.on('message', message => {
    if (message.content === '%avatar') {
      message.reply(message.author.avatarURL);
    }
  });

  client.on('message', message => {
    if (message.content === 'test') {
      message.reply("I am Online, for start type `%help`");
    }
  });

client.login(process.env.BOT_TOKEN);
