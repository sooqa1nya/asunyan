export const sleep = async (delay: string | number): Promise<void> => {

    if (typeof delay === 'number') {
        return new Promise(resolve => setTimeout(resolve, interval));
    }


    const result = delay.match(/^(?<time>[0-9]+)(?<format>d|h|m|s|ms)$/)?.groups;
    if (!result) {
        return;
    }


    let interval: number;

    switch (result.format) {

        case 'd':
            interval = Number(result.time) * 24 * 60 * 60 * 1000;
            break;
        case 'h':
            interval = Number(result.time) * 60 * 60 * 1000;
            break;
        case 'm':
            interval = Number(result.time) * 60 * 1000;
            break;
        case 's':
            interval = Number(result.time) * 1000;
            break;
        case 'ms':
            interval = Number(result.time);
            break;

    }


    return new Promise(resolve => setTimeout(resolve, interval));

};