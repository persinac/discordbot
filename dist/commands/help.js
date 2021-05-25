"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HelpCommand {
    constructor(commands) {
        this.commandNames = ["help", "halp", "hlep"];
        this.commands = commands;
    }
    async runCommand(commandContext) {
        const allowedCommands = this.commands.filter(command => command.hasPermissionToRun(commandContext));
        if (commandContext.args.length == 0) {
            // No command specified, give the user a list of all commands they can use.
            const commandNames = allowedCommands.map(command => {
                console.log(command.commandNames.join(", "));
                return command.commandNames.join(", ");
            });
            await commandContext.originalMessage.reply(`here is a list of commands you can run: ${commandNames.join(", ")}. Try (help ${commandNames[0]} to learn more about one of them.`);
            return;
        }
        const matchedCommand = this.commands.find(command => command.commandNames.includes(commandContext.args[0]));
        if (!matchedCommand) {
            await commandContext.originalMessage.reply("I don't know about that command :(. Try (help to find all commands you can use.");
            return Promise.reject("Unrecognized command");
        }
        else if (allowedCommands.includes(matchedCommand)) {
            await commandContext.originalMessage.reply(this.buildHelpMessageForCommand(matchedCommand, commandContext));
        }
    }
    buildHelpMessageForCommand(command, context) {
        return `${command.getHelpMessage(context.commandPrefix)}\nCommand aliases: ${command.commandNames.join(", ")}`;
    }
    hasPermissionToRun(commandContext) {
        return true;
    }
    getHelpMessage(commandPrefix) {
        return "I think you already know how to use this command...";
    }
}
exports.HelpCommand = HelpCommand;
//# sourceMappingURL=help.js.map