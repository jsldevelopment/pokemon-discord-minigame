const messageHandler = {

    replyMessage: async function (interaction, message) {
    
        return interaction.reply(message);

    },

    replyEphemeralMessage: async function(interaction, message) {

        await interaction.reply({ ...message, ephemeral: true });

    },

    updateMessage: async function (interaction, message) {

        await interaction.update(message);
    
    },

    editMessage: async function (interaction, message) {

        await interaction.editReply(message);
    
    },

    showLoading: async function (interaction) {

        await interaction.editReply({ content: "Please wait while we gather all the data...", embeds: [], components: [] });

    },

    deleteMessage: async function (interaction, number) {
        
        return  interaction.channel.messages.fetch( { limit: number } )
            .then ( messages => {
                messages.forEach( msg => {
                    msg.delete();
                })
            });

    },

    sendDirectMessage: async function(member, message) {

        await member.send(message);

    },

    sendLoadingMessage: async function(member) {

        await member.send({ content: 'Please wait...' });

    }

}

module.exports = messageHandler;