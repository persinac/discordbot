/**
 * Discord bot env_config.
 *
 * Revisions to this file should not be committed to the repository.
 */
import config from "config";

export type BotConfig = {
  /** the Discord bot token. */
  token: string,
  /** Prefix used for bot commands. */
  prefix: string,
  /** The name of the role that gives ultimate power over the bot. */
  botOwnerRoleName: string,
  /** The bot will add reactions to the command messages indicating success or failure. */
  enableReactions: boolean,
};

export let env_config: BotConfig = {
  token: config.get("token"),
  prefix: config.get("prefix"),
  botOwnerRoleName: "bot-owner",
  enableReactions: true,
};
