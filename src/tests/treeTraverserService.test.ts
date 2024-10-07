import "reflect-metadata"
import "@/container.ts"

import { assertEquals } from "jsr:@std/assert";
import { TreeTraverser } from "@/services/treeTraverserService.ts";
import { TreeMock } from "@/tests/mocks/nTree.mock.ts";
import { TraversedTreeMock } from "@/tests/mocks/traversedTree.mock.ts";

Deno.test("TreeTraverser - valueAtDepth returns correct structure", () => {
  const treeTraverser = new TreeTraverser();

  const tree = TreeMock;

  const result = treeTraverser.valueAtDepth(tree);

  assertEquals(result, TraversedTreeMock);
});
