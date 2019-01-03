"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** A user-given command extracted from a message. */
class CommandContext {
    constructor(message, prefix) {
        this.commandPrefix = prefix;
        const splitMessage = message.content.slice(prefix.length).trim().split(/ +/g);
        this.parsedCommandName = splitMessage.shift().toLowerCase();
        this.args = splitMessage;
        this.originalMessage = message;
    }
}
exports.CommandContext = CommandContext;
//# sourceMappingURL=command_context.js.map