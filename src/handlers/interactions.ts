import { CacheType, Interaction } from 'discord.js';



export const interactions = async (interaction: Interaction<CacheType>) => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hi') {
        await interaction.reply('Hi!)');
    }

};