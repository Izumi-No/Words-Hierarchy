import fs from "node:fs";
import process from "node:process";
import { CommandManager } from "./utils/commandManager.ts";
import { AnalyzeCommandHandler } from "./commands/analyzeCommand.ts";

/**
 * The Intencion of this class is to be used in Deno environment and show the diference between Node and Deno.
 * in addiction, Deno can use the most of standard library of Node. eg.: fs, process and etc.
 */
class DenoCLI {
    private commandManager: CommandManager;

    constructor(commandManager: CommandManager) {
        this.commandManager = commandManager;
    }

    run() {
        const args = Deno.args;
        if (args.length === 0) {
            console.log("Missing command");
            Deno.exit(1);
        }

        const command = args.shift();
        const json = JSON.parse(Deno.readTextFileSync("./dicts/hierarchy.json"));

        if (command) {
            this.commandManager.executeCommand(command, args, json);
        }
    }
}

class NodeCLI {
    private commandManager: CommandManager;

    constructor(commandManager: CommandManager) {
        this.commandManager = commandManager;
    }

    run() {
        const args = process.argv.slice(2);
        if (args.length === 0) {
            console.log("Missing command");
            process.exit(1);
        }

        const command = args.shift();
        const json = JSON.parse(fs.readFileSync("./dicts/hierarchy.json", "utf-8"));

        if (command) {
            this.commandManager.executeCommand(command, args, json);
        }
    }
}

// Main entry point. Applies Dependency Inversion Principle.
function main() {
    const commandManager = new CommandManager();
    commandManager.registerCommand("analyze", new AnalyzeCommandHandler());

    if (typeof Deno !== "undefined") {
        const cli = new DenoCLI(commandManager);
        cli.run();
    } else {
        const cli = new NodeCLI(commandManager);
        cli.run();
    }
}

main();
