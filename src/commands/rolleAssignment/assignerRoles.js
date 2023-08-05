const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'assigner-roles',
    description: 'See what roles a role may assign',
    options: [
        {
            name: 'assigner-role',
            description: 'The role which may assign.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
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

            const assignerRoleId = interaction.guild.roles.cache.get(interaction.options.get("assigner-role").value).id.toString();
            
            if (file.assignPairs[assignerRoleId] === undefined) {
                interaction.reply({
                    content: `<@&${assignerRoleId}> does not hold permissions to assign/unassign any roles`,
                    ephemeral: true,
                });
                setTimeout(() => {
                    interaction.deleteReply();
                }, "5000");
            };

            let message = `<@&${assignerRoleId}> can assign/unassign the roles of; `;
            for (roleId of file.assignPairs[assignerRoleId]) {
                message = message + `<@&${roleId}> `
            };
            message = message + " to other users. "
            interaction.reply({
                content: message,
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, "5000");
        } catch (error) {
            console.log(`An error orcurred during execution of  /assigner-roles. Error: ${error}`);
            interaction.reply({
                content: "An error orcurred during execution of /assigner-roles.",
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, "5000");
        }
        
        
    },
};