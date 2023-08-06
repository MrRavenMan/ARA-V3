const { testServerID } = require('../../config/config.json')
const getLocalCommands = require('../../utils/getLocalCommands.js')


module.exports = async (client, interaction) => {
    try {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId !== 'assignMenu') rerturn;

        await interaction.deferReply({ ephemeral: true });

        const value = interaction.values[0].split('-');

        const role = client.guilds.cache.get(interaction.guildId).roles.cache.get(value[2]);
        if (!role) {
            interaction.editReply({
                content: 'Role could not be found.',
            });
            return;
        }
        const targetUser = client.guilds.cache.get(interaction.guildId).members.cache.get(value[1]);
        if (!targetUser) {
            interaction.editReply({
                content: 'User could not be found.',
            });
            return;
        }

        if (value[0] === 'assign') {
            targetUser.roles.add(role);
            interaction.editReply({
                content: `The **${role.name}** role has been added to **${targetUser.user.username}**`,
            });
        } else if (value[0] === 'unassign') {
            targetUser.roles.remove(role);
            interaction.editReply({
            content: `The **${role.name}** role has been removed from **${targetUser.user.username}**`,
        });
        } else {
            interaction.editReply({ content: 'Error executing menu' })
        };
        setTimeout(() => {
            interaction.deleteReply();
            }, "5000");
    } catch (error) {
        console.log(`An error orcurred during execution of /select box for assigning roles. Error: ${error}`);
            interaction.reply({
                content: "An error orcurred during execution of select box for assigning roles.",
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, "5000");
    }
};

