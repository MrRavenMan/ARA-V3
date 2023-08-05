const { PermissionFlagsBits } = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Replies with Pong!',
    permissionsRequired: [],
    botPermissions: [PermissionFlagsBits.SendMessages],
    devOnly: false,
    testOnly: false,
    deleted: false,


    callback: (client, interaction) => {
        interaction.reply(`Pong! ${client.ws.ping}ms`);
        setTimeout(() => {
            interaction.deleteReply();
        }, "5000");
    },
};