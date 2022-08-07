import { Player, Queue } from 'discord-player';

export function channelEmpty(player: Player) {
  player.on('channelEmpty', (queue: Queue<any>) => {
    queue.metadata.send(`❌ | Nobody is in the voice channel, leaving...`);
  });
}
