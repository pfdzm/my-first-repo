function maybeSayHello(
  str: string,
  errorCallback: (err: Error) => void,
  successCallback: (msg: string) => void
): void {
  if (str === "hello") {
    successCallback("hello");
  } else {
    errorCallback(new Error("str is not hello"));
  }
}

maybeSayHello(
  "hello",
  (err) => {
    console.error(err);
  },
  (str) =>
    maybeSayHello(
      str,
      (err) => {
        console.error(err);
      },
      (str) =>
        maybeSayHello(
          str,
          (err) => {
            console.error(err);
          },
          (str) => str
        )
    )
);

const promiseMaybeSayHello = (str: string): Promise<string> =>
  new Promise((resolve, reject) => {
    if (str === "hello") {
      resolve("hello");
    } else {
      reject(new Error("str is not hello"));
    }
  });

promiseMaybeSayHello("hello")
  .then((str) => promiseMaybeSayHello(str))
  .then((str) => promiseMaybeSayHello(str))
  .then((str) => str)
  .catch((err) => console.error(err));

const waitAndReturn = async (str: string): Promise<string> =>
  new Promise((resolve, reject) => {
    if (str === "" || typeof str !== "string") {
      reject(new Error("str is not a string"));
    }
    setTimeout(() => {
      resolve(str);
    }, 2000);
  });

const createPElement = (msg: string) => {
  const p = document.createElement("p");
  p.textContent = msg;
  return p;
};

const submitHandler = (event: SubmitEvent) => {
  event.preventDefault();

  const message = (
    document.querySelector("form input[name='message']") as HTMLInputElement
  )?.value;

  const messageArea =
    document.querySelector(".messages") ?? fail("no messages");
  messageArea.innerHTML = "";
  messageArea.append(createPElement("waiting..."));
  waitAndReturn(message).then((msg) => {
    messageArea.innerHTML = "";
    messageArea.append(createPElement(msg));
  });
};

const main = async () => {
  const form = document.createElement("form") ?? fail("no form");
  form.addEventListener("submit", submitHandler);

  try {
    const msg = await waitAndReturn("");
    document.body.append(msg);
  } catch (error) {
    console.log(error);
  } finally {
    // document.body.append("finally!");
  }
};

main();

function fail(msg: string): never {
  throw new Error(msg);
}
