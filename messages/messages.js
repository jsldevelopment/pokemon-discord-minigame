const { embeds } = require ('../util/prompts.js');
const { buttonRows } = require('./buttonRows.js');

const messageMap = {
    welcomeMessage: {
        message: { 
            embeds: [embeds.embedBegin], 
            components: [buttonRows.rowBeginRegistration.data.buttons]
        }
    },
    selectAvatarMessage: {
        message: { 
            embeds: [embeds.embedAvatar],
            components: [buttonRows.rowSelectAvatar.data.buttons],
        }
    },
    selectStarterMessage: {
        message: { 
            embeds: [embeds.embedStarter], 
            components: [buttonRows.rowSelectStarter.data.buttons],
        }
    },
    confirmRulesMessage: {
        message: { 
            embeds: [embeds.embedRules], 
            components: [buttonRows.rowConfirmRules.data.buttons],
        }
    },
    confirmRegistrationMessage: {
        message: { 
            embeds: [embeds.embedConfirm], 
            components: [buttonRows.rowConfirmReg.data.buttons],
        }
    },
    confirmation: {
        message: { 
            content: "Test"
        }
    }
}

exports.messageMap = messageMap;