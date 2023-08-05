const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'assigner-roles-remove',
    description: 'Set what roles a role may assign',
    options: [
        {
            name: 'assigner-role',
            description: 'The role which may assign.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'disallowed-role',
            description: 'The role which the assigner-role may no longer assign to other users.',
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
        console.log(fileName)
        const file = require(fileName);

        const assignerRoleId = interaction.guild.roles.cache.get(interaction.options.get("assigner-role").value).id.toString();
        const disAllowedRoleId = interaction.guild.roles.cache.get(interaction.options.get("disallowed-role").value).id;
        
        if (file.assignPairs.hasOwnProperty(assignerRoleId)) {
            const index = file.assignPairs[assignerRoleId].indexOf(disAllowedRoleId);
            file.assignPairs[assignerRoleId].splice(index, 1);
        } else {
            interaction.reply({
                content: `<@&${assignerRoleId}> does already not hold permissions to assign/unassign the  <@&${disAllowedRoleId}> role.`,
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, "5000");
            return
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