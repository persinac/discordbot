import { Message } from "discord.js";
import { MessageBuilding } from "../utilities/message_building";
import { Command } from "./command";
import { CommandContext } from "../models/command_context";
import * as req from "request-promise-native";

export class GameListCommand implements Command {
  commandNames = ["games", "gameget", "gameadd", "gamerem"];
  msgBldr = new MessageBuilding();

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}${this.commandNames.join(", ")} to do game stuff.`;
  }

  async runCommand(parsedUserCommand: CommandContext, game: string): Promise<void> {
    const originalMessage = parsedUserCommand.originalMessage.toString();
    const cmd = originalMessage.split(" ", 1)[0].substring(1);
    switch (cmd) {
      case "games": {
        await this.getAllGames(parsedUserCommand);
        break;
      }
      case "gameget": {
        const game_short = originalMessage.split(" ")[1];
        await this.getGameByAbbreviation(parsedUserCommand, game_short);
        break;
      }
      case "gameadd": {
        // handle arguments -l -a (long / short)
        // TODO add parser to utilities class
        if (originalMessage.indexOf("-l ") > 0 && originalMessage.indexOf("-a ") > 0) {
          const game_long = originalMessage.substring(originalMessage.indexOf("-l") + 2, originalMessage.indexOf("-a") - 1).trim();
          const game_short = originalMessage.substring(originalMessage.indexOf("-a") + 2).trim();
          if (game_short.length > 4) {
            await parsedUserCommand.originalMessage.channel.send("Abbreviations must be less than or equal to 4 characters in length");
          } else {
            await this.addNewGame(parsedUserCommand, game_long, game_short);
          }
        } else {
          await parsedUserCommand.originalMessage.channel.send("Did not find -l (long name) or -a (abbreviation), please use these arguments to add a game. Remember to add a space between arguments and values.");
        }
        break;
      }
      case "gamerem": {
        const game_short = originalMessage.split(" ")[1];
        console.log(cmd + " | " + game_short + " | " + originalMessage);
        await this.removeGame(parsedUserCommand, game_short);
        break;
      }
    }
  }

  async getGameByAbbreviation(parsedUserCommand: CommandContext, game: string): Promise<void> {
    let r1 = "";
    await req.post("http://localhost:48330/gamelist/" + game)
      .then(function (htmlString: string) {
        r1 = htmlString;
      })
      .catch(function (err) {
        console.log(err);
      });
    const msg = this.msgBldr.buildGamelistMessage(parsedUserCommand, r1);
    await parsedUserCommand.originalMessage.channel.send(msg);
  }

  async getAllGames(parsedUserCommand: CommandContext): Promise<void> {
    let r1 = "";
    await req.get("http://localhost:48330/gamelist/list")
      .then(function (htmlString: string) {
        r1 = htmlString;
      })
      .catch(function (err) {
        console.log(err);
      });
    const msg = this.msgBldr.buildGamelistMessage(parsedUserCommand, r1);
    await parsedUserCommand.originalMessage.channel.send(msg);
  }

  async addNewGame(parsedUserCommand: CommandContext, game: string, game_short: string): Promise<void> {
    let r1 = "";
    await req.post("http://localhost:48330/gamelist/new/" + game + "&" + game_short)
      .then(function (htmlString: string) {
        r1 = htmlString;
      })
      .catch(function (err) {
        console.log(err);
      });
    await parsedUserCommand.originalMessage.channel.send("Added " + game + " to the list... who will rage first?");
  }

  async removeGame(parsedUserCommand: CommandContext, game: string): Promise<void> {
    let r1 = "";
    console.log(parsedUserCommand.originalMessage.author.username);
    await req.post("http://localhost:48330/gamelist/remove/" + game)
      .then(function (htmlString: string) {
        r1 = htmlString;
      })
      .catch(function (err) {
        console.log(err);
      });
    await parsedUserCommand.originalMessage.channel.send(game + " is now inactive");
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }
}
