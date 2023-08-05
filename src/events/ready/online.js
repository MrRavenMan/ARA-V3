const { infoChannelID } = require('../../config/config.json')

module.exports = (client) => {
    client.channels.cache.get(infoChannelID).send(`${client.user.tag} is now online.`);
};

