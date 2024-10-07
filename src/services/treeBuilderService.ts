import type { ITreeBuilder } from "@/interfaces/ITreeBuilder.ts";
import type { Hierarchy } from "@/models/hierarchy.ts";
import { TreeNode } from "@/utils/nTree.ts";



export class TreeBuilder implements ITreeBuilder  {
  jsonToTree(json: Hierarchy): TreeNode<string> | undefined {
    const processNode = (
      key: string,
      value: Hierarchy[keyof Hierarchy]
    ): TreeNode<string> => {
      const node = new TreeNode(key);
      if (Array.isArray(value)) {
        for (const item of value) {
          node.addChild(new TreeNode(item));
        }
      } else if (typeof value === "object") {
        for (const [childKey, childValue] of Object.entries(value)) {
          const childNode = processNode(childKey, childValue);

          node.addChild(childNode);
        }
      }
      return node;
    };

    let rootNode: TreeNode<string> | undefined;
    for (const [key, value] of Object.entries(json)) {
      rootNode = processNode(key, value);
    }
    return rootNode;
  }
}
