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
        this.commandNames = ["ragequit", "raging", "rageadd", "ragelist"];
        this.msgBldr = new message_building_1.MessageBuilding();
    }
    getHelpMessage(commandPrefix) {
        return `Use ${commandPrefix}rage to do ragey things.`;
    }
    async runCommand(parsedUserCommand, user) {
        console.log(parsedUserCommand.originalMessage.toString());
        if (parsedUserCommand.originalMessage.toString().substring(1) === "ragelist") {
            await this.getAllRagers(parsedUserCommand);
        }
        else {
            await this.getRageQuitByName(parsedUserCommand, user);
        }
    }
    async getRageQuitByName(parsedUserCommand, user) {
        let r1 = "";
        await req.post("http://localhost:3000/rager?player=" + user)
            .then(function (htmlString) {
            r1 = htmlString;
        })
            .catch(function (err) {
            console.log(err);
        });
        const msg = this.msgBldr.buildMessage(parsedUserCommand, user, r1);
        await parsedUserCommand.originalMessage.channel.send(msg);
    }
    async getAllRagers(parsedUserCommand) {
        console.log("get all ragers");
        let r1 = "";
        await req.get("http://localhost:3000/rager/list")
            .then(function (htmlString) {
            r1 = htmlString;
        })
            .catch(function (err) {
            console.log(err);
        });
        const msg = this.msgBldr.buildMessage(parsedUserCommand, "all user", r1);
        await parsedUserCommand.originalMessage.channel.send(msg);
    }
    async run(parsedUserCommand) {
        await this.getRageQuitByName(parsedUserCommand, "");
    }
    hasPermissionToRun(parsedUserCommand) {
        return true;
    }
}
exports.RageCommand = RageCommand;
//# sourceMappingURL=rage.js.map