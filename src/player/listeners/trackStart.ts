import { Player, Queue, Track } from 'discord-player';

export function trackStart(player: Player) {
  player.on('trackStart', (queue: Queue<any>, track: Track) => {
    queue.metadata.send(`🎶 | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`);
  });
}
