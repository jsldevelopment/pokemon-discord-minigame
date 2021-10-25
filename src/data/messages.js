const { embeds } = require('./prompts.js');
const { buttons } = require('./buttons.js');
const { MessageAttachment } = require('discord.js');


const messages = {

    msgWelcome: {
        embeds: [embeds.embedBegin],
        components: [buttons.rowRegister]
    },

    msgSelectAvatar: {
        embeds: [embeds.embedAvatar],
        components: [buttons.rowSelectAvatar]
    },

    msgSelectStarter: {
        embeds: [embeds.embedStarter],
        components: [buttons.rowSelectStarter]
    },

    msgConfirmRegistration: {
        embeds: [embeds.embedConfirm],
        components: [buttons.rowConfirmRegistration]
    },

    msgShowProfile: async function(profile) {
        return {
            embeds: [embeds.profileEmbed(profile)]
        }
    }

}

module.exports = messages;