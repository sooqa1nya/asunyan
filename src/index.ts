import { Client, Events, GatewayIntentBits } from 'discord.js';

import { infinityPictures } from './modules/infinityPictures';
import { loadCMD } from './commands';

import 'dotenv/config';


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers
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

client.on(Events.GuildMemberAdd, async member => {

    const role = member.guild.roles.cache.find(role => role.name === 'Member');

    if (!role) {
        return;
    }

    await member.roles.add(role);

});


client.login(process.env.botToken);