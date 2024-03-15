import client from 'nekos.life';
import { Client } from 'discord.js';

import { sleep } from './sleep';


const nekoClient = new client();


const getPictures = async () => {

    const randomNumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1;


    let nekoMethod;
    switch (randomNumber) {
        case 1: {
            nekoMethod = await nekoClient.neko();
            break;
        }
        case 2: {
            nekoMethod = await nekoClient.nekoGif();
            break;
        }
        case 3: {
            nekoMethod = await nekoClient.foxGirl();
            break;
        }
        case 4: {
            nekoMethod = await nekoClient.hug();
            break;
        }
        case 5: {
            nekoMethod = await nekoClient.cuddle();
            break;
        }
        case 6: {
            nekoMethod = await nekoClient.kiss();
            break;
        }
    }

    if (!nekoMethod) {
        return undefined;
    }

    if (!("url" in nekoMethod)) {
        return undefined;
    }

    return nekoMethod.url;

};



export const infinityPictures = async (client: Client<boolean>) => {

    const channel = client.channels.cache.get(<string>process.env.cutePictures);
    if (!channel?.isTextBased()) {
        return;
    }

    while (true) {

        const picture = await getPictures();
        if (!picture) {
            continue;
        }

        channel.send({ files: [picture] });

        await sleep(<string>process.env.timer);

    }

};