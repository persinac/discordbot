"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const config_1 = require("./config/config");
const command_handler_1 = require("./command_handler");
validateConfig(config_1.config);
const commandHandler = new command_handler_1.CommandHandler(config_1.config.prefix);
const client = new discord_js_1.default.Client();
client.on("ready", () => {
    console.log("Bot has started");
});
client.on("message", (message) => {
    commandHandler.handleMessage(message);
});
client.on("error", e => {
    console.error("Discord client error!", e);
});
client.login(config_1.config.token);
/** Pre-startup validation of the bot config. */
function validateConfig(config) {
    if (!config.token) {
        throw new Error("You need to specify your Discord bot token!");
    }
}
//# sourceMappingURL=server.js.map