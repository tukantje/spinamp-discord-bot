import { Player, Queue } from 'discord-player';

export function error(player: Player) {
  player.on('error', (queue: Queue, error: Error) => {
    console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
  });
}
