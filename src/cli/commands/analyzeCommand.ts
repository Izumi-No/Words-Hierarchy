import type { ICommandHandler } from "../../interfaces/ICommandHandler.ts";
import type { Hierarchy } from "../../models/hierarchy.ts";
import { AnalyzerService } from "../../services/analyzerService.ts";
import { StructureParserService } from "../../services/structureParserService.ts";
import { measurePerformance } from "../../utils/performaceHandler.ts";

export class AnalyzeCommandHandler implements ICommandHandler {
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
