const { MessageActionRow, MessageButton } = require('discord.js');

/** 
 *  Begin Registration button rows.
 */
const buttonMap = {

    /**
     *  Button registration rows
     */
    btnBeginRegistration: {
        button: new MessageButton()
            .setStyle('PRIMARY')
            .setCustomId('btnBeginRegistration')
            .setLabel('Begin'),
        execute: async function (options) {
            if (!options.userMap.get(options.user)) {
                // reg a new empty user
                options.userMap.set(options.user, { });
                return ["send", "selectAvatarMessage"];
            }
            return ["update", "welcomeMessage"];
        }
    },

    /** 
     *  Avatar Selection button rows.
     */
    btnAvatar1: {
        button: new MessageButton()
            .setCustomId('btnAvatar1')
            .setStyle('PRIMARY')
            .setEmoji({
                "id": "898633695748046848",
            }),
        execute: async function (options) {
            if (!options.userMap.get(options.user).avatar) {
                options.userMap.set(options.user, { 
                    ...options.userMap.get(options.user), 
                    avatar: 'avatar1' 
                });
                return ["send", "selectStarterMessage"];
            }
            options.userMap.get(options.user).avatar = 'avatar1';
            return ["update", "selectAvatarMessage"];
        }
    },
    
    btnAvatar2: {
        button: new MessageButton()
            .setCustomId('btnAvatar2')
            .setStyle('PRIMARY')
            .setEmoji({
                "id": "898633695605444658",
            }),
        execute: async function (options) {
            if (!options.userMap.get(options.user).avatar) {
                options.userMap.set(options.user, { 
                    ...options.userMap.get(options.user), 
                    avatar: 'avatar2' 
                });
                return ["send", "selectStarterMessage"];
            }
            options.userMap.get(options.user).avatar = 'avatar2';
            return ["update", "selectAvatarMessage"];
        }
    },
    
    /** 
     *  Starter Selection button rows.
     */
    btnStarter1: {
        button: new MessageButton()
            .setCustomId('btnStarter1')
            .setStyle('PRIMARY')
            .setEmoji({
                "id": "899008800806273164",
            }),
        execute: async function (options) {
            if (!options.userMap.get(options.user).starter) {
                options.userMap.set(options.user, { 
                    ...options.userMap.get(options.user), 
                    starter: 'starter1' 
                });
                return ["send", "confirmRulesMessage"];
            }
            options.userMap.get(options.user).avatar = 'starter1';
            return ["update", "selectStarterMessage"];
        }
    },

    btnStarter2: {
        button: new MessageButton()
            .setCustomId('btnStarter2')
            .setStyle('PRIMARY')
            .setEmoji({
                "id": "899008800785317998",
            }),
        execute: async function (options) {
            if (!options.userMap.get(options.user).starter) {
                options.userMap.set(options.user, { 
                    ...options.userMap.get(options.user), 
                    starter: 'starter2' 
                });
                return ["send", "confirmRulesMessage"];
            }
            options.userMap.get(options.user).avatar = 'starter2';
            return ["update", "selectStarterMessage"];
        }
    },

    btnStarter3: {
        button: new MessageButton()
            .setCustomId('btnStarter3')
            .setStyle('PRIMARY')
            .setEmoji({
                "id": "899008800831442944",
            }),
        execute: async function (options) {
            if (!options.userMap.get(options.user).starter) {
                options.userMap.set(options.user, { 
                    ...options.userMap.get(options.user), 
                    starter: 'starter3' 
                });
                return ["send", "confirmRulesMessage"];
            }
            options.userMap.get(options.user).avatar = 'starter3';
            return ["update", "selectStarterMessage"];
        }
    },

    /** 
     *  Rules button rows.
     */
    btnRules: {
        button: new MessageButton()
            .setCustomId('btnRules')
            .setStyle('PRIMARY')
            .setEmoji({ "id": "899008800806273164" }),
        execute: async function (options) {
            if (!options.userMap.get(options.user).rulesAcknowledged) {
                options.userMap.set(options.user, { 
                    ...options.userMap.get(options.user), 
                    rulesAcknowledged: true
                });
                return ["send", "confirmRegistrationMessage"];
            }
            return ["update", "confirmRulesMessage"];
        }
    },
    
    /** 
     *  Confirm Registration button rows.
     */
    btnConfirmReg: {
        button: new MessageButton()
            .setCustomId('btnConfirmReg')
            .setStyle('PRIMARY')
            .setLabel('Confirm'),
        execute: async function (options) {
            if (!options.userMap.get(options.user).rulesAcknowledged) {
                options.userMap.set(options.user, { 
                    ...options.userMap.get(options.user), 
                    rulesAcknowledged: true
                });
                return ["send", "confirmation"];
            }
            return ["update", "confirmRegistrationMessage"];
        }
    }
}


var rowBeginRegistration = new MessageActionRow()
.addComponents( buttonMap.btnBeginRegistration.button );

var rowConfirmReg = new MessageActionRow()
.addComponents( buttonMap.btnConfirmReg.button );

var rowConfirmRules = new MessageActionRow()
.addComponents( buttonMap.btnRules.button );

var rowSelectStarter = new MessageActionRow()
.addComponents( buttonMap.btnStarter1.button, buttonMap.btnStarter2.button, buttonMap.btnStarter3.button );

var rowSelectAvatar = new MessageActionRow()
.addComponents( buttonMap.btnAvatar1.button, buttonMap.btnAvatar2.button );


/**
 * export all rows
 */
exports.buttonRows = {
    rowBeginRegistration: {
        data: {
            name: 'rowBeginRegistration',
            buttons: rowBeginRegistration
        },
        buttons: {
            btnBeginRegistration: buttonMap.btnBeginRegistration
        }
    },
    rowSelectAvatar: {
        data: {
            name: 'rowSelectAvatar',
            buttons: rowSelectAvatar
        },
        buttons: {
            btnAvatar1: buttonMap.btnAvatar2,
            btnAvatar2: buttonMap.btnAvatar2
        }
    },
    rowSelectStarter: {
        data: {
            name: 'rowSelectStarter',
            buttons: rowSelectStarter
        },
        buttons: {
            btnStarter1: buttonMap.btnStarter1,
            btnStarter2: buttonMap.btnStarter2,
            btnStarter3: buttonMap.btnStarter3
        }
    },
    rowConfirmRules: {
        data: {
            name: 'rowConfirmRules',
            buttons: rowConfirmRules
        },
        buttons: {
            btnRules: buttonMap.btnRules
        }
    },
    rowConfirmReg: {
        data: {
            name: 'rowConfirmReg',
            buttons: buttonMap.rowConfirmReg
        },
        buttons: {
            btnConfirmReg: buttonMap.btnConfirmReg
        }
    }
}

exports.buttonMap = buttonMap;