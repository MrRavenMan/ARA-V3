const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')
const { TOKEN, infoChannelID } = require('../../config/config.json');
const infoEmbed = require('../../embeds/infoEmbed.js')

module.exports = {
    name: 'shutdown',
    description: 'Shut down the bot.',
    permissionsRequired: [],
    botPermissions: [],
    devOnly: false,
    testOnly: false,
    deleted: false,

    callback: (client, interaction) => {
        try {
            interaction.reply({
                content: `Shooting down the bot!`,
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, "5000");
                
            client.destroy();
            console.log(`Bot stopped by /shutdown by ${interaction.user.username}#${interaction.user.discriminator}`)
        } catch (error) {
            console.log(`An error orcurred during execution of  /shutdown. Error: ${error}`);
            interaction.reply({
                content: "An error orcurred during execution of /shutdown.",
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, "5000");
        }
        
    },
};