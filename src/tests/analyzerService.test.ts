import { assertEquals, assertThrows } from "jsr:@std/assert";
import { AnalyzerService } from "../services/analyzerService.ts";
import { MockStructureParserService } from "./mocks/structureParser.mock.ts";

Deno.test(
  "AnalyzerService - analyzePhrase returns correct analysis for depth 1",
  () => {
    const mockParser = new MockStructureParserService();
    const analyzerService = new AnalyzerService(mockParser);

    const result = analyzerService.analyzePhrase(
      "child1 1grandchild2 2grandchild1 nonexistent",
      1
    );

    assertEquals(result, {
      child1: 2,
      child2: 1,
    });
  }
);

Deno.test(
  "AnalyzerService - analyzePhrase returns correct analysis for depth 0",
  () => {
    const mockParser = new MockStructureParserService();
    const analyzerService = new AnalyzerService(mockParser);

    const result = analyzerService.analyzePhrase(
      "root child1 1grandchild2 2grandchild1 nonexistent",
      0
    );

    assertEquals(result, {
      root: 4,
    });
  }
);

Deno.test(
  "AnalyzerService - analyzePhrase returns correct analysis for depth 2",
  () => {
    const mockParser = new MockStructureParserService();
    const analyzerService = new AnalyzerService(mockParser);

    const result = analyzerService.analyzePhrase(
      "1grandchild1 2grandchild2 nonexistent",
      2
    );

    assertEquals(result, {
      "1grandchild1": 1,
      "2grandchild2": 1,
    });
  }
);

Deno.test(
  "AnalyzerService - analyzePhrase throws error for empty phrase",
  () => {
    const mockParser = new MockStructureParserService();
    const analyzerService = new AnalyzerService(mockParser);

    assertThrows(
      () => analyzerService.analyzePhrase("", 1),
      Error,
      "Phrase must be a non-empty string"
    );
  }
);

Deno.test("AnalyzerService - analyzePhrase handles non-existent depth", () => {
  const mockParser = new MockStructureParserService();
  const analyzerService = new AnalyzerService(mockParser);

  const result = analyzerService.analyzePhrase("child1 grandchild2", 3);

  assertEquals(result, {});
});

Deno.test(
  "AnalyzerService - analyzePhrase handles phrases with no matches",
  () => {
    const mockParser = new MockStructureParserService();
    const analyzerService = new AnalyzerService(mockParser);

    const result = analyzerService.analyzePhrase("nonexistent words", 1);

    assertEquals(result, {});
  }
);

Deno.test(
  "AnalyzerService - analyzePhrase correctly counts multiple occurrences",
  () => {
    const mockParser = new MockStructureParserService();
    const analyzerService = new AnalyzerService(mockParser);

    const result = analyzerService.analyzePhrase(
      "child1 child1 1grandchild1 1grandchild1 2grandchild1",
      1
    );

    assertEquals(result, {
      child1: 4,
      child2: 1,
    });
  }
);

Deno.test("AnalyzerService - analyzePhrase that's have 5000 words", () => {
  const mockParser = new MockStructureParserService();
  const analyzerService = new AnalyzerService(mockParser);
  const fiveThousandWords = new Array(5000).fill("1grandchild1 2grandchild1").join(" ");


  const result = analyzerService.analyzePhrase(fiveThousandWords, 1);

  assertEquals(result, {
    child1: 5000,
    child2: 5000,
  });
})