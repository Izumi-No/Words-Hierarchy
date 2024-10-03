import type { ITreeNode } from "../utils/nTree.ts";

export interface IStructureParserService {
  getDepthValues(depth: number): ITreeNode<string>[];
}

