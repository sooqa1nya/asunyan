import { EmbedBuilder, GuildMember } from 'discord.js';


export const memberAdd = async (member: GuildMember) => {

    const chatLog = process.env.chatLog;

    if (!chatLog) return;

    const channel = member.client.channels.cache.get(chatLog);
    if (!channel?.isTextBased()) {
        return;
    }

    const embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle('Join')
        .setDescription(`${member.user.globalName} (<@${member.user.id}>)`);

    await channel.send({ embeds: [embed] });

}

