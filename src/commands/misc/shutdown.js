const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')
const { TOKEN, infoChannelID } = require('../../config/config.json');
const infoEmbed = require('../../embeds/infoEmbed.js')

module.exports = {
    name: 'shutdown',
    description: 'Shut down the bot.',
    botPermissions: [PermissionFlagsBits.ManageMessages],
    devOnly: false,
    testOnly: false,
    deleted: false,

    callback: (client, interaction) => {
        interaction.reply({
            content: `Shooting down the bot!`,
            ephemeral: true,
        });
        setTimeout(() => {
            interaction.deleteReply();
            }, "5000");
            
        client.destroy();
        console.log(`Bot stopped by /shutdown by ${interaction.user.username}#${interaction.user.discriminator}`)
    },
};