export function useComp<T>(func: () => T): T {
  return func();
}

export function useStateVar<T>(func: () => T): T {
  return func();
}
