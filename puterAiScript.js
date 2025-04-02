// // Send message to background script to fetch data
// async function getMeaning() {
//   console.log("puterAi loaded");
//   chrome.runtime.sendMessage({ action: "fetchOllama" }, (response) => {
//     console.log("Response from background:", response);
//     if (response && response.content) {
//       alert("Ollama says: " + response.content);
//     } else {
//       console.error("Error fetching from Ollama", response);
//     }
//   });
// }

// // Example: Call `getMeaning` when clicking a button on the page
// document.addEventListener("keydown", (event) => {
//   if (event.key === "o") {
//     getMeaning();
//   }
// });

// getMeaning();

// // "host_permissions": ["https://js.puter.com/*"]
