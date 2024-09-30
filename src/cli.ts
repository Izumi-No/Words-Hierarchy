import type { ICommandHandler } from "./interfaces/ICommandHandler.ts";
import type { Hierarchy } from "./models/hierarchy.ts";
import { AnalyzerService } from "./services/analyzerService.ts";
import { StructureParserService } from "./services/structureParserService.ts";
import { measurePerformance } from "./utils/performaceHandler.ts";
import fs from "node:fs";

class AnalyzeCommandHandler implements ICommandHandler {
    handleCommand(args: string[], json: Hierarchy) {
        const depth = args.findIndex((arg) => arg === "-depth");
        if (depth === -1) {
            console.log("Missing argument for -depth");
            Deno.exit(1);
        }

        if (args[depth + 1] === undefined || Number.isNaN(Number(args[depth + 1]))) {
            console.log("Invalid depth value");
            Deno.exit(1);
        }

        const depthValue = args[depth + 1];
        args.splice(depth, 2);

        if (Number(depthValue) < 0) {
            console.log("Invalid depth value");
            Deno.exit(1);
        }

        const verboseIndex = args.findIndex((arg) => arg === "-verbose");
        if (verboseIndex === -1) {
            console.log("Missing argument for -verbose");
            Deno.exit(1);
        }

        args.splice(verboseIndex, 1);

        const verbose = true;

        if (args.length === 0) {
            console.log("Missing phrase");
            Deno.exit(1);
        }

        const phrase = args.join(" ").replaceAll('"', "").replaceAll("'", "");

        const [structureTime, structureParser] = measurePerformance(() => {
            return StructureParserService.fromJson(json);
        });

        const [analyzeTime, result] = measurePerformance(() => {
            const analyzerService = new AnalyzerService(structureParser);
            return analyzerService.analyzePhrase(phrase, Number(depthValue));
        });

        if (verbose) {
            console.log(`Structure parsing time: ${structureTime.toFixed(3)}ms`);
            console.log(`Analysis time: ${analyzeTime.toFixed(3)}ms`);
        }

        console.log(result);
    }
}

// Command manager applies Open/Closed principle.
class CommandManager {
    private commands: { [command: string]: ICommandHandler } = {};

    registerCommand(command: string, handler: ICommandHandler) {
        this.commands[command] = handler;
    }

    executeCommand(command: string, args: string[], json: Hierarchy) {
        const handler = this.commands[command];
        if (!handler) {
            console.log("Invalid command");
            Deno.exit(1);
        }
        handler.handleCommand(args, json);
    }
}

// Deno and Node CLI logic are extracted to separate classes for SRP.
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
        const json = fs.readFileSync("./dicts/hierarchy.json", "utf-8");
        const jsonHierarchy = JSON.parse(json);

        if (command) {
            this.commandManager.executeCommand(command, args, jsonHierarchy);
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
