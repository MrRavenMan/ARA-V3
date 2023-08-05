const { testServerID, commandPermissions, godRoles } = require('../../config/config.json')
const getLocalCommands = require('../../utils/getLocalCommands.js')


module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);
        
        if (!commandObject) return;

        if (commandObject.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: "Only developers are allowed to run this command.",
                    ephemeral: true,
                });
                return;
            }
        }

        if (commandObject.testOnly) {
            if (!(interaction.guild.id === testServerID)) {
                interaction.reply({
                    content: "Only developers are allowed to run this command.",
                    ephemeral: true,
                });
                return;
            }
        }

        if (commandObject.permissionsRequired?.length) {
            for (const permission of commandObject.permissionsRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: "Not enough permissions.",
                        ephemeral: true,
                    });
                    continue;
                }
            }
        }

        if (commandObject.botPermissions?.length) {
            for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me;

                if (!bot.permissions.has(permission)) {
                    interaction.reply({
                        content: "I do not have enough permissions.",
                        ephemeral: true,
                    })
                }
            }
        }
        
        let allowedMember = false;
        for (permissionGroup of commandPermissions[commandObject.name]) {
            console.log(permissionGroup);
            if(interaction.member.roles.cache.find(role => role.id == permissionGroup)) {
                allowedMember = true;
                continue;
            }
        }
        if (!allowedMember) {
            for (godRoleId of godRoles) {
                if (interaction.member.roles.cache.find(role => role.id == godRoleId)) {
                    allowedMember = true;
                    continue;
                }
            }
        }
        if (!allowedMember) {
            interaction.reply({
                content: "You are not allowed to use this command.",
                ephemeral: true,
            });
            return;
        };

        await commandObject.callback(client, interaction);
    } catch (error) {
        console.log(`There was an error running this command: ${error}`)
    }
};

