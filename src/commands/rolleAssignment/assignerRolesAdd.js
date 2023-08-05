const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'assigner-roles-add',
    description: 'Set what roles a role may assign',
    options: [
        {
            name: 'assigner-role',
            description: 'The role which may assign.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'allowed-role',
            description: 'The role which the assigner-role may assign to other users.',
            required: true,
            type: ApplicationCommandOptionType.Role,
        }
    ],
    permissionsRequired: [],
    botPermissions: [PermissionFlagsBits.ManageRoles],
    devOnly: false,
    testOnly: false,
    deleted: false,

    callback: (client, interaction) => {
        // Load config file
        const basePath = path.resolve(__dirname, '../..')
        const fileName = basePath + '/config/config.json';
        const file = require(fileName);

        const assignerRoleId = interaction.guild.roles.cache.get(interaction.options.get("assigner-role").value).id.toString();
        const allowedRoleId = interaction.guild.roles.cache.get(interaction.options.get("allowed-role").value).id;
        
        if (file.assignPairs.hasOwnProperty(assignerRoleId)) {
            if (!file.assignPairs[assignerRoleId].includes(allowedRoleId)) {
                file.assignPairs[assignerRoleId].push(allowedRoleId);
            }
        } else {
            file.assignPairs[assignerRoleId] = [allowedRoleId];
        }
        
        // Save config file
        fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(file));
        console.log('writing to ' + fileName);
        });

        let message = `<@&${assignerRoleId}> can now assign/unassign the roles of; `;
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
        
    },
};