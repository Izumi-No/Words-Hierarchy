import type { Hierarchy } from "@/models/hierarchy.ts";
import type { ITreeNode } from "@/utils/nTree.ts";

export interface ITreeBuilder {
    jsonToTree(json: Hierarchy): ITreeNode<string> | undefined;
  }