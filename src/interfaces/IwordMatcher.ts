import type { ITreeNode } from "@/utils/nTree.ts";

export interface IWordMatcher {
    matchWords(
      words: string[],
      nodes: ITreeNode<string>[]
    ): Record<string, number>;
    
  }