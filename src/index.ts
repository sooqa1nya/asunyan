import { Client, Events, GatewayIntentBits } from 'discord.js';
import { createAudioResource, createAudioPlayer, joinVoiceChannel, AudioPlayerState } from '@discordjs/voice';
import ytdl from 'ytdl-core';

import { infinityPictures } from './modules/infinityPictures';
import { loadCMD } from './commands';

import 'dotenv/config';
import { sleep } from './modules/sleep';


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

    if (interaction.commandName === 'play') {

        if (!interaction.member || !("voice" in interaction.member)) {
            return;
        }

        const voiceChannel = interaction.member?.voice.channel;

        if (!voiceChannel) {
            await interaction.reply('You must be in a voice channel to use this command.');
            return;
        }

        const songLink = <string>interaction.options.getString('link');

        if (!/(?<link>http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)[\w\=]*)?)/.test(songLink)) {
            await interaction.reply('This link format is not supported');
            return;
        }

        const videoInfo = await ytdl.getInfo(songLink);
        const audioPresent = videoInfo.formats.filter(format => format.hasAudio === true);
        const videoPresent = audioPresent.filter(format => format.hasVideo === false);

        const resource = createAudioResource(videoPresent[0].url);
        const player = createAudioPlayer();
        const connection = joinVoiceChannel({
            channelId: voiceChannel!.id,
            guildId: voiceChannel!.guildId,
            adapterCreator: voiceChannel!.guild.voiceAdapterCreator,
        });

        player.play(resource);

        connection.subscribe(player);

        const callback = async (oldState: AudioPlayerState, newState: AudioPlayerState) => {

            if (newState.status === 'idle') {
                connection.destroy();
            }

        };

        player.on('stateChange', callback);

        player.removeListener('stateChange', callback);

    }

});


client.login(process.env.botToken);