export class ParseMessageArguments {
  public parseArgumentsForGameAdd(originalMessage: string, gameLongCommand: string, gameShortCommand: string): string[] {
    const idxOfCommandToFind: Number = originalMessage.indexOf(gameLongCommand);
    const idxOfSecondCommandToFind: Number = gameShortCommand.length > 0 ? originalMessage.indexOf(gameShortCommand) : 0;
    let gameLongArg: string = "";
    let gameShortArg: string = "";
    const returnValue: string[] = [];
    if (idxOfCommandToFind > 0 && idxOfSecondCommandToFind > 0) {
      if (idxOfCommandToFind < idxOfSecondCommandToFind) {
        gameLongArg = originalMessage.substring(originalMessage.indexOf(gameLongCommand) + 2, originalMessage.indexOf(gameShortCommand)).trim();
        gameShortArg = originalMessage.substring(originalMessage.indexOf(gameShortCommand) + 2).trim();
      } else {
        gameShortArg = originalMessage.substring(originalMessage.indexOf(gameShortCommand) + 2, originalMessage.indexOf(gameLongCommand)).trim();
        gameLongArg = originalMessage.substring(originalMessage.indexOf(gameLongCommand) + 2).trim();
      }
      returnValue.push(gameLongArg, gameShortArg);
    }
    return returnValue;
  }
}
