const { ApplicationCommandOptionType, PermissionFlagsBits, StringSelectMenuOptionBuilder } = require('discord.js')
const { assignPairs } = require('../config/config.json');
const assign = require('../commands/roleAssignment/assign');

module.exports = (user, interaction, targetUserId, assign = true) => {
    const assignableRoles = [];
    let assignSelectId = 'assign';
    if (!assign) {
        assignSelectId = 'unassign'
    };
    for (assignerRoleId of Object.keys(assignPairs)) {
        if(user.roles.cache.find(role => role.id == assignerRoleId)) {
            for (assignableRoleId of assignPairs[assignerRoleId]) {
                assignableRoles.push(new StringSelectMenuOptionBuilder({
                    label: interaction.guild.roles.cache.find(role => role.id == assignableRoleId).name,
                    value: `${assignSelectId}-${targetUserId}-${assignableRoleId}`
                }));
            }
        }
    };
    return assignableRoles;
};