import { Player, Queue } from 'discord-player';

export function connectionError(player: Player) {
  player.on('connectionError', (queue: Queue, error: Error) => {
    console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
  });
}
