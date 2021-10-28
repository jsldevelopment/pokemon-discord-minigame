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
	return {
		color: 0x0099ff,
		title: `${profile.username}`,
		url: 'https://discord.js.org',
		thumbnail: {
			url: 'attachment://pokeball.png',
		},
		fields: [
			{
				name: "Captured: ",
				value: profile.pkmnCaught.toString()
			},
			{
				name: "Seen: ",
				value: profile.pkmnSeen.toString()
			},
			{
				name: "Badges: ",
				value: profile.badges.toString()
			},
			{
				name: "Money: ",
				value: profile.money.toString()
			}
		],
		timestamp: new Date(),
		footer: {
			text: "Tap the title bar to visit our website.",
			icon_url: 'attachment://pokeball.png',
		}
	}
}

// create prompt for pokemon
const pokemonEmbed = (pokemon) => {
	return {
		color: 0x0099ff,
		title: `${pokemon.name}`,
		thumbnail: {
			url: 'attachment://pokeball.png',
		},
		fields: [
			{
				name: "Ability: ",
				value: pokemon.ability.name
			},
			{
				name: "Gender: ",
				value: pokemon.gender ? "Male" : "Female"
			},
			{
				name: "Nature: ",
				value: pokemon.nature
			}
		],
		timestamp: new Date(),
		footer: {
			icon_url: 'attachment://pokeball.png',
		}
	}
}

module.exports = {
    embeds: {
        embedBegin,
        embedAvatar,
        embedStarter,
        embedRules,
        embedConfirm,
        profileEmbed,
		pokemonEmbed
    }
};

