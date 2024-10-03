import "reflect-metadata";
import {container} from "tsyringe"
import type { IStructureParserService } from "@/interfaces/IStructureParserService.ts";
import type { ICommandHandler } from "@/interfaces/ICommandHandler.ts";
import type { ICLI } from "@/interfaces/ICLI.ts";
import type { ICommandManager } from "@/interfaces/ICommandManager.ts";
import type { ITreeBuilder } from "@/interfaces/ITreeBuilder.ts";
import type { ITreeTraverser } from "@/interfaces/ITreeTraverser.ts";
import type { IWordMatcher } from "@/interfaces/IwordMatcher.ts";
import { StructureParserService } from "@/services/structureParserService.ts";
import { AnalyzeCommandHandler } from "@/cli/commands/analyzeCommand.ts";
import { NodeCLI } from "@/cli/cli.ts";
import { CommandManager } from "@/cli/commandManager.ts";
import { TreeBuilder } from "@/services/treeBuilderService.ts";
import { TreeTraverser } from "@/services/treeTraverserService.ts";
import { WordMatcher } from "@/services/wordMatcherService.ts";

container.register<IStructureParserService>("StructureParserService", {
    useClass: StructureParserService
});

container.register("StructureParserServiceFromJson", {
    useValue: StructureParserService.fromJson
});

container.register<ITreeBuilder>("TreeBuilder", {
    useClass: TreeBuilder
});
container.register<ITreeTraverser>("TreeTraverser", 
    { useClass: TreeTraverser }
);
container.register<ICommandHandler>("CommandHandler", {
    useClass: AnalyzeCommandHandler
});
container.registerInstance<IWordMatcher>("WordMatcher", new WordMatcher);

container.registerInstance<ICommandManager>("CommandManager",new CommandManager
);

container.registerInstance<ICLI>("CLI", new NodeCLI(container.resolve<ICommandManager>("CommandManager")));