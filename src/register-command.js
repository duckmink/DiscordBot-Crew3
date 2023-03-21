require('dotenv').config();
const { REST, Routes} = require('discord.js')

const commands = [
    {
        name:'rank',
        description: 'Show your rank on crew3 community.',
    },
    {
        name:'level',
        description: 'Show your level and exp on crew3 community.',
    },
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async() => {
    try {
        console.log('Registering slash commands');

        await rest.put(
            Routes.applicationCommands(process.env.BOT_ID),
            {body: commands},
        );

        console.log('Slash commands successfully');
    } catch (error) {
        console.log(`${error}`);
    }
})();