const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

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
            description: 'Set true to assign role from user. Otherwise role will be unassigned from user.',
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
        const assign = interaction.options.get("assign").value;
        let message = "";
        if (!assign) {
            targetUser.roles.remove(role);
            message = `Role ${role.name} was removed from ${targetUser.user.username}#${targetUser.user.discriminator}.`
        } else {
            targetUser.roles.add(role);
            message = `Role ${role.name} was added to ${targetUser.user.username}#${targetUser.user.discriminator}.`
        }
        interaction.reply({
            content: message,
            ephemeral: true,
        });
        
    },
};