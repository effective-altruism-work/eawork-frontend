export function useComp<T>(func: () => T): T {
  return func();
}

export function useState<T>(func: () => T): T {
  return func();
}
