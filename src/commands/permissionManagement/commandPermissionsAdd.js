const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'command-permissions-add',
    description: 'Add a role which may use a command.',
    options: [
        {
            name: 'command',
            description: 'The command you wish to change permissions for (with /)',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'role',
            description: 'The role who may use the command.',
            required: true,
            type: ApplicationCommandOptionType.Role,
        },
    ],
    permissionsRequired: [],
    botPermissions: [PermissionFlagsBits.ManageRoles],
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
            const allowRoleId = interaction.guild.roles.cache.get(interaction.options.get("role").value).id.toString();

            if (!file.commandPermissions[commandName].hasOwnProperty(allowRoleId)) {
                file.commandPermissions[commandName].push(allowRoleId);
            }
            
            // Save config file
            fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
            if (err) return console.log(err);
            console.log('Wrting to file:  ' + fileName);
            });

            let message = `/${commandName} can used by the roles of; `;
            if (file.commandPermissions[commandName].length === 0) {
                message = message + `No roles!`
            } else {
                for (roleId of file.commandPermissions[commandName]) {
                    message = message + `<@&${roleId}> `
                };
            }
            interaction.reply({
                content: message,
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, "5000");
        } catch (error) {
            console.log(`An error orcurred during execution of /command-permissions-add. Error: ${error}`);
            interaction.reply({
                content: "An error orcurred during execution of /command-permissions-add.",
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, "5000");
        }
        
        
    },
};