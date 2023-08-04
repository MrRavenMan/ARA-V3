const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
    name: 'pin',
    description: 'Pins/unpins messages with the corresponding id from the same channel as the command is executed in.',
    options: [
        {
            name: 'message-id',
            description: 'The id of the message you wish to pin/unpin',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'pinned',
            description: 'Set true if you wish to pin message. Otherwise the message will be unpinned.',
            type: ApplicationCommandOptionType.Boolean,
            required: true,
        },
    ],
    botPermissions: [PermissionFlagsBits.ManageMessages],
    devOnly: false,
    testOnly: false,
    deleted: false,

    callback: (client, interaction) => {
        const pinned = interaction.options.get("pinned").value;
        const message_id = interaction.options.get("message-id").value;
        try {
            if (pinned) {
                interaction.channel.messages.cache.get(message_id).pin( {reason: `Pinned by ${interaction.user.tag} using the /pin command`} );
                interaction.reply({
                    content: "Message was pinned",
                    ephemeral: true,
                });
            } else {
                interaction.channel.messages.cache.get(message_id).unpin( {reason: `Unpinned by ${interaction.user.tag} using the /pin command`} );
                interaction.reply({
                    content: "Message was unpinned",
                    ephemeral: true,
                });
            }
    
            setTimeout(() => {
                interaction.deleteReply();
                }, "5000");
        } catch (error) {
            console.log(`There was an error executing /pin on ${message_id}. Error was likely caused by user trying to pin command older than bot session. Messages older than the bots current session cannot be pinned/unpinned by bot!`);
            interaction.reply({
                content: "This message cannot be pinned/unpinned by me! Message might be too old.",
                ephemeral: true,
            });
        }
    },
};