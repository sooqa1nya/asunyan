import { EmbedBuilder, GuildMember, PartialGuildMember } from 'discord.js';


export const memberRemove = async (member: GuildMember | PartialGuildMember) => {

    const chatLog = process.env.chatLog;
    if (!chatLog) return;

    const channel = member.client.channels.cache.get(chatLog);
    if (!channel?.isTextBased()) {
        return;
    }


    const embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle('Leave')
        .setDescription(`${member.user.globalName} (<@${member.user.id}>)`);

    await channel.send({ embeds: [embed] });

};