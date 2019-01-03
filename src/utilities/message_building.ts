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
    const lastRageQuitHdrLength = "Last rage quit".length;
    const countHdrLength = "Count".length;
    if (user === "all user") {
      tableHdr += "    User     |";
      tableHdrLine += "--------------";
      userHdrLength = "User".length;
    }
    console.log(data);
    console.log(parseData);
    tableHdr += "          Last rage quit       | Count \n";
    tableHdrLine += "-------------------------------------";
    msg += tableHdr + tableHdrLine + "\n";
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
    return msg;
  }

  getColumnMaxLength(defaultLength: number, jData: JSON, field: string): number {
    newLength = defaultLength;
    for (const parseDataKey in jData) {
      const date = new Date( jData[parseDataKey]["last_rage_quit"] );
      const paddedDate = this.formatDate(date);
      jData[parseDataKey]["player"];
      jData[parseDataKey]["counter"];
    }
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