const { ApplicationCommandOptionType, PermissionFlagsBits, ActivityType } = require('discord.js')

module.exports = {
    name: 'set-status',
    description: 'Set status of bot.',
    options: [
        {
            name: 'status',
            description: 'The id of the message you wish to pin/unpin',
            type: ApplicationCommandOptionType.Number,
            required: true,
            choices: [
                {
                    name: 'Streaming',
                    value: 0
                },
                {
                    name: 'Watching',
                    value: 1
                },
                {
                    name: 'Listening',
                    value: 2
                },
                {
                    name: 'Competing',
                    value: 3
                },
                {
                    name: 'Playing',
                    value: 4
                }
            ]

        },
        {
            name: 'message',
            description: 'The message you want to be set for the status.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'url',
            description: 'Only for the Streaming status.',
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    permissionsRequired: [],
    botPermissions: [],
    devOnly: false,
    testOnly: false,
    deleted: false,

    callback: (client, interaction) => {
        try {
            const statusList = [
                {
                    name: '',
                    type: ActivityType.Streaming,
                    url: '',
                },
                {
                    name: '',
                    type: ActivityType.Watching,
                },
                {
                    name: '',
                    type: ActivityType.Listening,
                },
                {
                    name: '',
                    type: ActivityType.Competing,
                },
                {
                    name: '',
                    type: ActivityType.Playing,
                }

            ]

            let status = statusList[interaction.options.get('status').value];
            status.name = interaction.options.get('message').value;
            if (interaction.options.get('status').value === 0) {
                status.url = interaction.options.get('url').value;
            }
            client.user.setActivity()
            interaction.reply({
                content: "Status was changed",
                ephemeral: true,
            });
            setTimeout(() => {
                interaction.deleteReply();
                }, "5000");
        } catch (error) {
            console.log(`An error orcurred during execution of /status. Error: ${error}`);
            interaction.reply({
                content: "An error orcurred during execution of /status.",
                ephemeral: true,
            });
        }
    },
};