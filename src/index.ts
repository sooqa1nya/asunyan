import { Client, GatewayIntentBits } from 'discord.js';

import { infinityPictures } from './modules/infinityPictures';
import 'dotenv/config';


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
});


client.on('ready', async () => {

    console.log('I am ready!');

    await infinityPictures(client);

});



client.login(process.env.botToken);