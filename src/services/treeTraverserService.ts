import type { ITreeNode } from "../utils/nTree.ts";

export class TreeTraverser {
  valueAtDepth(tree: ITreeNode<string>): Record<number, ITreeNode<string>[]> {
    const result: Record<number, ITreeNode<string>[]> = {};
    const queue: { node: ITreeNode<string>; depth: number }[] = [
      { node: tree, depth: 0 },
    ];

    while (queue.length > 0) {
      // biome-ignore lint/style/noNonNullAssertion: because we know the length is > 0
      const { node, depth } = queue.shift()!;

      if (!result[depth]) {
        result[depth] = [];
      }

      result[depth].push(node);

      for (const child of node.children) {
        queue.push({ node: child, depth: depth + 1 });
      }
    }

    return result;
  }
}
