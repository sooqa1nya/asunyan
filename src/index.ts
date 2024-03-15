import { Client, Events, GatewayIntentBits } from 'discord.js';

import { infinityPictures } from './modules/infinityPictures';
import { loadCMD } from './commands';

import 'dotenv/config';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates
    ]
});


client.once(Events.ClientReady, async readyClient => {

    console.log(`Ready! Logged in as ${readyClient.user.tag}`);

    await loadCMD();
    await infinityPictures(client);

});

client.on(Events.InteractionCreate, async interaction => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hi') {
        await interaction.reply('Hi!)');
    }

});


client.login(process.env.botToken);