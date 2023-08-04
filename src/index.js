
const { Client, IntentsBitField, SlashCommandBuilder } = require('discord.js');
const embed = require('./modules/embeds.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,

    ],
});

// Load Config
const CONFIG = require('./config/config.json');
var GUILD = null
var INFO_CHANNEL = null
var JOIN_LEAVE_CHANNEL = null

client.login(CONFIG["TOKEN"])

client.on('ready', (c) => {
    GUILD = client.guilds.cache.get(CONFIG["GUILD_ID"])
    INFO_CHANNEL = client.channels.cache.get(CONFIG["bot_info_channel_id"])
    JOIN_LEAVE_CHANNEL = client.channels.cache.get(CONFIG["join_leave_channel_id"])
    INFO_CHANNEL.send({ embeds: [embed.infoEmbed(`${c.user.tag} is now online at ${new Date().toISOString()}`)] })
})

client.on('guildMemberAdd', member => {
    member.send("Welcome"); 
    JOIN_LEAVE_CHANNEL.send({ embeds: [embed.joinEmbed(member["user"])] })
});

client.on('guildMemberRemove', member => {
    JOIN_LEAVE_CHANNEL.send({ embeds: [embed.leaveEmbed(member["user"])] })
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return ;

    if (interaction.commandName === 'ping') {
        try {
            interaction.reply('Pong!')
        } catch (error) {
            console.log(`There was an error executing /ping. Error: ${error}.`);
        }
    }
    else if (interaction.commandName === 'pin') {
        try {
            const pinned = interaction.options.get("pinned").value;
            const message_id = interaction.options.get("message-id").value;
            try {
                if (pinned) {
                    interaction.channel.messages.cache.get(message_id).pin( {reason: `Pinned by ${interaction.user.tag} using the /pin command`} );
                    interaction.reply("Message was pinned");
                } else {
                    interaction.channel.messages.cache.get(message_id).unpin( {reason: `Unpinned by ${interaction.user.tag} using the /pin command`} );
                    interaction.reply("Message was unpinned");
                }
        
                setTimeout(() => {
                    interaction.deleteReply();
                  }, "1000");
            } catch (error) {
                console.log(`There was an error executing /pin on ${message_id}. Error was likely caused by user trying to pin command older than bot session. Messages older than the bots current session cannot be pinned/unpinned by bot!`);
                interaction.reply("This message cannot be pinned/unpinned by me! Message is too old.");
                setTimeout(() => {
                    interaction.deleteReply();
                  }, "5000");
            }
        } catch (error) {
            console.log(`There was an error executing /pin on ${message_id}. Error: ${error}.`);
        }
    }
})








