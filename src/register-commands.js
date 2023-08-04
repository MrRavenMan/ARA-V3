const { REST, Routes, ApplicationCommandOptionType } = require("discord.js")


// Load Config
const CONFIG = require('./config/config.json');

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!'
    },
    {
        name: 'pin',
        description: 'Pins/unpins messages with the corresponding id from the same channel as the command is executed in',
        options: [
            {
                name: 'message-id',
                description: 'The id of the message you wish to pin/unpin',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'pinned',
                description: 'Set true if you wish to pin message. Otherwise the message will be unpinned.',
                type: ApplicationCommandOptionType.Boolean,
                required: true,
            },
        ]
    }
];

const rest = new REST({ version: '10' }).setToken(CONFIG["TOKEN"]);

(async () => {
    try {
        console.log('Registering slash commands...')
        await rest.put(
            Routes.applicationGuildCommands(CONFIG["BOT_ID"], CONFIG["GUILD_ID"]),
            { body: commands }
        )
        console.log('Slash commands were registered successfully')
    } catch (error) {
        console.log(`There was an error: ${error}`)
    }
})();