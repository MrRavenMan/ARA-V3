const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
    name: 'ban',
    description: 'Ban a member from the server.',
    options: [
        {
            name: 'target-user',
            description: 'The user to ban.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'The reason for the ban.',
            required: false,
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],
    devOnly: false,
    testOnly: false,
    deleted: true,

    callback: (client, interaction) => {
        const targetUser = interaction.guild.members.cache.get(interaction.options.get("target-user").value);
        console.log("ban");
    },
};