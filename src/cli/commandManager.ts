import type { ICommandHandler } from "../interfaces/ICommandHandler.ts";
import type{ ICommandManager } from "@/interfaces/ICommandManager.ts";
import process from "node:process";

export class CommandManager implements ICommandManager {
    private commands: { [command: string]: ICommandHandler } = {};

    registerCommand(command: string, handler: ICommandHandler) {
        this.commands[command] = handler;
    }

    executeCommand<T>(command: string, args: string[], ...rest: T[]) {
        const handler = this.commands[command];
        if (!handler) {
            console.log("Invalid command");
           
                process.exit(1);
            
        }
        handler.handleCommand.apply(handler, [args, ...rest]);
    }
}