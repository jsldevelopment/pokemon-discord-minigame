class MessaageManager {

    // set initial interaction deets
    constructor (client) {
        this.client = client;
    }

    setInteraction(interaction) {
        this.interaction = interaction;
    }

    setButtonDetails(){
        this.message = this.interaction.message.id;
        this.author = this.interaction.message.author.id;
        this.channel = this.interaction.message.channelId;
    }

    setCommandDetails(){
        this.channel = this.interaction.channelId;
    }

    // general messaging
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

}

module.exports = MessaageManager;