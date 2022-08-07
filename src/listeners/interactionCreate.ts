import { getCommand, isCommandName } from 'commands';
import { Client, BaseInteraction, CommandInteraction, GuildMember } from 'discord.js';
import { isGuildMember } from 'utils';

function isCommandInteraction(interaction: BaseInteraction): interaction is CommandInteraction {
  return interaction.isCommand() || interaction.isContextMenuCommand();
}

export function interactionCreate(client: Client): void {
  client.on('interactionCreate', async (interaction: BaseInteraction) => {
    if (isCommandInteraction(interaction)) {
      if (!interaction.guildId) {
        return;
      }

      if (!isGuildMember(interaction.member) || !interaction.member.voice.channel) {
        return void interaction.reply({ content: 'You are not in a voice channel!', ephemeral: true });
      }

      // TODO: Same voice channel check.

      await handleSlashCommand(client, interaction);
    }
  });
}

async function handleSlashCommand(client: Client, interaction: CommandInteraction): Promise<void> {
  if (!isCommandName(interaction.commandName)) {
    interaction.followUp({ content: 'An error has occurred. ' });
    return;
  }

  const slashCommand = getCommand(interaction.commandName);
  await interaction.deferReply();

  slashCommand.run(client, interaction);
}
