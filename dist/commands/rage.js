"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_building_1 = require("../utilities/message_building");
const req = __importStar(require("request-promise-native"));
class RageCommand {
    constructor() {
        this.commandNames = ["ragequit", "rageadd", "ragelist", "rageuser"];
        this.msgBldr = new message_building_1.MessageBuilding();
    }
    getHelpMessage(commandPrefix) {
        return `Use ${commandPrefix}${this.commandNames.join(", ")} to do ragey things.`;
    }
    async runCommand(parsedUserCommand, user) {
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
                await this.addNewRager(parsedUserCommand, user);
                break;
            }
        }
    }
    async getRageQuitByName(parsedUserCommand, user) {
        let r1 = "";
        console.log(user);
        await req.post("http://localhost:48330/rager/" + user)
            .then(function (htmlString) {
            r1 = htmlString;
        })
            .catch(function (err) {
            console.log(err);
        });
        const msg = this.msgBldr.buildMessage(parsedUserCommand, "rage", user, r1);
        await parsedUserCommand.originalMessage.channel.send(msg);
    }
    async getAllRagers(parsedUserCommand) {
        console.log("get all ragers");
        let r1 = "";
        await req.get("http://localhost:48330/rager/list")
            .then(function (htmlString) {
            r1 = htmlString;
        })
            .catch(function (err) {
            console.log(err);
        });
        const msg = this.msgBldr.buildMessage(parsedUserCommand, "rage", "all user", r1);
        await parsedUserCommand.originalMessage.channel.send(msg);
    }
    async addNewRager(parsedUserCommand, user) {
        let r1 = "";
        console.log(parsedUserCommand.originalMessage.author.username);
        await req.post("http://localhost:48330/rager/new/" + user + "&" + parsedUserCommand.originalMessage.author.username)
            .then(function (htmlString) {
            r1 = htmlString;
        })
            .catch(function (err) {
            console.log(err);
        });
        await parsedUserCommand.originalMessage.channel.send("Added " + user + " to the darkside... let's see how how many times we can get them to ragequit");
    }
    hasPermissionToRun(parsedUserCommand) {
        return true;
    }
}
exports.RageCommand = RageCommand;
//# sourceMappingURL=rage.js.map