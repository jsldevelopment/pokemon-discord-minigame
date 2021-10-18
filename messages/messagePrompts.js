const { MessageEmbed } = require('discord.js');

const promptBeginTitle = "Welcome to the world of Pokemon!";
const promptBeginDesc = "In order to get you registered for our game, we need to you to answer a few basic questions about yourself. \n"
    + "Please step through the following prompts- and don't worry! Nothing is set in stone... (except your starter).";
const promptAvatarTitle = "Select an avatar -";
const promptAvatarDesc = "Please select the avatar you feel most suits the type of trainer you see yourself as.";
const promptStarterTitle  = "Select your starter -";
const promptStartDesc  = "Please choose one of the following pokemon partners to accompany you on your grand adventure.";
const promptRules = "Press here to agree to the rules and conditions.";
const promptComplete = "Registration complete!";

const embedBegin = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(promptBeginTitle)
    .setDescription(promptBeginDesc);
   
const embedAvatar = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(promptAvatarTitle)
    .setDescription(promptAvatarDesc);

const embedStarter = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(promptStarterTitle)
    .setDescription(promptStartDesc);
    
const embedRules = new MessageEmbed()
    .setColor('#0099ff')
    .setDescription(promptRules);

    
const embedConfirm = new MessageEmbed()
    .setColor('#0099ff')
    .setDescription(promptComplete);

module.exports = {
    embeds: {
        embedBegin,
        embedAvatar,
        embedStarter,
        embedRules,
        embedConfirm
    },
    // promptFunctions: {
    //     getPromptComplete: (userObj) => {
    //         return promptComplete + `: ${userObj}`
    //     }
    // }
};

