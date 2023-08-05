const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
    name: 'send-file',
    description: 'Make the bot send a file',
    options: [
        {
            name: 'channel',
            description: 'The channel to post the message in.',
            required: true,
            type: ApplicationCommandOptionType.Channel,
        },
        {
            name: 'file',
            description: 'The file you wish the bot to post.',
            type: ApplicationCommandOptionType.Attachment,
            required: true,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.AttachFiles],
    botPermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ManageMessages],
    devOnly: false,
    testOnly: false,
    deleted: false,

    callback: (client, interaction) => {
        try {
            const targetChannel = interaction.guild.channels.cache.get(interaction.options.get("channel").value);
            const targetFile = interaction.options.getAttachment("file");
                         
            targetChannel.send({ files: [ targetFile.url ]});
            interaction.reply(`File posted in <#${targetChannel.id}>!`)
            setTimeout(() => {
                interaction.deleteReply();
                }, "5000");
              
        } catch (error) {
            console.log(`An error orcurred during execution of /send-file. Error: ${error}.`);
            interaction.reply({
                content: "An error orcurred during execution of /send-file.",
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.deleteReply();
            }, "5000");
            return;
        }
    },
};