const Discord = require('discord.js');
const client = new Discord.Client();
const botconfig = require("./botconfig.json");


client.on('ready', () => {
  console.log(`Bot is Online!`);
client.user.setActivity(`${client.users.size} שחקנים | By NiceGames & Date`);
});

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;


  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  //welcome join
  client.on('guildMemberAdd', member => {
  client.user.setActivity(`${client.users.size} שחקנים | By NiceGames & Date`);
    var welcomechannel = client.channels.get('489897345438318592');
    if (!welcomechannel) return;
    const joinEmbed = new Discord.RichEmbed()
  .setThumbnail(member.user.avatarURL)
  .setDescription(`!ברוך הבא\n ${member}\nאתה שחקן מספר ${member.guild.memberCount}!`);
  return welcomechannel.send(joinEmbed)
  });
  client.on('guildMemberRemove', () => {
      client.user.setActivity(`${client.users.size} שחקנים | By NiceGames & Date`);
  });

if (cmd === `${prefix}help`){
const helpembed = new Discord.RichEmbed()
  .setTitle("Help Commands")
  .setColor("#15f153")
  .setDescription("פקודות לצוות:\n`?kick` `?ban`\n`?mute`\n`?tempmute`\n`?unmute`\n\nפקודות רגילות:\n`?helpme`\n`?report`\n`?serverinfo`");
message.author.send(helpembed)
message.reply("קיבלת פקודות בפרטי! <:fls:493809232064544778>")
}

if(cmd === `${prefix}kick`){

  //!kick @daeshan askin for it

  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("!לא מצא את המשתמש");
  let kReason = args.join(" ").slice(22);
  if(!message.member.roles.find("name", "STAFF")) return message.reply("!אתה לא יכול לתת לו קיק ");


  let kickEmbed = new Discord.RichEmbed()
  .setDescription("~קיק~")
  .setColor("#e56b00")
  .addField("משתמש שקיבל קיק", `${kUser} with ID ${kUser.id}`)
  .addField("קיבל קיק על ידי", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("קיבל קיק מ", message.channel)
  .addField("שעה", message.createdAt)
  .addField("סיבה", kReason);

  let kickChannel = message.guild.channels.find(`name`, "kicks-bans-reports");
  if(!kickChannel) return message.channel.send("חדר kicks-bans-reports לא נמצא.");

  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed);

  return;
}

if(cmd === `${prefix}mute`){
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("לא נמצא משתמש.");
  if(!message.member.roles.find("name", "STAFF")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.find(`name`, "Muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#818386",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  await(tomute.addRole(muterole.id));
  message.channel.send(`<@${tomute.id}> is now muted`);

 try{
   await tomute.send(`Hi! You've been muted. Sorry!`)
 }catch(e){
   message.channel.send(`A user has been muted... but their DMs are locked.`)
 }
}

if(cmd === `${prefix}tempmute`){
let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!tomute) return message.reply("לא נמצא משתמש.");
if(!message.member.roles.find("name", "STAFF")) return message.reply("Can't mute them!");
let muterole = message.guild.roles.find(`name`, "Muted");
//start of create role
if(!muterole){
  try{
    muterole = await message.guild.createRole({
      name: "Muted",
      color: "#818386",
      permissions:[]
    })
    message.guild.channels.forEach(async (channel, id) => {
      await channel.overwritePermissions(muterole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      });
    });
  }catch(e){
    console.log(e.stack);
  }
}
//end of create role
let mutetime = args[1];
if(!mutetime) return message.reply("You didn't specify a time!");

await(tomute.addRole(muterole.id));
message.reply(`<@${tomute.id}> Muted for ${ms(ms(mutetime))}`);

setTimeout(function(){
  tomute.removeRole(muterole.id);
  message.channel.send(`<@${tomute.id}> has been unmuted!`);
}, ms(mutetime));
}

if(cmd === `${prefix}unmute`){
let unmuteError = new Discord.RichEmbed()
.setTitle("Error")
.setColor('#444444')
.addField("Command:", '?unmute  [@user]')
.addField("Missed Args:", '❌ You need `Mention a User`')
.addField("Example:", '?unmute <@184706878876549131>');

let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if(!member) return message.channel.sendMessage(unmuteError);
if(!message.member.roles.find("name", "STAFF")) return message.channel.send("❌ You dont have the premission to unmute")

let role = message.guild.roles.find(r => r.name === "Muted");

if(!role || !member.roles.has(role.id)) return message.channel.sendMessage("This user is not muted!");

await member.removeRole(role);

message.channel.send(`✔️ ***${member.user.username}#${member.user.discriminator} has been unmuted***`);

let str = `<@!`+member.id+`>`;

let id = str.replace(/[<@!>]/g, '');

bot.fetchUser(id)
.then(user => {user.send(`You have been unmuted in ${message.guild.name}`)})
}


if(cmd === `${prefix}ban`){
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("לא מצא את המשתמש");
  let bReason = args.join(" ").slice(22);
if(!message.member.roles.find("name", "STAFF")) return message.reply("!אתה לא יכול לתת באן");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("~באן~")
  .setColor("#bc0000")
  .addField("משתמש שקיבל באן", `${bUser} with ID ${bUser.id}`)
  .addField("קיבל באן על ידי", `<@${message.author.id}> with ID ${message.author.id}`)
  .addField("קיבל באן מ", message.channel)
  .addField("שעה", message.createdAt)
  .addField("סיבה", bReason);

  let incidentchannel = message.guild.channels.find(`name`, "kicks-bans-reports");
  if(!incidentchannel) return message.channel.send("חדר kicks-bans-reports לא נמצא.");

  message.guild.member(bUser).ban(bReason);
  incidentchannel.send(banEmbed);


  return;
}

if(cmd === `${prefix}warn`){

  //!warn @user this is the reason
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("?warn [user] [reason]");
  let rreason = args.join(" ").slice(22);
  if(!message.member.roles.find("name", "STAFF")) return message.channel.send("You cant to use this command!")
  if(rUser.roles.find("name", "STAFF")) return message.channel.send("Cant warn him!");

  message.channel.send(`האזהרה התקבלה בהצלחה.`);

  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Warnings")
  .setColor("#1b8fbd")
  .addField("User", `${rUser}`)
  .addField("Staff", `${message.author}`)
  .addField("Reason", rreason);


  let reportschannel = message.guild.channels.find(`name`, "kicks-bans-reports");
  if(!reportschannel) return message.channel.send("Can't find channel called `kicks-bans-reports`");


  reportschannel.send(reportEmbed);

  return;
}

if(cmd === `${prefix}helpme`){
  let member = message.author.id
  message.channel.send(`<@&493706835400851467>, <@${member}> צריך עזרה!`)
}

if(cmd === `${prefix}report`){

  //!report @ned this is the reason

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Couldn't find user.");
  let rreason = args.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
  .setDescription("דיווחים")
  .setColor("#15f153")
  .addField("המשתמש שעליו דווחו", `${rUser} with ID: ${rUser.id}`)
  .addField("דווח על ידי", `${message.author} with ID: ${message.author.id}`)
  .addField("חדר", message.channel)
  .addField("שעה", message.createdAt)
  .addField("סיבת הדוווח", rreason);

  let reportschannel = message.guild.channels.find(`name`, "kicks-bans-reports");
  if(!reportschannel) return message.channel.send("לא מצא את החדר kicks-bans-reports.");


  message.delete().catch(O_o=>{});
  reportschannel.send(reportEmbed);

  return;
}




if(cmd === `${prefix}serverinfo`){

  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
  .setDescription("פרטי שרת")
  .setColor("#15f153")
  .setThumbnail(sicon)
  .addField("שם השרת", message.guild.name)
  .addField("נפתח ב", message.guild.createdAt)
  .addField("מתי נכנסת", message.member.joinedAt)
  .addField("כמות האנשים", message.guild.memberCount);

  return message.channel.send(serverembed);
}



if(cmd === `${prefix}botinfo`){

  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("מידע על בוט")
  .setColor("#15f153")
  .setThumbnail(bicon)
  .addField("שם הבוט", bot.user.username)
  .addField("נוצר ב", bot.user.createdAt);

  return message.channel.send(botembed);
}


});

client.login(process.env.BOT_TOKEN);
