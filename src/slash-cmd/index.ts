import { REST, Routes } from 'discord.js';


export const loadCMD = async () => {

    const commands = [
        {
            name: 'hi',
            description: 'Say "Hi!")',
        },
    ];

    const rest = new REST({ version: '10' }).setToken(<string>process.env.botToken);

    try { await rest.put(Routes.applicationCommands(<string>process.env.clientId), { body: commands }); }
    catch (error) { console.error(error); }

};