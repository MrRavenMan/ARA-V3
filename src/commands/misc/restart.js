const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')
const { TOKEN, infoChannelID } = require('../../config/config.json');

module.exports = {
    name: 'restart',
    description: 'Restarts the bot.',
    permissionsRequired: [],
    botPermissions: [],
    devOnly: false,
    testOnly: false,
    deleted: false,

    callback: (client, interaction) => {
        try {
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
            console.log(`${client.user.tag} is now online after /restart by ${interaction.user.username}.`);
            client.channels.cache.get(infoChannelID).send(`${client.user.tag} is now online after /restart by ${interaction.user.username}.`);
        } catch (error) {
            console.log(`An error orcurred during execution of  /restart. Error: ${error}`);
            interaction.reply({
                content: "An error orcurred during execution of /restart.",
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, "5000");
        }
    },
};