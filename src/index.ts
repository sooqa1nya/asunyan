import { Client, GatewayIntentBits } from 'discord.js';

import { infinityPictures } from './modules/infinityPictures';
import { loadCMD } from './slash-cmd';

import 'dotenv/config';


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
});


client.on('ready', async () => {

    console.log('I am ready!');

    await loadCMD();
    await infinityPictures(client);

});

client.on('interactionCreate', async interaction => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hi') {
        await interaction.reply('Hi!)');
    }

});



client.login(process.env.botToken);