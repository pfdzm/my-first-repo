export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const setCounter = (setter: number | ((num: number) => number)) => {
    counter = typeof setter === "number" ? setter : setter(counter);
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener("click", () => setCounter((count) => count + 1));
  setCounter(() => 0);
}
