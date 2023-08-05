const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')
const { assignPairs } = require('../../config/config.json')

module.exports = {
    name: 'assign',
    description: 'Assign/unassign a member from the server a role.',
    options: [
        {
            name: 'target-user',
            description: 'The user to ban.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'role',
            description: 'The reason to assign/unassign',
            required: true,
            type: ApplicationCommandOptionType.Role,
        },
        {
            name: 'assign',
            description: 'Set true to assign role from user. Set false to unassign role from user.',
            required: true,
            type: ApplicationCommandOptionType.Boolean,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],
    devOnly: false,
    testOnly: false,
    deleted: false,

    callback: (client, interaction) => {
        const targetUser = interaction.guild.members.cache.get(interaction.options.get("target-user").value);
        const role = interaction.guild.roles.cache.get(interaction.options.get("role").value);
        const roleId = role.id;
        const assign = interaction.options.get("assign").value;

        let allowedMember = false;
        let allowedRole = false; // List of rolse the user may assign/unassign
        for (assignerRoleId of Object.keys(assignPairs)) {
            if(interaction.member.roles.cache.find(role => role.id == assignerRoleId)) {
                allowedMember = true;
                for (assignableRoleId of assignPairs[assignerRoleId]) {
                    console.log(assignableRoleId, roleId)
                    console.log(assignableRoleId === roleId)
                    if (assignableRoleId === roleId) {
                        allowedRole = true;
                        continue;
                    }
                }
            }
        };

        if (allowedMember === false) {
            interaction.reply({
                content: `You are not allowed to use this command!`,
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, "5000");
            return;
        }
        if (allowedRole === false) {
            interaction.reply({
                content: `You may not assign that role!`,
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, "5000");
            return;
        }

        let message = "";
        if (!assign) {
            targetUser.roles.remove(role);
            message = `Role <@&${roleId}> was removed from ${targetUser.user.username}#${targetUser.user.discriminator}.`
        } else {
            targetUser.roles.add(role);
            message = `Role <@&${roleId}> was added to ${targetUser.user.username}#${targetUser.user.discriminator}.`
        }
        interaction.reply({
            content: message,
            ephemeral: true,
        });
        setTimeout(() => {
            interaction.deleteReply();
        }, "5000");
        
    },
};