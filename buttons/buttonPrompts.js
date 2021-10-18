const { MessageEmbed } = require('discord.js');

// const avatarTextPrompt = `Welcome to the world of Pokemon! I'll be your resident pokemon expert, Professor Yew. \n In the region of <REGION NAME>, many different kinds of pokemon inhabit vast and varied environemnts. \n It's your job as a pokemon trainer to capture and befriend these pokemon. \n Before we go any further, please select an avatar.`;
const promptBegin = "In order to get you registered for our game, we need to you to answer a few basic questions about yourself. \n"
    + "Please step through the following prompts- and don't worry! Nothing is set in stone... (except your starter).";
const promptAvatar = "Are you a male or female?";
const promptStarter = "Please select a starter!";
const promptRules = "Press here to agree to the rules and conditions.";
const promptComplete = "Registration complete!";

const embedBegin = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Welcome to the world of Pokemon!')
    .setURL('https://discord.js.org')
    .setDescription(promptBegin);

const embedAvatar = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Welcome to the world of Pokemon!')
    .setURL('https://discord.js.org')
    .setDescription(promptBegin);

module.exports = {
    prompts: {
        promptAvatar,
        promptStarter,
        promptRules,
        promptComplete
    },
    embeds: {
        embedBegin
    },
    promptFunctions: {
        getPromptComplete: (userObj) => {
            return promptComplete + `: ${userObj}`
        }
    }
};

