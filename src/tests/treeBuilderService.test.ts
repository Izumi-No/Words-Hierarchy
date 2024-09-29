import { assertEquals } from "jsr:@std/assert";
import { TreeBuilder } from "../services/treeBuilderService.ts";
import type { Hierarchy } from "../models/hierarchy.ts";

const sampleHierarchy: Hierarchy = {
  root: {
    child1: ["grandchild1", "grandchild2"],
    child2: {
      grandchild3: ["greatgrandchild1"],
    },
  },
};

Deno.test("TreeBuilder - jsonToTree creates correct tree structure", () => {
  const treeBuilder = new TreeBuilder();
  const tree = treeBuilder.jsonToTree(sampleHierarchy);

  assertEquals(tree?.value, "root");
  assertEquals(tree?.children.length, 2);

  const [child1, child2] = tree?.children ?? [];
  assertEquals(child1.value, "child1");
  assertEquals(child1.children.length, 2);
  assertEquals(child1.children.map((node) => node.value).sort(), [
    "grandchild1",
    "grandchild2",
  ]);

  assertEquals(child2.value, "child2");
  assertEquals(child2.children.length, 1);
  assertEquals(child2.children[0].value, "grandchild3");
  assertEquals(child2.children[0].children.length, 1);
  assertEquals(child2.children[0].children[0].value, "greatgrandchild1");
});
