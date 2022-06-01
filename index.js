const winston = require('winston');
let http = require('http');
let fs = require('fs');
const { Client, Intents } = require('discord.js');
const { token } = process.env.DISCORD_TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
var url = require('url');

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

screamcount = 0

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const { commandName } = interaction;
	if (commandName === 'ping') {
		logger.info('Asked for a ping command')
		await interaction.reply('Pong!');
	} else if (commandName === 'adds') {
		screamcount = screamcount + 1
		logger.info('Current scream count : ' + screamcount)
		await interaction.reply('Scream added. Current scream count : ' + screamcount)
	} else if (commandName == 'resets') {
		logger.info('Asked for the resets command')
		screamcount = 0
		await interaction.reply('Scream added. Current scream count : ' + screamcount)
	} else if (commandName === 'sets') {
		logger.info('Asked for the sets command')
		screamcount = interaction.options.getInteger("value")
		await interaction.reply('Scream counter set ! Current scream count : ' + screamcount)
	}
});

client.login(token);

// EXPRESS CONFIG
const express = require('express')
const app = express()
const port = 8080
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
	res.send(`<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<style>
		@font-face{font-family:"kontikialohajf-regular"; src:url("https://kscreams.haysberg.io/kontiki.ttf") format("woff"),url("https://kscreams.haysberg.io/kontiki.ttf") format("opentype"),url("https://kscreams.haysberg.io/kontiki.ttf") format("truetype");}
		</style>
		<title>Kayla's scream counter</title>
	</head>
	<body style="background-color:transparent">
		<p style="font-size:300px;">${screamcount}</p>
	</body>
	</html>`)
})

app.listen(port, () => {
	console.log(`KAYLA SCREAM COUNTER LISTENING ON PORT ${port}`)
})