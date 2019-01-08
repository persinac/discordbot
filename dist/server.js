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
let botChannel = undefined;
client.on("ready", () => {
    console.log("Bot has started");
});
client.on("message", (message) => {
    commandHandler.handleMessage(message);
});
client.on("error", e => {
    console.error("Discord client error!", e);
});
client.on("voiceStateUpdate", (oldMember, newMember) => {
    const newUserChannel = newMember.voiceChannel;
    const oldUserChannel = oldMember.voiceChannel;
    if (oldUserChannel === undefined && newUserChannel !== undefined) {
        console.log("JOIN");
        console.log("New: " + newMember.user.username);
        if (!botChannel && newMember.user.username !== "First Bot") {
            joinChannel(newUserChannel);
        }
    }
    else if (newUserChannel === undefined) {
        console.log("LEAVE");
    }
});
client.login(config_1.config.token);
/** Pre-startup validation of the bot config. */
function validateConfig(config) {
    if (!config.token) {
        throw new Error("You need to specify your Discord bot token!");
    }
}
const joinChannel = (channel) => {
    console.log("Joining channel");
    channel.join().then(connection => {
        console.log("channel.join");
        botChannel = channel;
        playAudio(connection, ".//how-do-you-do.mp3");
    }).catch(err => console.log(err));
};
const leaveChannel = () => {
    botChannel.leave();
    botChannel = undefined;
};
const playAudio = (connection, audioUrl) => {
    console.log(audioUrl);
    const dispatcher = connection.playFile(audioUrl);
    dispatcher.on("error", error => {
        console.log("ERROR");
        console.log(error);
    });
    dispatcher.on("end", end => {
        console.log("END");
        console.log(end);
        leaveChannel();
    });
};
//# sourceMappingURL=server.js.map