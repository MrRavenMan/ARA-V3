const { INFO_CHANNEL } = require('../../config/config.json')
const infoEmbed = require('../../embeds/infoEmbed.js')


module.exports = (client) => {
    client.channels.cache.get(INFO_CHANNEL).send({ embeds: [infoEmbed(`${client.user.tag} is now online at ${new Date().toISOString()}`)] })
};

