const { infoChannelID } = require('../../config/config.json')
const infoEmbed = require('../../embeds/infoEmbed.js')


module.exports = (client) => {
    client.channels.cache.get(infoChannelID).send({ embeds: [infoEmbed(`${client.user.tag} is now online.`)] })
};

