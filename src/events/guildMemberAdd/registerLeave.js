const { JOIN_LEAVE_CHANNEL } = require('../../config/config.json')
const leaveEmbed = require('../../embeds/leaveEmbed.js')

module.exports = (client, user) => {
    console.log(`${user.tag} has left the server at ${new Date().toISOString()}`);
    client.channels.cache.get(JOIN_LEAVE_CHANNEL).send({ embeds: [leaveEmbed(user["user"])] })
};