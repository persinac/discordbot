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
      const date = new Date( parseData[parseDataKey]["last_rage_quit"] );
      if (user === "all user") {
        tempTblData.push([ parseData[parseDataKey]["player"], this.formatDate(date), parseData[parseDataKey]["counter"] ]);
      } else {
        tempTblData.push([this.formatDate(date), parseData[parseDataKey]["counter"]]);
      }
    }
    const t = table( tempTblData, { align: [ "l", "c", "c" ] });
    return "```" + t + "```";
  }

  getColumnMaxLength(defaultLength: number, jData: string, field: string, isDateColumn: boolean): number {
    let newLength = defaultLength;
    const parseData = JSON.parse(jData);

    console.log("Current field: " + field);
    for (const parseDataKey in parseData) {
      let valueToCompare = "";
      if (isDateColumn) {
        const date = new Date( parseData[parseDataKey][field] );
        valueToCompare = this.formatDate(date);
      } else {
        valueToCompare = parseData[parseDataKey][field];
      }
      newLength = Buffer.from(valueToCompare.toString()).length > newLength ? Buffer.from(valueToCompare.toString()).length : newLength;
    }
    return newLength;
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

  padSpacesToValues(value: string, numOfSpaces: number): string {
    console.log("pad spaces");
    let retValue = value.toString();
    const numOfPadding = (numOfSpaces + 2) - retValue.length;
    const prependSpaces = (numOfPadding / 2) | 0;
    const appendSpaces = numOfPadding - prependSpaces;
    retValue = " ".repeat(prependSpaces) + retValue + " ".repeat(appendSpaces);
    return retValue;
  }
}