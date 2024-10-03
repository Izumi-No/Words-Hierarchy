import type { ICommandHandler } from "../interfaces/ICommandHandler.ts";
import type { Hierarchy } from "../models/hierarchy.ts";
import process from "node:process";

export class CommandManager {
    private commands: { [command: string]: ICommandHandler } = {};

    registerCommand(command: string, handler: ICommandHandler) {
        this.commands[command] = handler;
    }

    executeCommand(command: string, args: string[], json: Hierarchy) {
        const handler = this.commands[command];
        if (!handler) {
            console.log("Invalid command");
           
                process.exit(1);
            
        }
        handler.handleCommand(args, json);
    }
}