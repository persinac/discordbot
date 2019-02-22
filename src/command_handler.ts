import { GuildMember, Message } from "discord.js";
import { Command } from "./commands/command";
import {GameListCommand} from './commands/gamelist';
import { RageCommand } from "./commands/rage";
import { CommandContext } from "./models/command_context";
import { HelpCommand } from "./commands/help";
import { reactor } from "./reactions/reactor";
import { GreetCommand } from "./commands/greet";

/** Handler for bot commands issued by users. */
export class CommandHandler {
  private commands: Command[];

  private readonly prefix: string;

  constructor(prefix: string) {
    const commandClasses = [
      // TODO: Add more commands here.
      GreetCommand,
      RageCommand,
      GameListCommand
    ];

    this.commands = commandClasses.map(commandClass => new commandClass());
    this.commands.push(new HelpCommand(this.commands));
    this.prefix = prefix;
  }

  /** Executes user commands contained in a message if appropriate. */
  async handleMessage(message: Message): Promise<void> {
    let users = "";
    message.mentions.members.forEach(function(member: GuildMember) {
      users = member.user.username;
    });

    if (message.author.bot || !this.isCommand(message)) {
      return;
    }

    const commandContext = new CommandContext(message, this.prefix);

    const allowedCommands = this.commands.filter(command => command.hasPermissionToRun(commandContext));
    const matchedCommand = this.commands.find(command => command.commandNames.includes(commandContext.parsedCommandName));

    if (!matchedCommand) {
      await message.reply(`I don't recognize that command. Try !help.`);
      await reactor.failure(message);
    } else if (!allowedCommands.includes(matchedCommand)) {
      await message.reply(`you aren't allowed to use that command. Try !help.`);
      await reactor.failure(message);
    } else {
      await matchedCommand.runCommand(commandContext, users).then(() => {
          reactor.success(message);
        }).catch(reason => {
          reactor.failure(message);
        });
    }
  }

  /** Determines whether or not a message is a user command. */
  private isCommand(message: Message): boolean {
    return message.content.startsWith(this.prefix);
  }
}
