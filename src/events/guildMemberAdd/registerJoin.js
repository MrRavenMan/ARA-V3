const { joinLeaveChannelID, joinMessage } = require('../../config/config.json')
const joinEmbed = require('../../embeds/joinEmbed.js')

module.exports = (client, user) => {
    console.log(`${user.tag} has joined the server at ${new Date().toISOString()}`);
    client.channels.cache.get(joinLeaveChannelID).send({ embeds: [joinEmbed(user["user"])] })
    user.send(joinMessage)
};