import type { IStructureParserService } from "@/interfaces/IStructureParserService.ts";

import type{ IWordMatcher } from "@/interfaces/IwordMatcher.ts";
import { container } from "tsyringe";

export class AnalyzerService {
  
  private wordMatcher: IWordMatcher

  constructor(private structureParser: IStructureParserService, ) {
    this.wordMatcher = container.resolve<IWordMatcher>("WordMatcher");
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
