//Libraries (Discord.js)
const Discord = require("discord.js");
const client = new Discord.Client();

//Start-up message | Activity
client.on("ready", () => {
  //Start-up message
  console.log("Tingle has loaded - 100%");
});

//Basic setup
client.on("message", message => {


  //Custom Emojis (ErrorMark, CheckMark)
  const ErrorMark = client.emojis.get("478107195020673027");
  const CheckMark = client.emojis.get("478106894196539402");

  //Bot setup (Prefix, Commands, Arguements, Sender)
  const prefix = "/";
  const args = message.content.split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const sender = message.author;

  //If sender = A bot user, return.
  if(sender.bot) return;

  //If message.channel.type == "dm" and command used: return with text.
  if(message.channel.type == "dm"){
    if(cmd == prefix + "say"){
      message.channel.send("You may only use the say command in a guild, " + sender + ".");
      return;
    }
    if(cmd == prefix + "kick"){
      message.channel.send("You may only use the kick command in a guild, " + sender + ".");
      return;
    }
    if(cmd == prefix + "ban"){
      message.channel.send("You may only use the ban command in a guild, " + sender + ".");
      return;
    }
  };

  //Commands - Format:
  //if(cmd == prefix + "NAME"){
  //message.channel.send("Text!");
  //}



  //Say Command - /say "text"
  if(cmd == prefix + "say"){
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(ErrorMark + ' | You do not have the permission "Manage Members" on this guild.' + sender + ".");
    if(!args[0]) return message.channel.send(ErrorMark + " | Please provide some text.");
    message.channel.send(args.join(" "));
  }

  //Kick Command - /kick "user"
  if(cmd == prefix + "kick"){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(ErrorMark + ' | You do not have the permission "Manage Members" on this guild.' + sender + ".");
    if(!args[0]) return message.channel.send(ErrorMark + " | Please provide a user.");
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!user) return message.channel.send(ErrorMark + " | Please provide a valid user.");
    if(user.hasPermission("MANAGE_MESSAGES")) return message.channel.send(ErrorMark + ' | ' + user + ' has the permission "Manage Members" on this guild, ' + sender + ".");

    let kickEmbed = new Discord.RichEmbed()
    .setTitle("Kick")
    .setColor("#ffce30")
    .addField("Kicked user:", user)
    .setThumbnail(user.user.avatarURL);


    message.channel.send(kickEmbed).then((msg => {
      msg.react(CheckMark);
    }));
    user.kick();
  }


    //Ban Command - /ban "user"
    if(cmd == prefix + "ban"){
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(ErrorMark + ' | You do not have the permission "Manage Members" on this guild.' + sender + ".");
      if(!args[0]) return message.channel.send(ErrorMark + " | Please provide a user.");
      let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!user) return message.channel.send(ErrorMark + " | Please provide a valid user.");
      if(user.hasPermission("MANAGE_MESSAGES")) return message.channel.send(ErrorMark + ' | ' + user + ' has the permission "Manage Members" on this guild, ' + sender + ".");

      let banEmbed = new Discord.RichEmbed()
      .setTitle("Ban")
      .setColor("#ff2828")
      .addField("Banned user:", user)
      .setThumbnail(user.user.avatarURL);


      message.channel.send(banEmbed).then((msg => {
        msg.react(CheckMark)
      }));
      user.ban();
    }

    //Ping Command - /ping
    if(cmd == prefix + "ping"){
      let pingEmbedB = new Discord.RichEmbed()
      .setTitle(":ping_pong: Pong!")
      .setThumbnail("https://i.imgur.com/c1jeRzQ.png")
      .setColor("#5fffcb");

      message.channel.send(pingEmbedB).then((msg => {
        let pingEmbedA = new Discord.RichEmbed()
        .setTitle(":ping_pong: Pong!")
        .setColor("#F47B67")
        .setThumbnail("https://i.imgur.com/c1jeRzQ.png")
        .setDescription(`:arrow_forward: Latency: ${msg.createdTimestamp - message.createdTimestamp}ms.\n\n:signal_strength: API Latency: ` + Math.round(client.ping) + "ms.");

        msg.edit(pingEmbedA);
      }))

    }

    //Clear Command - /clear "NUMBER"
    if(cmd == prefix + "clear"){
      if(!args[0]) return message.channel.send(ErrorMark + " | Please provide a value of messages to delete.");
      if(isNaN(args[0])) return message.channel.send(ErrorMark + " | Please provide a valid number, " + sender);

      message.channel.bulkDelete(args[0]).catch(error => {
        message.channel.send("Error" + error).then((msg => {
          if(msg.content.includes("equal")){
            msg.delete();
            message.channel.bulkDelete("3");
            message.channel.send(ErrorMark + " | You may only provide a value under or equal to 100.");
          } else if (msg.content.includes("14")) {
            msg.delete();
            message.channel.bulkDelete("3");
          message.channel.send(ErrorMark + " | You may only use the /clear command to delete messages under 14 days.");
          }


        }));
      });

      let clearEmbedA = new Discord.RichEmbed()
      .setTitle("Clear")
      .setDescription("Succesfully deleted " + args[0] + " message out of the channel " + message.channel + ".")
      .setColor("#F47B67")
      .setThumbnail("https://i.imgur.com/bR6GZnZ.png");

      let clearEmbedB = new Discord.RichEmbed()
      .setTitle("Clear")
      .setDescription("Succesfully deleted " + args[0] + " messages out of the channel " + message.channel + ".")
      .setColor("#F47B67")
      .setThumbnail("https://i.imgur.com/bR6GZnZ.png");

      if(args[0] == "1"){
        message.channel.send(clearEmbedA).then((msg => {
          msg.react(CheckMark);
        }));
      } else {
      message.channel.send(clearEmbedB).then((msg => {
        msg.react(CheckMark);
      }));
      }

    }

  
    //END




});


//Client login
client.login("NDgwMDgzNzEzMjUwODIwMTA3.Dliosg.I2c8ASPrZjxMBsFi0QiQZDH13aU");
