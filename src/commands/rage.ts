import { Message } from "discord.js";
import { MessageBuilding } from "../utilities/message_building";
import { Command } from "./command";
import { CommandContext } from "../models/command_context";
import * as req from "request-promise-native";

export class RageCommand implements Command {
  commandNames = ["ragequit", "rageadd", "ragelist", "rageuser"];
  msgBldr = new MessageBuilding();

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}${this.commandNames.join(", ")} to do ragey things.`;
  }

  async runCommand(parsedUserCommand: CommandContext, user: string): Promise<void> {
    const originalMessage = parsedUserCommand.originalMessage.toString();
    const cmd = originalMessage.split(" ", 1)[0].substring(1);
    switch (cmd) {
      case "ragelist": {
        await this.getAllRagers(parsedUserCommand);
        break;
      }
      case "rageuser": {
        await this.getRageQuitByName(parsedUserCommand, user);
        break;
      }
      case "rageadd": {
        await this.addNewRager(parsedUserCommand, user);
        break;
      }
      case "ragequit": {
        await this.updateRager(parsedUserCommand, user);
        break;
      }
    }
  }

  async getRageQuitByName(parsedUserCommand: CommandContext, user: string): Promise<void> {
    let r1 = "";
    console.log(user);
    await req.post("http://localhost:48330/rager/" + user)
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
    await req.get("http://localhost:48330/rager/list")
      .then(function (htmlString: string) {
        r1 = htmlString;
      })
      .catch(function (err) {
        console.log(err);
      });
    const msg = this.msgBldr.buildMessage(parsedUserCommand, "all user", r1);
    await parsedUserCommand.originalMessage.channel.send(msg);
  }

  async addNewRager(parsedUserCommand: CommandContext, user: string): Promise<void> {
    let r1 = "";
    await req.post("http://localhost:48330/rager/" + user)
      .then(function (htmlString: string) {
        r1 = htmlString;
      })
      .catch(function (err) {
        console.log(err);
      });
    r1 = JSON.parse(r1);
    if (r1[0] === undefined) {
      await req.post("http://localhost:48330/rager/new/" + user)
        .then(function (htmlString: string) {
          r1 = htmlString;
        })
        .catch(function (err) {
          console.log(err);
        });
      await parsedUserCommand.originalMessage.channel.send("Added " + user + " to the darkside... let's see how how many times we can get them to ragequit");
    } else {
      await parsedUserCommand.originalMessage.channel.send("User already exists - updating");
      this.updateRager(parsedUserCommand, user);
    }
  }

  async updateRager(parsedUserCommand: CommandContext, user: string): Promise<void> {
    let r1 = "";
    await req.post("http://localhost:48330/rager/" + user)
      .then(function (htmlString: string) {
        r1 = htmlString;
      })
      .catch(function (err) {
        console.log(err);
      });
    const r2 = JSON.parse(r1);
    await req.post("http://localhost:48330/rager/update/" + r2[0].id)
      .then(function (htmlString: string) {
        r1 = htmlString;
      })
      .catch(function (err) {
        console.log(err);
      });
    await parsedUserCommand.originalMessage.channel.send("Updated " + user + " rage quit counter. Let's keep the rage building!");
    this.getRageQuitByName(parsedUserCommand, user);
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }
}
