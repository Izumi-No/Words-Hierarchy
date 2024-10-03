// StructureParserService.ts
import type { IStructureParserService } from "@/interfaces/IStructureParserService.ts";
import type { Hierarchy } from "@/models/hierarchy.ts";
import type { ITreeNode } from "@/utils/nTree.ts";
import type { ITreeBuilder } from "@/interfaces/ITreeBuilder.ts";
import type { ITreeTraverser } from "@/interfaces/ITreeTraverser.ts";

import {container} from "tsyringe";

export class StructureParserService implements IStructureParserService {
  private _tree: ITreeNode<string> | undefined;
  private _hashMap: Record<number, ITreeNode<string>[]> = {};

  

  constructor(json: Hierarchy) {
    const treeBuilder = container.resolve<ITreeBuilder>("TreeBuilder");

    this._tree = treeBuilder.jsonToTree(json);

    if (this._tree) {
      const treeTraverser = container.resolve<ITreeTraverser>("TreeTraverser");
      this._hashMap = treeTraverser.valueAtDepth(this._tree);
    }
  }

  static fromJson(json: Hierarchy): StructureParserService {
    return new StructureParserService(json);
  }

  getDepthValues(depth: number): ITreeNode<string>[] {
    return this._hashMap[depth] || [];
  }
}
