import { Command } from './command';
import { ApplicationCommandType, Client, CommandInteraction } from 'discord.js';

export const Hello: Command = {
  name: 'hello',
  description: 'Returns a greeting',
  type: ApplicationCommandType.ChatInput,
  run: async (_: Client, interaction: CommandInteraction) => {
    const content = 'Hello there!';

    await interaction.followUp({
      ephemeral: true,
      content
    });
  }
};
