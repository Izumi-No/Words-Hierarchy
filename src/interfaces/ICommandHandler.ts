import type { Hierarchy } from "../models/hierarchy.ts";

export interface ICommandHandler {
    handleCommand(args: string[], json: Hierarchy): void;
}