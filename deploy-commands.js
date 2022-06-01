const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, token } = require('./config.json');

var env = process.env.NODE_ENV || 'development';

const sets = new SlashCommandBuilder()
    .setName('sets')
    .setDescription('Sets the scream counter to a specific value')
    .addIntegerOption(option =>
        option.setName('value')
            .setDescription('Value you want to set the counter to')
            .setRequired(true))
            

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong! If it does not work tag me !'),
    new SlashCommandBuilder().setName('adds').setDescription('Adds one to the scream counter'),
    new SlashCommandBuilder().setName('resets').setDescription('Resets the scream counter'),
    sets
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put( Routes.applicationCommands(clientId), { body: commands },)
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
