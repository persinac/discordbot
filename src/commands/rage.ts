import { Message } from "discord.js";
import { MessageBuilding } from "../utilities/message_building";
import { Command } from "./command";
import { CommandContext } from "../models/command_context";
import * as req from "request-promise-native";

export class RageCommand implements Command {
  commandNames = ["ragequit", "raging", "rageadd", "ragelist"];
  msgBldr = new MessageBuilding();

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}rage to do ragey things.`;
  }

  async runCommand(parsedUserCommand: CommandContext, user: String): Promise<void> {
    console.log(parsedUserCommand.originalMessage.toString());
    if (parsedUserCommand.originalMessage.toString().substring(1) === "ragelist") {
      await this.getAllRagers(parsedUserCommand);
    } else {
      await this.getRageQuitByName(parsedUserCommand, user);
    }
  }

  async getRageQuitByName(parsedUserCommand: CommandContext, user: String): Promise<void> {
    let r1 = "";
    await req.post("http://localhost:3000/rager?player=" + user)
      .then(function (htmlString: string) {
        r1 = htmlString;
      })
      .catch(function (err) {
        console.log(err);
      });
    const msg = this.msgBldr.buildMessage(parsedUserCommand, user, r1);
    await parsedUserCommand.originalMessage.channel.send(msg);
  }

  async getAllRagers(parsedUserCommand: CommandContext): Promise<void> {
    console.log("get all ragers");
    let r1 = "";
    await req.get("http://localhost:3000/rager/list")
      .then(function (htmlString: string) {
        r1 = htmlString;
      })
      .catch(function (err) {
        console.log(err);
      });
    const msg = this.msgBldr.buildMessage(parsedUserCommand, "all user", r1);
    await parsedUserCommand.originalMessage.channel.send(msg);
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
    await this.getRageQuitByName(parsedUserCommand, "");
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }
}
