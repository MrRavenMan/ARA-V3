const { joinLeaveChannelID } = require('../../config/config.json')
const leaveEmbed = require('../../embeds/leaveEmbed.js')

module.exports = (client, user) => {
    console.log(`${user.tag} has left the server at ${new Date().toISOString()}`);
    client.channels.cache.get(joinLeaveChannelID).send({ embeds: [leaveEmbed(user["user"])] })
};