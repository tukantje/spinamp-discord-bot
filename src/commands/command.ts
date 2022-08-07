import { CommandInteraction, ChatInputApplicationCommandData, Client } from 'discord.js';

export type CommandName = 'hello' | 'play';

export interface Command extends ChatInputApplicationCommandData {
  run: (client: Client, interaction: CommandInteraction) => void;
  name: CommandName;
}
