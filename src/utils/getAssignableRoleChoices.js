const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')
const { assignPairs } = require('../config/config.json')

module.exports = (user, interaction) => {
    const assignableRoles = [];

    for (assignerRoleId of Object.keys(assignPairs)) {
        if(user.roles.cache.find(role => role.id == assignerRoleId)) {
            for (assignableRoleId of assignPairs[assignerRoleId]) {
                if (assignableRoleId === roleId) {
                    assignableRoles.push({
                        name: interaction.guild.roles.cache(role => role.id == assignerRoleId).name,
                        value: assignerRoleId
                    });
                }
            }
        }
    };
    return assignableRoles;
};