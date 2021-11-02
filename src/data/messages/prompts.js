const { MessageAttachment } = require('discord.js');

const promptSample = {
    title: "Sample Title Prompt",
    desc: "Sample Prompt Description"
}


const embedSample = {
	color: 0xffcb05,
	title: promptSample.title,
	url: 'https://discord.js.org',
	description: promptSample.desc,
	timestamp: new Date()
};

module.exports = {
    embeds: {
        embedSample
    }
};
