// AnalyzerService.ts
import type { IAnalyzerService } from "@/interfaces/IAnalyzerService.ts";
import type { IStructureParserService } from "@/interfaces/IStructureParserService.ts";

import { WordMatcher } from "./wordMatcherService.ts";

export class AnalyzerService implements IAnalyzerService {
  private wordMatcher: WordMatcher;

  constructor(private structureParser: IStructureParserService) {
    this.wordMatcher = new WordMatcher();
  }

  analyzePhrase(phrase: string, depth: number): Record<string, number> {
    if (!phrase || typeof phrase !== "string") {
      throw new Error("Phrase must be a non-empty string");
    }

    const words = phrase.trim().split(/\s+/);
    const nodesAtDepth = this.structureParser.getDepthValues(depth);

    return this.wordMatcher.matchWords(words, nodesAtDepth);
  }
}
