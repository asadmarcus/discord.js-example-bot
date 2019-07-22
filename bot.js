const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const { Client, RichEmbed } = require('discord.js');

client.on("message", async message => {

// UNIVERSAL

const mentionembed= new Discord.RichEmbed().setColor(config.embedcolor).setTitle(config.mentionfirsttitle).setDescription(config.mentionfirst);

// HELP

if (message.content.startsWith(config.prefix + 'help')) {
    const embed = new RichEmbed()
    .setAuthor("MeetandNut - bot commands", (config.embedlogo))
    .addField("Member commands",
    "``help``")
    .addField("Admin commands",
    "``mute``, ``unmute``, ``kick``, ``ban``")
    message.channel.send(embed);
}

// MUTE

 const mutenorights = new Discord.RichEmbed().setColor(config.embedcolor).setDescription(config.mutenorights);
 const muteembedsucces = new Discord.RichEmbed().setColor(config.embedcolor).setDescription(config.mutesuccesfully);
 const unmutenorights = new Discord.RichEmbed().setColor(config.embedcolor).setDescription(config.unmutenorights);
 const unmuteembedsucces = new Discord.RichEmbed().setColor(config.embedcolor).setDescription(config.unmutesuccesfully);


    if (message.content.startsWith(config.prefix + 'mute')) {
        if(!message.member.roles.find("owner", config.adminmuterole))
        return message.channel.send(mutenorights);
        let member = message.mentions.members.first();
        if(!member)
        return message.author.sendMessage(mentionembed) + message.delete();
        member.addRole(config.muterole)
        return message.channel.send(muteembedsucces)
    }
    
    if (message.content.startsWith(config.prefix + 'unmute')) {
        if(!message.member.roles.find("owner", config.adminmuterole))
        return message.channel.send(unmutenorights);
        let member = message.mentions.members.first();
        if(!member)
        return message.author.sendMessage(mentionembed) + message.delete();
        member.removeRole(config.muterole)
        return message.channel.send(unmuteembedsucces)
    }

// KICK

const kicknorights = new Discord.RichEmbed().setColor(config.embedcolor).setDescription(config.kicknorights);
const kicksuccess = new Discord.RichEmbed().setColor(config.embedcolor).setDescription(config.kicksuccesfully);
const unkickable = new Discord.RichEmbed().setColor(config.embedcolor).setDescription(config.unkickable);

if (message.content.startsWith(config.prefix + 'kick')) {
    if(!message.member.roles.find("owner", config.adminkickrole))
    return message.channel.send(kicknorights);
    let member = message.mentions.members.first();
    if(!member)
    return message.author.sendMessage(mentionembed) + message.delete();
    if (!member.kickable)
    return message.channel.send(unkickable);
    message.channel.send(kicksuccess);
}

// BAN

const bannorights = new Discord.RichEmbed().setColor(config.embedcolor).setDescription(config.bannorights);
const bansuccess = new Discord.RichEmbed().setColor(config.embedcolor).setDescription(config.bansuccesfully);
const unbannable = new Discord.RichEmbed().setColor(config.embedcolor).setDescription(config.unbannable);

if (message.content.startsWith(config.prefix + 'ban')) {
    if(!message.member.roles.find("owner", config.adminbanrole))
    return message.channel.send(bannorights);
    let member = message.mentions.members.first();
    if(!member)
    return message.author.sendMessage(mentionembed) + message.delete();
    if (!member.bannable)
    return message.channel.send(unbannable);
    message.channel.send(bansuccess);
    member.ban()
}

    });

// Bot status

client.on('ready', () => {
    console.log(`MeetandNut bot activated successfully`);
    client.user.setPresence({ status: 'dnd', game: { name: config.botstatus, type: 'WATCHING' } });
});


client.login(config.token);
