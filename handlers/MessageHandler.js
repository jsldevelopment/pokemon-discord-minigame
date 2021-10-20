const messageHandler = {

    replyMessage: async function (interaction, message) {
    
        return interaction.reply(message);

    },

    updateMessage: async function (interaction, message) {

        await interaction.update(message);
    
    },

    deleteMessage: async function (interaction) {
        
        return  interaction.channel.messages.fetch( { limit: 1 } )
            .then ( messages => {
                messages.forEach( msg => {
                    msg.delete();
                })
            });

    },

    sendDirectMessage: async function(member, message) {

        await member.send(message);

    }
    
}

module.exports = messageHandler;