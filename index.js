const winston = require('winston');
const { Client, Intents } = require('discord.js');
const { token } = process.env.DISCORD_TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		new winston.transports.File({ filename: 'kaylascream.log' }),
	],
});

logger.add(new winston.transports.Console({
	format: winston.format.simple(),
}));

client.once('ready', () => {
	logger.info('🚀 kaylascream is online !');
	client.user.setActivity('SCREAM COUNT', { type: 'COMPETING' });
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const { commandName } = interaction;
	if (commandName === 'ping') {
		logger.info('Asked for a ping command')
		await interaction.reply('Pong!');
	} else if (commandName === 'spoutdl') {
		logger.info('Asked for the spoutdl command')
		var id = crypto.randomBytes(20).toString('hex');
		logger.info('Generated ID : ' + id)
		await spoutdl(interaction, id);
	} else if (commandName == 'setup') {
		logger.info('Asked for the setup command')
	}
});

client.login(token);
