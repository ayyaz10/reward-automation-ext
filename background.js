// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     files: ["content.js"],
//   });
// });

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (message.clearLocalStorage) {
//     // Clear local storage
//     chrome.storage.local.clear(function () {
//       console.log("Local storage cleared");
//       // Send a response indicating success or failure
//       sendResponse({ success: true });
//     });
//     // Return true to indicate that sendResponse will be called asynchronously
//     return true;
//   }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === "radioSelected") {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.scripting.executeScript({
//         target: { tabId: tabs[0].id },
//         func: (selectedValue) => {
//           window.postMessage(
//             { type: "FROM_EXTENSION", value: selectedValue },
//             "*"
//           );
//         },
//         args: [message.value],
//       });
//     });
//   }
// });
console.log("background.js");
// Background me storage se mode read karo aur content script ko pass karo
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("mode", function (data) {
    const mode = data.mode || "n2"; // Default mode 'mode1' agar koi mode nahi ho
    console.log(mode);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { mode: mode });
    });
  });
});

// Mode change hone par content script ko update bhejo
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.mode) {
    chrome.storage.sync.set({ mode: message.mode }, function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { mode: message.mode });
      });
    });
  }
});
chrome.storage.onChanged.addListener((changes, area) => {
  console.log(changes.countryChange);
  if (area === "sync" && changes.countryChange) {
    if (changes.countryChange.newValue === true) {
      chrome.storage.sync.set({ countryChange: false });
      setTimeout(() => {
        chrome.tabs.create({ url: "https://rog.asus.com/elite" });
      }, 2000);
    }
  }
});
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "getMeaning") {
//     fetch("https://js.puter.com/v2", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         prompt: "meaning of replenish in one sentence only please",
//         model: "deepseek-chat",
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.assert(data);
//         sendResponse({ meaning: data.message.content });
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         sendResponse({ error: "Failed to fetch meaning" });
//       });
//     return true; // Required for async sendResponse
//   }
// });
// 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
// fetch("https://js.puter.com/v2")
//   .then((data) => {
//     return data.text();
//   })
//   .then((data) => {
//     console.log(data);
//   });
// console.log("helo world");
// puter.ai
//   .chat("meaning of replenish in one sentence only please", {
//     model: "deepseek-chat",
//   })
//   .then((response) => {
//     console.log(response.message.content);
//     document.write(response.message.content);
//   });
// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.text);
  if (request.action === "fetchData") {
    // Fetch data from your server
    fetch("http://localhost:5000/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phrase: request.text }), // Adjust payload as needed
    })
      .then((response) => response.json())
      .then((data) => {
        // Send the data back to the content script
        chrome.tabs.sendMessage(sender.tab.id, {
          action: "displayData",
          data: data,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        chrome.tabs.sendMessage(sender.tab.id, {
          action: "error",
          error: error.message,
        });
      });

    // Return true to indicate we will respond asynchronously
    return true;
  }
});
