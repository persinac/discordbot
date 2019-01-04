import { CommandContext } from "../models/command_context";

export class MessageBuilding {
  // TODO - Justify spacing per column, center the header(s) and data based on justify
  public buildMessage(parsedUserCommand: CommandContext, user: String, data: string): string {
    let msg = "\nLet's see " + user + "'s rage quit stats:\n";
    const parseData = JSON.parse(data);
    let tableHdr = "";
    let tableHdrLine = "";
    let playerSection = "";
    let userHdrLength = 0;
    let lastRageQuitHdrLength = "Last rage quit".length;
    let countHdrLength = "Count".length;
    lastRageQuitHdrLength = this.getColumnMaxLength(lastRageQuitHdrLength, data, "last_rage_quit", true);
    const lastRageQuitHdrText = this.padSpacesToValues("Last Rage Quit", lastRageQuitHdrLength);

    if (user === "all user") {
      userHdrLength = "User".length;
      userHdrLength = this.getColumnMaxLength(userHdrLength, data, "player", false);
      tableHdr += this.padSpacesToValues("Player", userHdrLength) + "|";
    }

    countHdrLength = this.getColumnMaxLength(countHdrLength, data, "counter", false);
    const counterHdrText = this.padSpacesToValues("Count", countHdrLength);

    tableHdr += lastRageQuitHdrText + "|" + counterHdrText;
    tableHdrLine = new Array(tableHdr.length + 1).join("-");

    msg += tableHdr + "\n" + tableHdrLine + "\n";
    for (const parseDataKey in parseData) {
      const date = new Date( parseData[parseDataKey]["last_rage_quit"] );
      if (user === "all user") {
        playerSection += parseData[parseDataKey]["player"];
        playerSection += " | ";
      }
      playerSection += this.formatDate(date);
      playerSection += " |   ";
      playerSection += parseData[parseDataKey]["counter"];
      playerSection += "\n";
    }
    msg += playerSection;
    return msg;
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
      console.log("Curr val: " + valueToCompare.toString() + " length: " + valueToCompare.toString().length);
      console.log("BUFFER Curr val: " + valueToCompare.toString() + " length: " + Buffer.from(valueToCompare.toString()).length);
      console.log("BUFFER Curr val: " + valueToCompare.toString() + " length: " + this.byteLength(valueToCompare.toString()));
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
    console.log("pad spaces for " + value);
    console.log("Current length " + value.toString().length);
    console.log("default spaces: " + numOfSpaces);
    let retValue = value.toString();
    const numOfPadding = (numOfSpaces + 2) - retValue.length;
    console.log(numOfPadding);
    const prependSpaces = (numOfPadding / 2) | 0;
    console.log(prependSpaces);
    const appendSpaces = numOfPadding - prependSpaces;
    console.log(appendSpaces);

    retValue = " ".repeat(prependSpaces) + retValue + " ".repeat(appendSpaces);
    console.log("New length " + retValue.length);
    return retValue;
  }

  byteLength(str: string) {

    return Buffer.byteLength(str);
  }
}