const { ApplicationCommandOptionType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: 'role-button',
    description: 'Generate assign/unassign buttons for a role in a channel.',
    options: [
        {
            name: 'channel',
            description: 'The channel to post the button in.',
            required: true,
            type: ApplicationCommandOptionType.Channel,
        },
        {
            name: 'role',
            description: 'The reason to assign/unassign',
            required: true,
            type: ApplicationCommandOptionType.Role,
        }
    ],
    botPermissions: [PermissionFlagsBits.SendMessages],
    devOnly: false,
    testOnly: false,
    deleted: false,

    callback: (client, interaction) => {
        try {
            const targetChannel = interaction.guild.channels.cache.get(interaction.options.get("channel").value);
            const role = interaction.guild.roles.cache.get(interaction.options.get("role").value);
            
            const row = new ActionRowBuilder();
            row.components.push(
                new ButtonBuilder()
                    .setCustomId(`RoleBtn-assign-${role.id}`)
                    .setLabel('Assign Role')
                    .setStyle(ButtonStyle.Success)
            );
            row.components.push(
                new ButtonBuilder()
                    .setCustomId(`RoleBtn-unassign-${role.id}`)
                    .setLabel('Unassign Role')
                    .setStyle(ButtonStyle.Danger)
            );
            targetChannel.send({
                content: `Here you can assign/unassign the **${role.name}** role.`,
                components: [row]
            })
            
            interaction.reply({
                content: "Buttons were successfully generated.",
                ephemeral: true
            });
            setTimeout(() => {
                interaction.deleteReply();
                }, "3000");
        } catch (error) {
            console.log(`There was an error generating this button: ${error}`)

            interaction.reply({
                content: "There was an error generating buttons. See console log for more. ",
                ephemeral: true
            });
            setTimeout(() => {
                interaction.deleteReply();
                }, "3000");
        }
    },
};