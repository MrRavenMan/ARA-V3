const { joinLeaveChannelID } = require('../../config/config.json');
const { userMention } = require('discord.js');

module.exports = (client, user) => {
    console.log(`${user.tag} has left the server at ${new Date().toISOString()}`);
    client.channels.cache.get(joinLeaveChannelID).send(`${userMention(user.id)} has left the server`);
};