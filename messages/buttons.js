const { MessageButton } = require('discord.js');

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
                return { send: "selectAvatarMessage" }
            }
            return { update: "welcomeMessage" }
        }
    },

    /** 
     *  Avatar Selection button rows.
     */
    btnAvatar1: {
        button: new MessageButton()
            .setCustomId('btnAvatar1')
            .setStyle('PRIMARY')
            .setLabel('1'),
        execute: async function (options) {
            if (!options.userMap.get(options.user).avatar) {
                options.userMap.set(options.user, { 
                    ...options.userMap.get(options.user), 
                    avatar: 'avatar1' 
                });
                return { send: "selectStarterMessage" }
            }
            options.userMap.get(options.user).avatar = 'avatar1';
            return { update: "selectAvatarMessage" }
        }
    },
    
    btnAvatar2: {
        button: new MessageButton()
            .setCustomId('btnAvatar2')
            .setStyle('PRIMARY')
            .setLabel('2'),
        execute: async function (options) {
            if (!options.userMap.get(options.user).avatar) {
                options.userMap.set(options.user, { 
                    ...options.userMap.get(options.user), 
                    avatar: 'avatar2' 
                });
                return { send: "selectStarterMessage" }
            }
            options.userMap.get(options.user).avatar = 'avatar2';
            return { update: "selectAvatarMessage" }
        }
    },
    
    /** 
     *  Starter Selection button rows.
     */
    btnStarter1: {
        button: new MessageButton()
            .setCustomId('btnStarter1')
            .setStyle('PRIMARY')
            .setLabel('Bulbasaur'),
        execute: async function (options) {
            if (!options.userMap.get(options.user).starter) {
                options.userMap.set(options.user, { 
                    ...options.userMap.get(options.user), 
                    starter: 'starter1' 
                });
                return { send: "confirmRulesMessage" }
            }
            options.userMap.get(options.user).starter = 'starter1';
            return { update: "selectStarterMessage" }
        }
    },

    btnStarter2: {
        button: new MessageButton()
            .setCustomId('btnStarter2')
            .setStyle('PRIMARY')
            .setLabel('Charmander'),
        execute: async function (options) {
            if (!options.userMap.get(options.user).starter) {
                options.userMap.set(options.user, { 
                    ...options.userMap.get(options.user), 
                    starter: 'starter2' 
                });
                return { send: "confirmRulesMessage" }
            }
            options.userMap.get(options.user).starter = 'starter2';
            return { update: "selectStarterMessage" }
        }
    },

    btnStarter3: {
        button: new MessageButton()
            .setCustomId('btnStarter3')
            .setStyle('PRIMARY')
            .setLabel('Squirtle'),
        execute: async function (options) {
            if (!options.userMap.get(options.user).starter) {
                options.userMap.set(options.user, { 
                    ...options.userMap.get(options.user), 
                    starter: 'starter3' 
                });
                return { send: "confirmRulesMessage" }
            }
            options.userMap.get(options.user).starter = 'starter3';
            return { update: "selectStarterMessage" }
        }
    },

    /** 
     *  Rules button rows.
     */
    btnRules: {
        button: new MessageButton()
            .setCustomId('btnRules')
            .setStyle('PRIMARY')
            .setLabel('I Agree'),
        execute: async function (options) {
            if (!options.userMap.get(options.user).rulesAcknowledged) {
                options.userMap.set(options.user, { 
                    ...options.userMap.get(options.user), 
                    rulesAcknowledged: true
                });
                return { send: "confirmRegistrationMessage" }
            }
            return { update: "confirmRulesMessage" }
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
            if (!options.userMap.get(options.user).regComplete) {
                options.userMap.set(options.user, { 
                    ...options.userMap.get(options.user), 
                    regComplete: true
                });
                return { complete: options.userMap.get(options.user) }
            }
        }
    }
}

module.exports = buttonMap;