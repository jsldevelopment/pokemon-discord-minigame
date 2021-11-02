const { embeds } = require('./prompts.js');
const { buttons } = require('./buttons.js');


const messages = {

    msgSample: {
        embeds: [embeds.embedSample],
        components: [buttons.rowSample]
    }

}

module.exports = messages;