import { Player } from 'discord-player';
import { Client } from 'discord.js';
import { SPINAMP, spinAmpExtractor } from 'extractors/spinamp';
import { listeners } from './listeners';

let player: Player;

export function getPlayer(client: Client): Player {
  if (player) {
    return player;
  }

  player = new Player(client);

  player.use(SPINAMP, spinAmpExtractor);

  listeners.error(player);
  listeners.connectionError(player);
  listeners.botDisconnect(player);
  listeners.channelEmpty(player);
  listeners.queueEnd(player);
  listeners.trackAdd(player);
  listeners.trackStart(player);

  return player;
}
