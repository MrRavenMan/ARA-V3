const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
    name: 'set-status',
    description: 'Set status of bot.',
    options: [
        {
            name: 'status',
            description: 'The id of the message you wish to pin/unpin',
            type: ApplicationCommandOptionType.Number,
            required: true,
            choices: [
                // Add things here
            ]
        }
    ],
    botPermissions: [PermissionFlagsBits.ManageMessages],
    devOnly: false,
    testOnly: false,
    deleted: true,

    callback: (client, interaction) => {
        try {
            interaction.reply({
                content: "Status was changed",
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.deleteReply();
                }, "5000");
        } catch (error) {
            console.log(`There was an error executing /status.`);
            interaction.reply({
                content: "Error executing /status command.",
                ephemeral: true,
            });
        }
    },
};