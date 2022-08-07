import { commandsArray } from 'commands';
import { Client } from 'discord.js';

export function ready(client: Client): void {
  client.on('ready', async () => {
    if (!client.user || !client.application) {
      return;
    }

    await client.application.commands.set(commandsArray);

    console.log(`${client.user.username} is online.`);
  });
}
