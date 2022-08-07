import { Command, CommandName } from './command';
import { Hello } from './hello';
import { Play } from './play';

export type Commands = Record<CommandName, Command>;

export const commands: Commands = {
  hello: Hello,
  play: Play
};
export const commandNames: CommandName[] = Object.keys(commands) as (keyof Commands)[];
export const commandsArray: Command[] = Object.values(commands);

export function getCommand(name: CommandName): Command {
  return commands[name];
}

export function isCommandName(name: string): name is CommandName {
  return commandNames.find((commandName) => commandName === name) !== undefined;
}
