const { TEST_SERVER_ID } = require('../../config/config.json')
const getLocalCommands = require('../../utils/getLocalCommands.js')


module.exports = async (client, interaction) => {
    try {
        if (!interaction.isButton()) return;

        const customId = interaction.customId.split('-');
        if (customId[0] !== 'RoleBtn') rerturn;

        await interaction.deferReply({ ephemeral: true });

        const role = interaction.guild.roles.cache.get(customId[2]);
        if (!role) {
            interaction.editReply({
                content: 'Role could not be found.',
            });
            return;
        }

        if (customId[1] === 'assign') {
            interaction.member.roles.add(role);
            interaction.editReply({
                content: `The <@&${role.id}> role has been added to you`,
            });
        } else if (customId[1] === 'unassign') {
            interaction.member.roles.remove(role);
            interaction.editReply({
            content: `The <@&${role.id}> role has been removed from you`,
        });
        } else {
            interaction.editReply({ content: 'Error executing button' })
        };
        setTimeout(() => {
            interaction.deleteReply();
            }, "5000");
    } catch (error) {
        console.log(`There was an error handling this button: ${error}`)
    }
};

