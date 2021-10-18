const { MessageActionRow, MessageButton } = require('discord.js');

/** 
 *  Begin Registration button rows.
 */
const btnBeginRegistration = {
    button: new MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('btnBeginRegistration')
        .setLabel('Begin'),
    execute: async function (interaction, options, prompt) {
        if (!options.userMap.user) {
            options.userMap.set(options.user, { 'id': options.user });
            console.log('row interaction: ' + interaction);
            await interaction.reply(prompt);
        } else {
            await interaction.reply(prompt);
        }
    }
}

var rowBeginRegistration = new MessageActionRow()
    .addComponents( btnBeginRegistration.button );

/** 
 *  Avatar Selection button rows.
 */
 const btnAvatar1 = {
     button: new MessageButton()
         .setCustomId('btnAvatar1')
         .setStyle('PRIMARY')
         .setEmoji({
             "id": "898633695748046848",
         }),
    execute: async function (interaction, userMap) {
        if (!userMap.get(interaction.user.id).avatar) {
            await interaction.reply(this.prompt);
        } else {
            await interaction.reply({embeds: [embeds.embedBegin], components: [rowBeginRegistration.data.buttons]});
        }
        userMap.get(interaction.user.id).avatar = 'avatar1';
    }
 }
 
 const btnAvatar2 = {
     button: new MessageButton()
         .setCustomId('btnAvatar2')
         .setStyle('PRIMARY')
         .setEmoji({
             "id": "898633695605444658",
         }),
    execute: async function (interaction, userMap) {
        if (!userMap.get(interaction.user.id).avatar) {
            await interaction.reply(this.prompt);
        } else {
            await interaction.reply({embeds: [embeds.embedBegin], components: [rowBeginRegistration.data.buttons]});
        }
        userMap.get(interaction.user.id).avatar = 'avatar2';
    }
 }
 
 var rowSelectAvatar = new MessageActionRow()
     .addComponents( btnAvatar1.button, btnAvatar2.button );


/** 
 *  Starter Selection button rows.
 */
 const btnStarter1 = {
    button: new MessageButton()
        .setCustomId('btnStarter1')
        .setStyle('PRIMARY')
        .setEmoji({
            "id": "899008800806273164",
        })
}

const btnStarter2 = {
    button: new MessageButton()
        .setCustomId('btnStarter2')
        .setStyle('PRIMARY')
        .setEmoji({
            "id": "899008800785317998",
        })
}


const btnStarter3 = {
    button: new MessageButton()
        .setCustomId('btnStarter3')
        .setStyle('PRIMARY')
        .setEmoji({
            "id": "899008800831442944",
        })
}

var rowSelectStarter = new MessageActionRow()
    .addComponents( btnStarter1.button, btnStarter2.button, btnStarter3.button );

/** 
 *  Rules button rows.
 */
 const btnRules = {
     button: new MessageButton()
         .setCustomId('btnRules')
         .setStyle('PRIMARY')
         .setEmoji({
             "id": "899008800806273164",
         }),
     async execute(interaction, options) {
         await interaction.reply({
             content: "You have selected the following settings: " + JSON.stringify(options.user),
             components: options.components
         });
     }
 }
 
 var rowConfirmRules = new MessageActionRow()
     .addComponents( btnRules.button );

/** 
 *  Confirm Registration button rows.
 */
 const btnConfirmReg = {
    button: new MessageButton()
        .setCustomId('btnConfirmReg')
        .setStyle('PRIMARY')
        .setLabel('Confirm')
}

var rowConfirmReg = new MessageActionRow()
    .addComponents( btnConfirmReg.button );

/**
 * export all rows
 */
module.exports = {
    rowBeginRegistration: {
        data: {
            name: 'rowBeginRegistration',
            buttons: rowBeginRegistration
        },
        buttons: {
            btnBeginRegistration: btnBeginRegistration
        }
    },
    rowSelectAvatar: {
        data: {
            name: 'rowSelectAvatar',
            buttons: rowSelectAvatar
        },
        buttons: {
            btnAvatar1: btnAvatar2,
            btnAvatar2: btnAvatar2
        }
    },
    rowSelectStarter: {
        data: {
            name: 'rowSelectStarter',
            buttons: rowSelectStarter
        },
        buttons: {
            btnStarter1: btnStarter1,
            btnStarter2: btnStarter2,
            btnStarter3: btnStarter3
        }
    },
    rowConfirmRules: {
        data: {
            name: 'rowConfirmRules',
            buttons: rowConfirmRules
        },
        buttons: {
            btnRules: btnRules
        }
    },
    rowConfirmReg: {
        data: {
            name: 'rowConfirmReg',
            buttons: rowConfirmReg
        },
        buttons: {
            btnConfirmReg: btnConfirmReg
        }
    }
}