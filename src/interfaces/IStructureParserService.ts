import type { ITreeNode } from "../utils/nTree.ts";

export interface IStructureParserService {
  getDepthValues(depth: number): ITreeNode<string>[];
}

export type fromJson = <T>(json: T) => IStructureParserService

