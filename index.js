const Discord = require ('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();

var prefix = '/'
var token = 'NTkxOTMzNDE3NjYzNDk2MTk4.XQ3_Mw.kxx9B3Kt-PrjMtuOyRr-1RWKhTI'

client.login(token);
client.on('ready', function(){
         console.log("Je suis connecté")
         client.user.setActivity("/help | V1.2", { type : 'PLAYING' })
})
//••••••••••••••••••••••••••••••••••••••••••••••••
client.on('message', function(message){
    if(message.content.includes(prefix + 'usbdhsg')){
        message.channel.send('agudhzj')          
} else if(message.content.startsWith(prefix + "clear")){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**⚠ Vous n'avez pas les permissions.**")
        let args = message.content.split(" ").slice(1);
        if(!args[0]) return message.channel.send("**⚠ Vous n'avez pas defini le nombre de messages à supprimer.**")
        message.delete()
        message.channel.bulkDelete(args[0]).then(() => {
                     message.channel.send(`**✅ ${args[0]} messages ont été supprimé.**`)
        })
  }
})
//••••••••••••••••••••••••••••••••••••••••••••••••
//kick + ban
client.on('message', message => {
    if (!message.guild) return;
    if (message.content.startsWith('/kick')) {
         if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**⚠ Vous n'avez pas les permissions.**")
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member.kick('Optional reason that will display in the audit logs').then(() => {
            message.reply(`**✅ ${user.tag} a été kick du serveur.**`);
          }).catch(err => {
            message.reply('**❌ Impossible de kick le membre.**');
            console.error(err);
          });
        } else {
          message.reply('That user isn\'t in this guild!');
        }
      } else {
        message.reply("**⚠ Vous n'avez pas mentionner le membre à kick.**");
      }
    }
  });
  client.on('message', message => {
    if (!message.guild) return;
    if (message.content.startsWith('/ban')) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**⚠ Vous n'avez pas les permissions.**")
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member.ban({
            reason: 'They were bad!',
          }).then(() => {
            message.reply(`✅ ${user.tag} a été ban du serveur.`);
          }).catch(err => {
            message.reply('**❌ Impossible de bannir le membre.**')
            console.error(err);
          });
        } else {
          message.reply('That user isn\'t in this guild!');
        }
      } else {
        message.reply("**⚠ Vous n'avez pas mentionner le membre à bannir.**");
      }
    }
  });
  //••••••••••••••••••••••••••••••••••••••••••••••••
  client.on('message', function(message){
    if(message.content.includes(prefix + 'help')){
        let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}`, message.author.avatarURL)
    .setColor("#FF0000")
    .addField("**Page D'Aide**", "⬇ ⬇", true)
    .addField("**Utile**", "invite, support, server-info, user-info, strawpoll", true)
    .addField("**Modération**", "clear, ban, kick", true)
    .addField("**Fun**", "avatar, ping, gif(1/2)", true)
    .addField("**Battlelands Royale**", "classement, mystere-hebdo, offre, gems, battle-events, skin-info", true)  
    .setTimestamp()
   message.channel.send(embed);
}
})
//••••••••••••••••••••••••••••••••••••••••••••••••
client.on('message', function(message){
    if(message.content.includes(prefix + 'user-info')){
    let user;
    if(message.mentions.users.first()){
        user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    const member = message.guild.member(user);
    const embed = new Discord.RichEmbed()
    .setColor('#8B4513')
    .setThumbnail(user.avatarURL)
    .setTitle(`${user.username}#${user.discriminator}`)
    .addField("**ID Du Membre**", `${user.id}`, true)
    .addField("**Compte Crée Le**", `${moment.utc(user.createdAt).format('MMMM, dddd Do YYYY, HH:mm:ss')}`, true)
    .addField("**Serveur Rejoind Le**", "**" + message.member.joinedAt.toLocaleString() + "**")
    .addField("**Status**", `${user.presence.status}`, true)
    .addField("**Jeu**", `${user.presence.game ? user.presence.game.name : "Aucun"}`, true)
    .setFooter(`Réponse à ${message.author.username}#${message.author.discriminator}`)
    message.channel.send(embed);
 }
 })
client.on('message', function(message){
    if(message.content.includes(prefix + 'server-info')){
        let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}`, message.author.avatarURL)
    .setFooter(`${message.guild.name}`)
    .setColor("#8B4513")
    .addField("**ID Du Serveur**", "**" + message.guild.id + "**", true)
    .addField("**Nom Du Serveur**", "**" + message.guild.name + "**", true)
    .addField("**Créateur Du Serveur**", "**" + message.guild.owner.user.tag + "**", true)
    .addField("**L'ID Du Créateur**", "**" + message.guild.ownerID + "**", true)
    .addField("**Membres**", "**" + message.guild.memberCount + "**", true)
    .addField("**Humains**", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
    .addField("**Nombres de Bots**", "**" + message.guild.members.filter(m => m.user.bot).size + "**", true)
    .addField("**Serveur Crée Le**", `${message.guild.createdAt.toLocaleString()}`, true)
    .addField("**Serveur Rejoint Le**", message.member.joinedAt.toLocaleString(), true)
    .setTimestamp()
  message.channel.send(embed);
}
})
//••••••••••••••••••••••••••••••••••••••••••••••••
//strawpoll
client.on('message', function(message){
    if(message.content.includes(prefix + 'strawpoll')){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**⚠ Vous n'avez pas les permissions.**")
        let args = message.content.slice(prefix.length).trim().split(' ').join(" ")
        if(!args.slice(10)) return message.channel.send("⚠ **Tu n'as pas présisé de texte !**")
        let embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.username}`, message.author.avatarURL)
        .setDescription(args.slice(10))
        .setTimestamp()
        .setColor("#00FFFF")
        message.channel.send(embed).then(async (message) => {await message.react("✅");message.react("❌")})
    }
    })
//••••••••••••••••••••••••••••••••••••••••••••••••
//gif
client.on('message', function(message){
    if(message.content.includes(prefix + 'gif1')){
    message.delete()
    message.channel.send("https://cdn.discordapp.com/attachments/471024633425035285/595944194300968980/pikadab.gif")
}
})
client.on('message', function(message){
    if(message.content.includes(prefix + 'gif2')){
    message.delete()
    message.channel.send("https://cdn.discordapp.com/attachments/468141896431173675/595942307149381632/fire-fight-logo-test.gif")
}
})
//••••••••••••••••••••••••••••••••••••••••••••••••
//invite + support
client.on('message', function(message){
          if(message.content.includes(prefix + 'invite')){
              message.channel.send("Inviter le bot dans votre serveur : https://discordapp.com/oauth2/authorize?client_id=591933417663496198&scope=bot&permissions=8")
          }
})
client.on('message', function(message){
          if(message.content.includes(prefix + 'support')){
              message.channel.send("Serveur support : https://discord.gg/yKwSFj6")
          }
})
//••••••••••••••••••••••••••••••••••••••••••••••••
//classement
 client.on('message', function(message){
    if(message.content.includes(prefix + 'classement')){
        let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}`, message.author.avatarURL)
    .setColor("#7FFFD4")
    .addField("**Classement**", "⬇ ⬇", true)
    .addField("**🥇 Premier**", "SammyJR \n {Niveau : 77}", true)
    .addField("**🥈 Deuxième**", "JD|JUAN \n {Niveau : 76}", true)
    .addField("**🥉 Troisième**", "EZ_ninjadk \n {Niveau : 73}", true)
    .setTimestamp()
   message.channel.send(embed);
}
})
    //••••••••••••••••••••••••••••••••••••••••••••••••
//gems
client.on('message', function(message){
    if(message.content.includes(prefix + 'gems')){
        let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}`, message.author.avatarURL)
    .setColor("#F0F8FF")
    .addField("**Achats De Gems**", "⬇ ⬇", true)
    .addField("**30 GEMS**", "2,29€", true)
    .addField("**80 GEMS**", "5,49€", true)
    .addField("**170 GEMS**", "10,99€", true)
    .addField("**360 GEMS**", "21,99€", true)
    .addField("**950 GEMS**", "54,99€", true)   
    .setTimestamp()
   message.channel.send(embed);
}
})
//••••••••••••••••••••••••••••••••••••••••••••••••
//Mystère Hebdomadaire
client.on('message', function(message){
    if(message.content.includes(prefix + 'mystere-hebdo')){
        let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}`, message.author.avatarURL)
    .setColor("#000000")
    .addField("**Mystère Hebdomadaire**", "⬇ ⬇", true)
    .addField("**Dans La Lorgnette**", " {Récompense : 400 XP}", true)
    .setTimestamp()
   message.channel.send(embed);
}
})
//••••••••••••••••••••••••••••••••••••••••••••••••
//battle-events
client.on('message', function(message){
    if(message.content.includes(prefix + 'battle-events')){
        let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}`, message.author.avatarURL)
    .setColor("#000080")
    .addField("**Événements Du Jour**", "⬇ ⬇", true)
    .addField("**Double élimination**", "Faites deux victimes d'un coup \n {Récompense max : 50 Battle Bucks & 10 cartes de Wilson Puck}", true)
    .addField("**Puissance de feu**", "Vaincre 2 fois deux combattants avec la mitraillette \n {Récompense max : 125 Battle Bucks & 10 cartes de Moumie}", true)
    .setTimestamp()
   message.channel.send(embed);
}
})
//••••••••••••••••••••••••••••••••••••••••••••••••
//offre
client.on('message', function(message){
    if(message.content.includes(prefix + 'offre')){
   message.channel.send('https://cdn.discordapp.com/attachments/594644697557762071/595136881163763712/Screenshot_20190701-081705.png')
}
})
//••••••••••••••••••••••••••••••••••••••••••••••••
//skin-count
client.on('message', function(message){
    if(message.content.includes(prefix + 'skin-info')){
        let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}`, message.author.avatarURL)
    .setColor("#FFFF00")
    .addField("**Nombre De Skins**", "75 skins", true)
    .addField("**Skins Communs**", "24 skins", true)
    .addField("**Skins Rares**", "23 skins", true)
    .addField("**Skins Légendaires**", "28 skins", true)
    .setTimestamp()
   message.channel.send(embed);
}
})