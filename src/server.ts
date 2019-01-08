import Discord, { Message, VoiceChannel, VoiceConnection } from "discord.js";
import { config, BotConfig } from "./config/config";
import { CommandHandler } from "./command_handler";
import path = require("path");

validateConfig(config);

const commandHandler = new CommandHandler(config.prefix);
const client = new Discord.Client();
let botChannel: VoiceChannel = undefined;

client.on("ready", () => {
  console.log("Bot has started");
});

client.on("message", (message: Message) => {
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
  } else if (newUserChannel === undefined) {
    console.log("LEAVE");
  }
});

client.login(config.token);

/** Pre-startup validation of the bot config. */
function validateConfig(config: BotConfig) {
  if (!config.token) {
    throw new Error("You need to specify your Discord bot token!");
  }
}

const joinChannel = (channel: VoiceChannel) => {
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

const playAudio = (connection: VoiceConnection, audioUrl: string) => {
  console.log(audioUrl + " " + path.resolve(audioUrl) + " " + path.normalize(audioUrl));
  const dispatcher = connection.playFile(audioUrl, { volume: 1 });
  console.log(dispatcher.player);
  dispatcher.on("debug", debugg => {
    console.log("DEBUG DISPATCHER");
    console.log(debugg);
  });
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
