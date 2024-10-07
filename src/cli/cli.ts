import type { ICommandManager } from "@/interfaces/ICommandManager.ts";
import process from "node:process"
import fs from "node:fs";

import {inject} from "tsyringe"

/**
 * The Intencion of this class is to be used in Deno environment and show the diference between Node and Deno.
 * in addiction, Deno can use the most of standard library of Node. eg.: fs, process and etc.
 */
export class _DenoCLI {
    constructor(@inject("CommandManager") private commandManager: ICommandManager) {
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

export class NodeCLI {

    constructor(@inject("CommandManager") private commandManager: ICommandManager) {
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