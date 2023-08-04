module.exports = {
    name: 'ping',
    description: 'Replies with Pong!',
    deleted: false,

    callback: (client, interaction) => {
        interaction.reply(`Pong! ${client.ws.ping}ms`);
    },
};