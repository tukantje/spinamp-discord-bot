import { Player, Queue, Track } from 'discord-player';

export function trackAdd(player: Player) {
  player.on('trackAdd', (queue: Queue<any>, track: Track) => {
    queue.metadata.send(`🎶 | Track **${track.title}** queued!`);
  });
}
