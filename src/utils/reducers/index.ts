export function Merge<T = Record<any, any>>(initialMap: T, newMap: T) {
  // TODO: Suspect that this probably optimizes if the reference is unchanged. Verify.
  Object.keys(newMap ?? {}).forEach((key) => {
    initialMap[key] = newMap[key];
  });
  return initialMap;
}
