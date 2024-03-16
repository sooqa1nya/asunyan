import { Client } from 'discord.js';

import { loadCMD } from '../commands';
import { infinityPictures } from '../modules';


export const clientReady = async (readyClient: Client<true>) => {

    console.log(`Ready! Logged in as ${readyClient.user.tag}`);

    await loadCMD();
    await infinityPictures(readyClient);

}; 