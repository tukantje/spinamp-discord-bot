import { BaseInteraction, GuildMember } from 'discord.js';

export type Member = BaseInteraction['member'];

export function isGuildMember(member: Member): member is GuildMember {
  return member instanceof GuildMember;
}
