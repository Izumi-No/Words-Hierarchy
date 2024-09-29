export function measurePerformance<T>(fn: () => T): [number, T] {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  return [end - start, result];
}
