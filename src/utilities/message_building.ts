import { CommandContext } from "../models/command_context";
import table = require("text-table");

export class MessageBuilding {
  public buildMessage(parsedUserCommand: CommandContext, user: String, data: string): string {
    const parseData = JSON.parse(data);
    const tempHdr: string[] = [];
    const tempTblData = [];
    if (user === "all user") {
      tempHdr.push("Player");
    }
    tempHdr.push("Last Rage Quit");
    tempHdr.push("Counter");
    tempTblData.push(tempHdr);
    for (const parseDataKey in parseData) {
      const date = new Date( parseData[parseDataKey]["reported_on"] );
      if (user === "all user") {
        tempTblData.push([ parseData[parseDataKey]["player"], this.formatDate(date), parseData[parseDataKey]["counter"] ]);
      } else {
        tempTblData.push([this.formatDate(date), parseData[parseDataKey]["counter"]]);
      }
    }
    const t = table( tempTblData, { align: [ "l", "c", "c" ] });
    return "```" + t + "```";
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    return ( monthIndex + 1 ) + "-" + day + "-" + year + " " + this.padTime(hours) + ":" + this.padTime(minutes) + ":" + this.padTime(seconds);
  }

  padTime(digit: number): string {
    if (digit < 10 ) {
      return "0" + digit.toString();
    } else {
      return digit.toString();
    }
  }
}