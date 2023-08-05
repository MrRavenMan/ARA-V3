const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'command-permissions',
    description: 'See who may use a command',
    options: [
        {
            name: 'command',
            description: 'The command you wish to see permissions for (with /)',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [],
    botPermissions: [PermissionFlagsBits.SendMessages],
    devOnly: false,
    testOnly: false,
    deleted: false,

    callback: (client, interaction) => {
        try {
            // Load config file
            const basePath = path.resolve(__dirname, '../..')
            const fileName = basePath + '/config/config.json';
            const file = require(fileName);

            const commandName = interaction.options.get("command").value.replace('/', '')

            if (!file.commandPermissions.hasOwnProperty(commandName)) {
                interaction.reply({
                    content: `Command /${commandName} does not exist!`,
                    ephemeral: true,
                });
                setTimeout(() => {
                    interaction.deleteReply();
                }, "5000");
            };

            let message = `/${commandName} can used by the roles of; `;
            if (file.commandPermissions[commandName].length === 0) {
                message = message + `No roles!`
            } else {
                for (roleId of file.commandPermissions[commandName]) {
                    message = message + `<@&${roleId}> `
                };
            }

            
            message = message + "."
            interaction.reply({
                content: message,
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, "5000");
        } catch (error) {
            console.log(`An error orcurred during execution of /command-permissions. Error: ${error}`);
            interaction.reply({
                content: "An error orcurred during execution of /command-permissions.",
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, "5000");
        }
        
        
    },
};