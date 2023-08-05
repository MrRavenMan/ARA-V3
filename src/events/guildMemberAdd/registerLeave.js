const { joinLeaveChannelID } = require('../../config/config.json')

module.exports = (client, user) => {
    console.log(`${user.tag} has left the server at ${new Date().toISOString()}`);
    client.channels.cache.get(joinLeaveChannelID).send(`${userMention(user.id)} has joined the server`);
};