import { Client, Events, GatewayIntentBits } from 'discord.js';

import { clientReady, interactions, memberAdd, memberJoin, memberRemove } from './handlers';

import 'dotenv/config';


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers
    ]
});


// Client is ready
client.once(Events.ClientReady, clientReady);

// Commands
client.on(Events.InteractionCreate, interactions);

// Role
client.on(Events.GuildMemberAdd, memberJoin);

// Logs
client.on(Events.GuildMemberAdd, memberAdd);
client.on(Events.GuildMemberRemove, memberRemove);


client.login(process.env.botToken);