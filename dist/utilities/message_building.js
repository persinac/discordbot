"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageBuilding {
    buildMessage(parsedUserCommand, user, data) {
        let msg = "\nLet's see " + user + "'s rage quit stats:\n";
        const parseData = JSON.parse(data);
        let tableHdr = "";
        let tableHdrLine = "";
        if (user === "all user") {
            tableHdr += "    User     |";
            tableHdrLine += "--------------";
        }
        // console.log(data);
        // console.log(parseData);
        tableHdr += "          Last rage quit       | Count \n";
        tableHdrLine += "-------------------------------------";
        msg += tableHdr + tableHdrLine + "\n";
        for (const parseDataKey in parseData) {
            const date = new Date(parseData[parseDataKey]["last_rage_quit"]);
            if (user === "all user") {
                msg += parseData[parseDataKey]["player"];
                msg += " | ";
            }
            msg += this.formatDate(date);
            msg += " |   ";
            msg += parseData[parseDataKey]["counter"];
            msg += "\n";
        }
        return msg;
    }
    formatDate(date) {
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const minutes = date.getMinutes();
        const hours = date.getHours();
        const seconds = date.getSeconds();
        return (monthIndex + 1) + "-" + day + "-" + year + " " + this.padTime(hours) + ":" + this.padTime(minutes) + ":" + this.padTime(seconds);
    }
    padTime(digit) {
        if (digit < 10) {
            return "0" + digit.toString();
        }
        else {
            return digit;
        }
    }
}
exports.MessageBuilding = MessageBuilding;
//# sourceMappingURL=message_building.js.map