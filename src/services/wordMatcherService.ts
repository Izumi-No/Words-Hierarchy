import type { ITreeNode, TreeNode } from "../utils/nTree.ts";

export class WordMatcher {
  matchWords(
    words: string[],
    nodes: ITreeNode<string>[]
  ): Record<string, number> {
    const allDescendantsString: Record<string, string[]> =
      this.getAllDescendants(nodes);
    const result: Record<string, number> = {};

    for (const word of words) {
      for (const index in allDescendantsString) {
        if (allDescendantsString[index].includes(word)) {
          result[index] = (result[index] || 0) + 1;
        }
      }
    }

    return result;
  }

  private getAllDescendants(
    nodes: ITreeNode<string>[]
  ): Record<string, string[]> {
    const allDescendantsString: Record<string, string[]> = {};

    for (const node of nodes) {
      const index = node.value;
      if (!allDescendantsString[index]) {
        allDescendantsString[index] = [];
      }

      const stack = [node];

      while (stack.length > 0) {
        const currentNode = stack.pop() as TreeNode<string>;
        allDescendantsString[index].push(currentNode.value);

        for (const child of currentNode.children) {
          stack.push(child);
        }
      }
    }

    return allDescendantsString;
  }
}
