const CONFIG = require('../../config/config.json');
const path = require('path')
const fs = require('fs');
const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
    name: 'set-welcome-message',
    description: 'Change the welcome message the bot DMs to new members.',
    options: [
        {
            name: 'message',
            description: 'The id of the message you wish the bot to use as a welcome message.',
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
            let targetMessage = undefined;
            try {
                targetMessage = interaction.channel.messages.cache.get(interaction.options.get("message").value);
            } catch (error) {
                
            }

            const basePath = path.resolve(__dirname, '../..')
            const fileName = basePath + '/config/config.json';
            const file = require(fileName);
            file.welcomeMsg = targetMessage.content;
            fs.writeFile(fileName, JSON.stringify(file, null, 4), function writeJSON(err) {
            if (err) return console.log(err);
            console.log('Wrting to file:  ' + fileName);
            });

            targetMessage.delete();
            interaction.reply(`Welcome message has been updated!`)
            setTimeout(() => {
                interaction.deleteReply();
                }, "5000");
              
            } catch (error) {
                console.log(`An error orcurred during execution of /set-welcome-message. Error: ${error}. `);
                interaction.reply({
                    content: "An error orcurred during execution of /set-welcome-message.  This error likely orcurred due to message being older than bot session. Please post a newer message. This command must also be executed in same channel as the original message.",
                    ephemeral: true,
                });
                return;
            }
    },
};