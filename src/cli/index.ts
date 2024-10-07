import "reflect-metadata";
import "@/container.ts"
import { AnalyzeCommandHandler } from "@/cli/commands/analyzeCommand.ts";
import { container } from "tsyringe"
import type { ICommandManager } from "@/interfaces/ICommandManager.ts";
import type { ICLI } from "@/interfaces/ICLI.ts";


function main() {
    const commandManager = container.resolve<ICommandManager>("CommandManager");
    
    commandManager.registerCommand("analyze", new AnalyzeCommandHandler());

    const cli = container.resolve<ICLI>("CLI")
    cli.run();
    
}

main();
