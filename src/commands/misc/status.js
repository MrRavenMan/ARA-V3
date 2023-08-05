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
    permissionsRequired: [],
    botPermissions: [],
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
            console.log(`An error orcurred during execution of /status. Error: ${error}`);
            interaction.reply({
                content: "An error orcurred during execution of /status.",
                ephemeral: true,
            });
        }
    },
};