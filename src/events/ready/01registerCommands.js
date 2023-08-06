const getLocalCommands = require('../../utils/getLocalCommands');
const { guildIDs, testGuildID } = require('../../config/config.json');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const areCommandsDifferent = require('../../utils/AreCommandsDifferent.js')
const { Application } = require('discord.js');

module.exports = async (client) => {
    const localCommands = getLocalCommands();    
    try {
        const localCommands = getLocalCommands();

        const activeGuilds = guildIDs;
        activeGuilds.push(testGuildID);
        for (guildID of activeGuilds) {
            const ApplicationCommands = await getApplicationCommands(client, guildID)

        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;

            const existingCommand = await ApplicationCommands.cache.find(
                (cmd) => cmd.name === name
            );

            if (existingCommand) {
                if (localCommand.deleted) {
                    await ApplicationCommands.delete(existingCommand.id);
                    console.log(`Deleted command /${name} for guild-ID: ${guildID}.`);
                    continue;
                }

                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await ApplicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });

                    console.log(`Edited command /${name} for guild-ID: ${guildID}.`);
                }
            } else {
                if (localCommand.deleted) {
                    console.log(`Skipping registerring command /${name} as it is set to delete.`);
                    continue;
                }

                await ApplicationCommands.create({
                    name,
                    description,
                    options,
                })
                console.log(`Command /${name} was registered for guild-ID: ${guildID}.`);
            };
            }
        }

    } catch (error) {
        console.log(`There was an error: ${error}`)
    }
}