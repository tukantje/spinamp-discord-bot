import { Player, Queue } from 'discord-player';

export function queueEnd(player: Player) {
  player.on('queueEnd', (queue: Queue<any>) => {
    queue.metadata.send(`✅ | Queue finished!`);
  });
}
