import { assertEquals } from "jsr:@std/assert";
import { WordMatcher } from "@/services/wordMatcherService.ts";
import { MockStructureParserService } from "@/tests/mocks/structureParser.mock.ts";

Deno.test("WordMatcher - matchWords returns correct matches", () => {
  const wordMatcher = new WordMatcher();
  const structureParser = new MockStructureParserService();
  const nodes = structureParser.getDepthValues(1);

  const result = wordMatcher.matchWords(
    ["1grandchild1", "2grandchild1"],
    nodes
  );

  assertEquals(result, {
    child1: 1,
    child2: 1,
  });
});
