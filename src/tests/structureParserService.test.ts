import { assertEquals } from "jsr:@std/assert";
import { StructureParserService } from "../services/structureParserService.ts";
import type { Hierarchy } from "../models/hierarchy.ts";

const sampleHierarchy: Hierarchy = {
  root: {
    child1: ["grandchild1", "grandchild2"],
    child2: {
      grandchild3: ["greatgrandchild1"],
    },
  },
};

Deno.test(
  "StructureParserService - fromJson creates instance correctly",
  () => {
    const parser = StructureParserService.fromJson(sampleHierarchy);
    assertEquals(parser instanceof StructureParserService, true);
  }
);

Deno.test(
  "StructureParserService - getDepthValues returns correct nodes",
  () => {
    const parser = StructureParserService.fromJson(sampleHierarchy);

    const depthZero = parser.getDepthValues(0);
    assertEquals(depthZero.length, 1);
    assertEquals(depthZero[0].value, "root");

    const depthOne = parser.getDepthValues(1);
    assertEquals(depthOne.length, 2);
    assertEquals(depthOne.map((node) => node.value).sort(), [
      "child1",
      "child2",
    ]);

    const depthTwo = parser.getDepthValues(2);
    assertEquals(depthTwo.length, 3);
    assertEquals(depthTwo.map((node) => node.value).sort(), [
      "grandchild1",
      "grandchild2",
      "grandchild3",
    ]);

    const depthThree = parser.getDepthValues(3);
    assertEquals(depthThree.length, 1);
    assertEquals(depthThree[0].value, "greatgrandchild1");

    const depthFour = parser.getDepthValues(4);
    assertEquals(depthFour.length, 0);
  }
);
