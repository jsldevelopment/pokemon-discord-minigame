const { MessageEmbed } = require('discord.js');

const promptBegin = {
    title: "Welcome to the world of Pokemon!",
    desc: "In order to get you registered for our game, we need to you to answer a few basic questions about yourself."
}

const promptAvatar = {
    title: "Select an avatar -",
    desc: "Please select the avatar you feel most suits the type of trainer you see yourself as."
}

const promptStarter = {
    title: "Select your starter -",
    desc:"Please choose one of the following pokemon partners to accompany you on your grand adventure."
}

const promptRules = {
    title: "Press here to agree to the rules and conditions.",
    desc: "In order to get you registered for our game, we need to you to answer a few basic questions about yourself."
}

const promptComplete = {
    title: "Registration complete!",
    desc: "In order to get you registered for our game, we need to you to answer a few basic questions about yourself."
}

const embedBegin = new MessageEmbed()
    .setColor('#ffcb05')
    .setTitle(promptBegin.title)
    .setDescription(promptBegin.desc);
   
const embedAvatar = new MessageEmbed()
    .setColor('#ffcb05')
    .setTitle(promptAvatar.title)
    .setDescription(promptAvatar.desc);

const embedStarter = new MessageEmbed()
    .setColor('#ffcb05')
    .setTitle(promptStarter.title)
    .setDescription(promptStarter.desc);
    
const embedRules = new MessageEmbed()
    .setColor('#ffcb05')
    .setDescription(promptRules.desc);

const embedConfirm = new MessageEmbed()
    .setColor('#ffcb05')
    .setDescription(promptComplete.desc);

module.exports = {
    embeds: {
        embedBegin,
        embedAvatar,
        embedStarter,
        embedRules,
        embedConfirm
    }
};

