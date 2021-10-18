const { prompts, embeds } = require ('./messagePrompts.js');
const { buttonRows } = require('./messageRows.js');

const messageMap = {
    welcomeMessage: {
        message: { 
            embeds: [embeds.embedBegin], 
            components: [buttonRows.rowBeginRegistration.data.buttons]
        }
    },
    selectAvatarMessage: {
        message: { 
            content: prompts.promptAvatar,
            components: [buttonRows.rowSelectAvatar.data.buttons],
        }
    },
    selectStarterMessage: {
        message: { 
            content: prompts.promptStarter,
            components: [buttonRows.rowSelectStarter.data.buttons],
        }
    },
    confirmRulesMessage: {
        message: { 
            content: prompts.promptRules,
            components: [buttonRows.rowConfirmRules.data.buttons],
        }
    },
    confirmRegistrationMessage: {
        message: { 
            content: prompts.promptComplete,
            components: [buttonRows.rowConfirmReg.data.buttons],
        }
    },
    confirmation: {
        message: { 
            content: prompts.promptComplete
        }
    }
}

exports.messageMap = messageMap;