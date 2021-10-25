const { MessageEmbed } = require('discord.js');

const promptBegin = {
    title: "Welcome to the world of\n Pokemon Discord!",
    desc: "In order to register you as a new user, we need to ask some simple questions! \n Tap the 'Begin' button to start!"
}

const promptAvatar = {
    title: "Who are you again?",
    desc: "Please choose the button that corresponds to the avatar you identify with the most!"
}

const promptStarter = {
    title: "Select your starter -",
    desc:"Please choose one of the following pokemon partners to accompany you on your grand adventure."
}

const promptRules = {
    title: "Press here to agree to the rules and conditions.",
    desc: "In order to get you registered for our game, we need to you to answer a few basic questions about yourself."
}

const promptComplete = {
    title: "Registration complete!",
    desc: "In order to get you registered for our game, we need to you to answer a few basic questions about yourself."
}

const embedBegin = {
	color: 0xffcb05,
	title: promptBegin.title,
	url: 'https://discord.js.org',
	description: promptBegin.desc,
	thumbnail: {
		url: 'attachment://pokeball.png',
	},
	timestamp: new Date(),
	footer: {
		text: "Tap the title bar to visit our website.",
		icon_url: 'attachment://pokeball.png',
	},
};

const embedAvatar = {
	color: 0xffcb05,
	title: promptAvatar.title,
	url: 'https://discord.js.org',
	description: promptAvatar.desc,
	thumbnail: {
		url: 'attachment://pokeball.png',
	},
    image: {
        url: 'attachment://avatar-selection.png'
    },
	timestamp: new Date(),
	footer: {
		text: "Tap the title bar to visit our website.",
		icon_url: 'attachment://pokeball.png',
	},
};

const embedStarter = {
	color: 0xffcb05,
	title: promptStarter.title,
	url: 'https://discord.js.org',
	description: promptStarter.desc,
	thumbnail: {
		url: 'attachment://pokeball.png',
	},
    image: {
        url: 'attachment://starter-selection.png'
    },
	timestamp: new Date(),
	footer: {
		text: "Tap the title bar to visit our website.",
		icon_url: 'attachment://pokeball.png',
	},
};
    
const embedRules = {
	color: 0xffcb05,
	title: promptComplete.title,
	url: 'https://discord.js.org',
	description: promptComplete.desc,
	thumbnail: {
		url: 'attachment://pokeball.png',
	},
	timestamp: new Date(),
	footer: {
		text: "Tap the title bar to visit our website.",
		icon_url: 'attachment://pokeball.png',
	},
};

const embedConfirm = {
	color: 0xffcb05,
	title: promptComplete.title,
	url: 'https://discord.js.org',
	description: promptComplete.desc,
	thumbnail: {
		url: 'attachment://pokeball.png',
	},
	timestamp: new Date(),
	footer: {
		text: "Tap the title bar to visit our website.",
		icon_url: 'attachment://pokeball.png',
	},
};

// create prompt for profile
const profileEmbed = (profile) => {
    return new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Profile:`)
        // .setURL('https://discord.js.org/')
        // .setAuthor('Some name', 'https://i.imgur.com/AfFp7pu.png', 'https://discord.js.org')
        // .setDescription('Some description here')
        // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields(
            { name: 'Info', value: profile }
        )
        // .addField('Inline field title', 'Some value here', true)
        // .setImage('https://i.imgur.com/AfFp7pu.png')
        // .setTimestamp()
        // .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');
}

module.exports = {
    embeds: {
        embedBegin,
        embedAvatar,
        embedStarter,
        embedRules,
        embedConfirm,
        profileEmbed
    }
};

