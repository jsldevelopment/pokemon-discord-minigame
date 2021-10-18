const { prompts, embeds } = require ('./buttonPrompts.js');
const { rowBeginRegistration, rowSelectAvatar, rowSelectStarter, rowConfirmRules, rowConfirmReg } = require('./buttonRows.js');

const buttonMap = {
    btnBeginRegistration: {
        prompt: { content: prompts.promptAvatar, components: [rowSelectAvatar.data.buttons] },
        execute: async function (interaction, userMap) {
            if (!userMap.get(interaction.user.id)) {
                userMap.set(interaction.user.id, { 'id': interaction.user.id });
                await interaction.reply(this.prompt);
            } else {
                await interaction.reply({embeds: [embeds.embedBegin], components: [rowBeginRegistration.data.buttons]});
            }
        }
    },
    btnAvatar1: {
        prompt: { content: prompts.promptStarter, components: [rowSelectStarter.data.buttons] },
        execute: async function (interaction, userMap) {
            if (!userMap.get(interaction.user.id).avatar) {
                await interaction.reply(this.prompt);
            } else {
                await interaction.reply({embeds: [embeds.embedBegin], components: [rowBeginRegistration.data.buttons]});
            }
            userMap.get(interaction.user.id).avatar = 'avatar1';
        }
    },
    btnAvatar2: {
        prompt: { content: prompts.promptStarter, components: [rowSelectStarter.data.buttons] },
        execute: async function (interaction, userMap) {
            if (!userMap.get(interaction.user.id).avatar) {
                await interaction.reply(this.prompt);
            } else {
                await interaction.reply({embeds: [embeds.embedBegin], components: [rowBeginRegistration.data.buttons]});
            }
            userMap.get(interaction.user.id).avatar = 'avatar2';
        }
    },
    btnStarter1: {
        prompt: { content: prompts.promptRules, components: [rowConfirmRules.data.buttons] },
        execute: async function (interaction, userMap) {
            if (!userMap.get(interaction.user.id).starter) {
                await interaction.reply(this.prompt);
            } else {
                await interaction.reply({ content: prompts.promptStarter, components: [rowSelectStarter.data.buttons] });
            }
            userMap.get(interaction.user.id).starter = 'starter1';
        }
    },
    btnStarter2: {
        prompt: { content: prompts.promptRules, components: [rowConfirmRules.data.buttons] },
        execute: async function (interaction, userMap) {
            if (!userMap.get(interaction.user.id).starter) {
                await interaction.reply(this.prompt);
            } else {
                await interaction.reply({ content: prompts.promptStarter, components: [rowSelectStarter.data.buttons] });
            }
            userMap.get(interaction.user.id).starter = 'starter2';
        }
    },
    btnStarter3: {
        prompt: { content: prompts.promptRules, components: [rowConfirmRules.data.buttons] },
        execute: async function (interaction, userMap) {
            if (!userMap.get(interaction.user.id).starter) {
                await interaction.reply(this.prompt);
            } else {
                await interaction.reply({ content: prompts.promptStarter, components: [rowSelectStarter.data.buttons] });
            }
            userMap.get(interaction.user.id).starter = 'starter3';
        }
    },
    btnRules: {
        prompt: { content: prompts.promptComplete, components: [rowConfirmReg.data.buttons] },
        execute: async function (interaction, userMap) {
            if (!userMap.get(interaction.user.id).rulesAcknowledged) {
                await interaction.reply(this.prompt);
            } else {
                await interaction.reply({ content: prompts.promptRules, components: [rowConfirmRules.data.buttons] });
            }
            userMap.get(interaction.user.id).rulesAcknowledged = true;
        }
    },
    btnConfirmReg: {
        prompt: { content: "successs" },
        execute: async function (interaction, userMap) {
            await interaction.reply(prompt);
        }
    }
}

exports.buttonMap = buttonMap;