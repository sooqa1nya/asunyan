import { GuildMember } from 'discord.js';


export const memberJoin = async (member: GuildMember) => {

    const role = member.guild.roles.cache.find(role => role.name === 'Member');

    if (!role) {
        return;
    }

    await member.roles.add(role);

};