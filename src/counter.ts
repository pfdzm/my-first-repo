export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `<p>count is <em>${counter}</em></p>`;
  };
  element.addEventListener("click", () => setCounter(counter + 1));
  setCounter(0);
}
