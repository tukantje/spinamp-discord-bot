import { Command } from './command';
import {
  ApplicationCommandOptionType,
  ApplicationCommandStringOptionData,
  ApplicationCommandType,
  Client,
  CommandInteraction,
  CommandInteractionOption
} from 'discord.js';
import { getPlayer } from 'player';
import { isGuildMember } from 'utils';
import { SPINAMP } from 'extractors/spinamp';

type Query = CommandInteractionOption['value'];
type ValidQuery = string;

function isValidQuery(query: Query): query is ValidQuery {
  return typeof query === 'string';
}

const option: ApplicationCommandStringOptionData = {
  type: ApplicationCommandOptionType.String,
  name: 'song',
  description: 'Your song query for the music to be played',
  required: true
};

export const Play: Command = {
  name: 'play',
  description: 'Plays a song',
  type: ApplicationCommandType.ChatInput,
  options: [option],
  run: async (client: Client, interaction: CommandInteraction) => {
    const player = getPlayer(client);

    const query = interaction.options.get('song')?.value;

    if (isValidQuery(query)) {
      try {
        const searchResult = await player.search(query, {
          requestedBy: interaction.user,
          searchEngine: SPINAMP
        });

        if (!searchResult || !searchResult.tracks.length) {
          return void interaction.followUp({ content: 'No results were found!' });
        }

        if (interaction.guild) {
          const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel
          });

          try {
            if (isGuildMember(interaction.member)) {
              if (!queue.connection && interaction.member.voice.channel) {
                await queue.connect(interaction.member.voice.channel);
              }
            }
          } catch {
            if (interaction.guildId) {
              void player.deleteQueue(interaction.guildId);
            }

            return void interaction.followUp({ content: 'Could not join your voice channel!' });
          }

          await interaction.followUp({
            content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...`
          });

          if (searchResult.playlist) {
            queue.addTracks(searchResult.tracks);
          } else {
            queue.addTrack(searchResult.tracks[0]);
          }

          if (!queue.playing) {
            await queue.play();
          }
        }
      } catch (e) {
        await interaction.followUp({ content: `No track found.` });
      }
    }
  }
};
