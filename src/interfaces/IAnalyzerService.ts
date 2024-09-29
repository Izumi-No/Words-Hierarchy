export interface IAnalyzerService {
  analyzePhrase(phrase: string, depth: number): Record<string, number>;
}
