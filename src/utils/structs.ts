export function useComp<T>(func: () => T): T {
  return func();
}

export function useStateVar<T>(func: () => T): T {
  return func();
}

export function useHooks<T>(func: () => T): T {
  return func();
}
