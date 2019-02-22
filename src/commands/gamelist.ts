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
    const game_short = "";
    switch (cmd) {
      case "games": {
        await this.getAllGames(parsedUserCommand);
        break;
      }
      case "gameget": {
        await this.getGameByAbbreviation(parsedUserCommand, game);
        break;
      }
      case "gameadd": {
        await this.addNewGame(parsedUserCommand, game, game_short);
        break;
      }
      case "gamerem": {
        await this.removeGame(parsedUserCommand, game);
        break;
      }
    }
  }

  async getGameByAbbreviation(parsedUserCommand: CommandContext, game: string): Promise<void> {
    let r1 = "";
    console.log(game);
    await req.post("http://localhost:48330/gamelist/" + game)
      .then(function (htmlString: string) {
        r1 = htmlString;
      })
      .catch(function (err) {
        console.log(err);
      });
    const msg = this.msgBldr.buildMessage(parsedUserCommand, game, r1);
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
    const msg = this.msgBldr.buildMessage(parsedUserCommand, "allgames", r1);
    await parsedUserCommand.originalMessage.channel.send(msg);
  }

  async addNewGame(parsedUserCommand: CommandContext, game: string, game_short: string): Promise<void> {
    let r1 = "";
    console.log(parsedUserCommand.originalMessage.author.username);
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
