import type { ICommandHandler } from "@/interfaces/ICommandHandler.ts";

export interface ICommandManager {
    registerCommand(command: string, handler: ICommandHandler): void;
    executeCommand<T>(command: string, args: string[], ...rest: T[] ): void;
}