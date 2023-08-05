const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
    name: 'send-message',
    description: 'Make the bot send a message',
    options: [
        {
            name: 'channel',
            description: 'The channel to post the message in.',
            required: true,
            type: ApplicationCommandOptionType.Channel,
        },
        {
            name: 'message',
            description: 'The id of the message you wish the bot to post.',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    permissionsRequired: [],
    botPermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageMessages],
    devOnly: false,
    testOnly: false,
    deleted: false,

    callback: (client, interaction) => {
        try {
            const targetChannel = interaction.guild.channels.cache.get(interaction.options.get("channel").value);
            let targetMessage = undefined;
            try {
                targetMessage = interaction.channel.messages.cache.get(interaction.options.get("message").value);
            } catch (error) {
                
            }
            targetChannel.send(targetMessage.content);
            targetMessage.delete();
            interaction.reply(`Message posted in <#${targetChannel.id}>!`)
            setTimeout(() => {
                interaction.deleteReply();
            }, "5000");
              
        } catch (error) {
            console.log(`An error orcurred during execution of /message. Error: ${error}. Error likely orccurred due to the message being older than the bot. `);
            interaction.reply({
                content: "An error orcurred during execution of /message. This error likely orcurred due to message being older than bot session. Please post a newer message. This command must also be executed in same channel as the original message.",
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, "5000");
            return;
        }
    },
};