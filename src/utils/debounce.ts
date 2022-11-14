export default function debouncePromise(fn: (...x: any) => void, time: number) {
  let timerId: undefined | NodeJS.Timeout = undefined;

  return function debounced(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }

    return new Promise((resolve) => {
      timerId = setTimeout(() => resolve(fn(...args)), time);
    });
  };
}
