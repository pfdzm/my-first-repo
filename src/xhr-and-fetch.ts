// fetching data

// XMLHttpRequest
const getData = () => {
  const req = new XMLHttpRequest();
  if (!req) {
    return;
  }
  req.onreadystatechange = function () {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status !== 200) {
        console.error(new Error("request failed :("));
      }
      const pre = document.createElement("pre");
      pre.textContent = req.responseText;
      document.querySelector("#app .requests")?.append(pre);
    }
  };

  req.open("GET", "https://rickandmortyapi.com/api/character/1");
  req.send();
};

// Fetch API
const fetchData = async () => {
  const resp = await fetch("https://rickandmortyapi.com/api/character/1");
  if (!resp.ok) {
    console.error(new Error("request failed :("));
  }
  const body = await resp.json();
  const pre = document.createElement("pre");
  pre.textContent = JSON.stringify(body);
  document.querySelector("#app .requests")?.append(pre);
  return body;
};

const requestsDiv = document.createElement("div");
requestsDiv.classList.add("requests");
document.querySelector("#app")?.append(requestsDiv);

const button = document.createElement("button");
button.classList.add("req-btn");
button.textContent = "Send Request";
document.querySelector("#app .requests")?.append(button);

const fetchButton = document.createElement("button");
fetchButton.classList.add("req-btn-fetch");
fetchButton.textContent = "Fetch Request";
document.querySelector("#app .requests")?.append(fetchButton);

document.querySelector("button.req-btn")?.addEventListener("click", () => {
  document.querySelector("#app .requests pre")?.remove();
  getData();
});

document
  .querySelector("button.req-btn-fetch")
  ?.addEventListener("click", () => {
    document.querySelector("#app .requests pre")?.remove();
    fetchData();
  });
