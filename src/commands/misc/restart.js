const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')
const { TOKEN, infoChannelID } = require('../../config/config.json');
const infoEmbed = require('../../embeds/infoEmbed.js')

module.exports = {
    name: 'restart',
    description: 'Restarts the bot.',
    botPermissions: [PermissionFlagsBits.ManageMessages],
    devOnly: false,
    testOnly: false,
    deleted: false,

    callback: (client, interaction) => {
        interaction.reply({
            content: `Executing bot restart!`,
            ephemeral: true,
        });
        setTimeout(() => {
            interaction.deleteReply();
        }, "5000");
            
        client.destroy();
        console.log(`Executing /restart by ${interaction.user.username}#${interaction.user.discriminator}`)
        client.login(TOKEN);
        client.channels.cache.get(infoChannelID).send({ embeds: [infoEmbed(`${client.user.tag} is now online after /restart by ${interaction.user.username}#${interaction.user.discriminator}.`)] })

    },
};