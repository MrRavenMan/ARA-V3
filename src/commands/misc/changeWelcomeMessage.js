const CONFIG = require('../../config/config.json');
const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
    name: 'set-welcome-message',
    description: 'Change the welcome message the bot DMs to new members.',
    options: [
        {
            name: 'message',
            description: 'The id of the message you wish the bot to use as a welocme message.',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    botPermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageMessages],
    devOnly: false,
    testOnly: false,
    deleted: true,

    callback: (client, interaction) => {
        try {
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
                return;
            }
    },
};