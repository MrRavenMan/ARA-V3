const { ApplicationCommandOptionType, PermissionFlagsBits, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')
const { assignPairs } = require('../../config/config.json')
const getAssignableRoleChoices = require('../../utils/getAssignableRoleChoices')

module.exports = {
    name: 'assign',
    description: 'Assign/unassign a member from the server a role.',
    options: [
        {
            name: 'target-user',
            description: 'The user to assign/unassign a role.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'assign',
            description: 'Set true to assign role from user. Set false to unassign role from user.',
            required: true,
            type: ApplicationCommandOptionType.Boolean,
        }
    ],
    permissionsRequired: [],
    botPermissions: [PermissionFlagsBits.ManageRoles],
    devOnly: false,
    testOnly: false,
    deleted: false,

    callback: (client, interaction) => {
        try {
            const targetUser = interaction.guild.members.cache.get(interaction.options.get("target-user").value);
            const assign = interaction.options.get("assign").value;

            let allowedMember = false;
            for (assignerRoleId of Object.keys(assignPairs)) {
                if(interaction.member.roles.cache.find(role => role.id == assignerRoleId)) {
                        allowedMember = true;
                        continue;
                }
            }

            if (allowedMember === false) {
                interaction.reply({
                    content: `You are not allowed to use this command!`,
                    ephemeral: true,
                });
                setTimeout(() => {
                    interaction.deleteReply();
                }, "5000");
                return;
            }
            
            const menu = new StringSelectMenuBuilder()
                .setCustomId('assignMenu')
                .setPlaceholder('Select role')
                .setOptions(
                    getAssignableRoleChoices(interaction.member, interaction, targetUser.user.id, assign)
                )


            let message = "";
            if (!assign) {
                message = `Select role to unassign from ${targetUser.user.username}.`
            } else {
                message = `Select role to assign to ${targetUser.user.username}.`
            }
            interaction.reply({
                content: message,
                ephemeral: true,
                components: [new ActionRowBuilder().addComponents(menu)]
            });
            setTimeout(() => {
                interaction.deleteReply();
                }, "15000");
        } catch (error) {
            console.log(`An error orcurred during execution of /assign. Error: ${error}`);
            interaction.reply({
                content: "An error orcurred during execution of /assign.",
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, "5000");
        }
    },
};