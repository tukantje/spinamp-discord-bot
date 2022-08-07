import { Player, Queue } from 'discord-player';

export function botDisconnect(player: Player) {
  player.on('botDisconnect', (queue: Queue<any>) => {
    queue.metadata.send(`❌ | I was manually disconnected from the voice channel, clearing queue!`);
  });
}
