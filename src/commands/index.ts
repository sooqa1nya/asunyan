import { REST, Routes, SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';


export const loadCMD = async () => {

    const commands = [

        new SlashCommandBuilder()
            .setName('hi')
            .setDescription('Say "Hi!")'),

        new SlashCommandBuilder()
            .setName('play')
            .setDescription('Start playing your music.')
            .addStringOption(option => option
                .setName('link')
                .setDescription('Link to the song.')
                .setRequired(true)
            )

    ];

    const rest = new REST({ version: '10' })
        .setToken(<string>process.env.botToken);

    try {

        await rest.put(
            Routes.applicationCommands(<string>process.env.clientId),
            { body: commands }
        );

    } catch (error) {
        console.error(error);
    }

};