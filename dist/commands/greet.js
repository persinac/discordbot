"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GreetCommand {
    constructor() {
        this.commandNames = ["greet", "hello"];
    }
    getHelpMessage(commandPrefix) {
        return `Use ${commandPrefix}greet to get a greeting.`;
    }
    async runCommand(parsedUserCommand) {
        await parsedUserCommand.originalMessage.reply("Who's raging tonight?");
    }
    hasPermissionToRun(parsedUserCommand) {
        return true;
    }
}
exports.GreetCommand = GreetCommand;
//# sourceMappingURL=greet.js.map