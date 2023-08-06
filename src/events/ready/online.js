const { infoChannelID } = require('../../config/config.json')

module.exports = (client) => {
    console.log(`${client.user.tag} is now online.`)
    client.channels.cache.get(infoChannelID).send(`${client.user.tag} is now online.`);
};

