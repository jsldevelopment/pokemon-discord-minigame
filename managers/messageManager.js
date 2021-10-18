const { messageMap } = require('../messages/messages.js');
const buttonMap = require('../messages/buttons.js');

const messageManager = {

   onButtonPress: async function(interaction, buttonId, options) {
        await buttonMap[buttonId]
            .execute(options)
            .then(async (res) => {
                if (res.update) return interaction.update(messageMap[res.update].message);
                if (res.send) return interaction.reply(messageMap[res.send].message);
                if (res.complete) {
                    return  interaction.channel.messages.fetch( { limit: Object.keys(messageMap).length } )
                        .then ( messages => {
                            messages.forEach( msg => {
                                msg.delete();
                            })
                        });
                    }
                });
            },

    sendPrivateMessage: async function(member, message) {
	    await member.send( messageMap[message].message );
    }

}

module.exports = messageManager;