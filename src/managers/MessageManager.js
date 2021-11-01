class MessaageManager {

    // set initial interaction deets
    constructor (client) {
        this.client = client;
    }

    setInteraction(interaction) {
        this.interaction = interaction;
    }

    // set button interaction specific details
    setButtonDetails(){
        this.message = this.interaction.message.id;
        this.author = this.interaction.message.author.id;
        this.channel = this.interaction.message.channelId;
    }

    async replyMessage (message) {
    
        await this.interaction.reply(message);

    }

    async replyEphemeralMessage (message) {

        await this.interaction.reply({ ...message, ephemeral: true });

    }

    async updateMessage (message) {

        await this.interaction.update(message);
    
    }

    async editMessage (message) {

        await this.interaction.editReply(message);
    
    }
    
    
    async sendDirectMessage (member, message) {
        
        await member.send(message);
        
    }
    
    async sendLoadingMessage (member) {
        
        await member.send({ content: 'Please wait...' });
        
    }
    
    async deleteThisMessage () {

        this.client.channels.fetch(this.channel)
            .then((ch) => {
                ch.messages.fetch({
                    limit: 5
                }).then(messages => {
                    const msgs = messages.filter(m => m.author.id === this.author)
                    msgs.forEach(m => {
                        if(m.id === this.message){
                            m.delete();
                        }
                    })
                });
            })
    }

    // CONST EPHEMERAL ALERT MESSAGES
    async replyAlreadyInBattle () {
        await this.interaction.reply({ content: "Please exit your current battle before searching for another..." , ephemeral: true });
    }

    async replyNotYourBattle () {
        await this.interaction.reply({ content: "This is not your battle!", ephemeral: true });
    }

}

module.exports = MessaageManager;