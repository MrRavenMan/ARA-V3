module.exports = {
    name: 'ping',
    description: 'Replies with Pong!',
    botPermissions: [],
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