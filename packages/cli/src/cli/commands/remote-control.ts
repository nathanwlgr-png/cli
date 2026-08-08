import type { Command } from "commander";
import open from "open";
import type { CLIContext, RunCommandResult } from "@/cli/types.js";
import { Base44Command, getRemoteControlUrl } from "@/cli/utils/index.js";

async function openRemoteControl({
  isNonInteractive,
}: CLIContext): Promise<RunCommandResult> {
  const url = getRemoteControlUrl();

  if (!isNonInteractive) {
    await open(url);
  }

  return { outroMessage: `Remote control session opened at ${url}` };
}

export function getRemoteControlCommand(): Command {
  return new Base44Command("remote-control")
    .description("Open a remote-control session for the current app")
    .addHelpText(
      "after",
      `
Examples:
  Open the session in your browser:
    $ base44 remote-control

  Print the session URL (e.g. to share with another machine):
    $ base44 remote-control`,
    )
    .action(openRemoteControl);
}
