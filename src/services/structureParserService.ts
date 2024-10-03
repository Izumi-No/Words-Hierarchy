// StructureParserService.ts
import type { IStructureParserService } from "@/interfaces/IStructureParserService.ts";
import type { Hierarchy } from "@/models/hierarchy.ts";
import type { ITreeNode } from "@/utils/nTree.ts";
import { TreeBuilder } from "@/services/treeBuilderService.ts";
import { TreeTraverser } from "@/services/treeTraverserService.ts";

export class StructureParserService implements IStructureParserService {
  private _tree: ITreeNode<string> | undefined;
  private _hashMap: Record<number, ITreeNode<string>[]> = {};

  private constructor(json: Hierarchy) {
    const treeBuilder = new TreeBuilder();
    this._tree = treeBuilder.jsonToTree(json);

    if (this._tree) {
      const treeTraverser = new TreeTraverser();
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
