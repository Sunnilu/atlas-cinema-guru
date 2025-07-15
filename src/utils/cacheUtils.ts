// src/utils/cacheUtils.ts
export const clearFirestoreCache = () => {
  const map = (globalThis as Record<string, unknown>)['_reactFirePreloadedObservables'] as
    | Map<string, unknown>
    | undefined;
  
  if (map) {
    Array.from(map.keys())
      .filter((key: string) => key.includes('firestore'))
      .forEach((key: string) => map.delete(key));
  }
};