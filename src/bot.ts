import { Client, IntentsBitField } from 'discord.js';
import * as dotenv from 'dotenv';
import { listeners } from 'listeners';

function retrieveEnvironmentVariables() {
  dotenv.config();

  const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

  if (DISCORD_BOT_TOKEN === undefined) {
    throw new Error('DISCORD_BOT_TOKEN must be available in the environment file or as an environment variable.');
  }

  return {
    DISCORD_BOT_TOKEN
  };
}

const { DISCORD_BOT_TOKEN } = retrieveEnvironmentVariables();

console.log('Starting.');

const client = new Client({
  intents: [IntentsBitField.Flags.GuildVoiceStates, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.Guilds]
});

listeners.ready(client);
listeners.interactionCreate(client);

client.login(DISCORD_BOT_TOKEN);
