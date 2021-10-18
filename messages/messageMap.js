const { EmbedAssertions } = require('@discordjs/builders');
const { prompts, embeds } = require ('./messagePrompts.js');
const { rowBeginRegistration, rowSelectAvatar, rowSelectStarter, rowConfirmRules, rowConfirmReg } = require('./messageRows.js');

const messageMap = {
    welcomeMessage: {
        message: embeds.embedBegin,
        buttons: rowBeginRegistration.data.buttons,
        prompt: { 
            embeds: this.message, 
            components: this.buttons
        }
    },
    btnBeginRegistration: {
        buttons: rowBeginRegistration.buttons,
        prompt: { content: prompts.promptAvatar, components: [rowSelectAvatar.data.buttons] },
        execute: function (interaction, options) {
            console.log('map interaction: ' + interaction);
            this.buttons[options.btnId].execute(interaction, options, this.prompt);
        }
    },
    btnAvatar1: {
        buttons: rowSelectAvatar.buttons,
        prompt: { content: prompts.promptAvatar, components: [rowSelectAvatar.data.buttons] },
        execute: function (interaction, options) {
            this.buttons[options.btnId].execute(interaction, options);
        }
    },
    btnAvatar2: {
        buttons: rowSelectAvatar.buttons,
        prompt: { content: prompts.promptAvatar, components: [rowSelectAvatar.data.buttons] },
        execute: function (interaction, options) {
            this.buttons[options.btnId].execute(interaction, options);
        }
    },
    // btnStarter1: {
    //     prompt: { content: prompts.promptRules, components: [rowConfirmRules.data.buttons] },
    //     execute: async function (interaction, userMap) {
    //         if (!userMap.get(interaction.user.id).starter) {
    //             await interaction.reply(this.prompt);
    //         } else {
    //             await interaction.reply({ content: prompts.promptStarter, components: [rowSelectStarter.data.buttons] });
    //         }
    //         userMap.get(interaction.user.id).starter = 'starter1';
    //     }
    // },
    // btnStarter2: {
    //     prompt: { content: prompts.promptRules, components: [rowConfirmRules.data.buttons] },
    //     execute: async function (interaction, userMap) {
    //         if (!userMap.get(interaction.user.id).starter) {
    //             await interaction.reply(this.prompt);
    //         } else {
    //             await interaction.reply({ content: prompts.promptStarter, components: [rowSelectStarter.data.buttons] });
    //         }
    //         userMap.get(interaction.user.id).starter = 'starter2';
    //     }
    // },
    // btnStarter3: {
    //     prompt: { content: prompts.promptRules, components: [rowConfirmRules.data.buttons] },
    //     execute: async function (interaction, userMap) {
    //         if (!userMap.get(interaction.user.id).starter) {
    //             await interaction.reply(this.prompt);
    //         } else {
    //             await interaction.reply({ content: prompts.promptStarter, components: [rowSelectStarter.data.buttons] });
    //         }
    //         userMap.get(interaction.user.id).starter = 'starter3';
    //     }
    // },
    // btnRules: {
    //     prompt: { content: prompts.promptComplete, components: [rowConfirmReg.data.buttons] },
    //     execute: async function (interaction, userMap) {
    //         if (!userMap.get(interaction.user.id).rulesAcknowledged) {
    //             await interaction.reply(this.prompt);
    //         } else {
    //             await interaction.reply({ content: prompts.promptRules, components: [rowConfirmRules.data.buttons] });
    //         }
    //         userMap.get(interaction.user.id).rulesAcknowledged = true;
    //     }
    // },
    // btnConfirmReg: {
    //     prompt: { content: "successs" },
    //     execute: async function (interaction) {
    //         await interaction.reply(this.prompt);
    //     }
    // }
}

exports.messageMap = messageMap;