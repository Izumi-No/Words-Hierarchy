import type { ITreeNode } from "@/utils/nTree.ts";

export interface ITreeTraverser {
    valueAtDepth(tree: ITreeNode<string>): Record<number, ITreeNode<string>[]>;
  }