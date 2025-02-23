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

      chrome.tabs.create({ url: "https://rog.asus.com/ph/elite" });
    }
  }
});
