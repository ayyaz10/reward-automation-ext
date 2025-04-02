console.log("Meaning AI extension is running");

// content.js
// Add a click event listener to the page
document.addEventListener("click", function (event) {
  // Send a message to the background script to fetch data
  const selectedText = window.getSelection().toString().trim();

  if (selectedText) {
    navigator.clipboard
      .writeText(selectedText)
      .then(() => {
        console.log("Copied:", selectedText);

        chrome.runtime.sendMessage({
          action: "fetchData",
          text: selectedText,
        });
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  }
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "displayData") {
    console.log(message.data.translation);
    // Process and display the data on the page
    displayOnPage(message.data.translation);

    // displayDataOnPage(message.data);
  } else if (message.action === "error") {
    console.error("Error received from background script:", message.error);
    // Optionally display an error message on the page
    displayErrorOnPage(message.error);
  }
});

function displayOnPage(translation) {
  const container = document.createElement("div");
  const closeButton = document.createElement("span");
  closeButton.textContent = "X";
  closeButton.style.cssText =
    "position: absolute; top: 5px; right: 5px; cursor: pointer;";
  container.style.cssText =
    "position: fixed; top: 20px; right: 20px; background: #000000; padding: 15px; border: 1px solid #ccc; border-radius: 5px; color: rgb(118, 121, 132); box-shadow: 0 2px 10px rgba(0,0,0,0.2); z-index: 10000; max-width: 300px; max-height: 400px; overflow: hidden; text-wrap: wrap;";

  function closeContainer() {
    document.body.removeChild(container);
  }
  container.innerHTML = translation;
  container.appendChild(closeButton);
  closeButton.addEventListener("click", closeContainer);
  document.body.appendChild(container);
}

// closeButton.addEventListener("click", closeContainer);
// Function to display data on the page
function displayDataOnPage(data) {
  // // Create a container for the data
  // const container = document.createElement("div");
  // container.id = "api-data-container";
  // container.style.cssText =
  //   "position: fixed; top: 20px; right: 20px; background: white; padding: 15px; border: 1px solid #ccc; border-radius: 5px; color: black; box-shadow: 0 2px 10px rgba(0,0,0,0.2); z-index: 10000; max-width: 300px; max-height: 400px; overflow: auto;";
  // // Create a title
  // const title = document.createElement("h3");
  // title.textContent = "Translation";
  // container.appendChild(title);
  // // Create content based on the data structure
  // const content = document.createElement("div");
  // if (typeof data === "object") {
  //   const pre = document.createElement("pre");
  //   pre.textContent = JSON.stringify(data, null, 2);
  //   content.appendChild(pre);
  // } else {
  //   // content.textContent = data.translation;
  // }
  // container.appendChild(data.translation);
  // // Add a close button
  // const closeButton = document.createElement("button");
  // closeButton.textContent = "Close";
  // closeButton.style.cssText = "margin-top: 10px; padding: 5px 10px;";
  // closeButton.onclick = function () {
  //   document.body.removeChild(container);
  // };
  // container.appendChild(closeButton);
  // // Remove any existing containers
  // const existingContainer = document.getElementById("api-data-container");
  // if (existingContainer) {
  //   document.body.removeChild(existingContainer);
  // }
  // Add the container to the page
  // document.body.appendChild(data.translation);
}

// Function to display error on the page
function displayErrorOnPage(error) {
  const container = document.createElement("div");
  container.style.cssText =
    "position: fixed; top: 20px; right: 20px; background: #ffeeee; padding: 15px; border: 1px solid #ff5555; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); z-index: 10000;";

  container.innerHTML = `<h3>Error</h3><p>${error}</p>`;

  // Add a close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.style.cssText = "margin-top: 10px; padding: 5px 10px;";
  closeButton.onclick = function () {
    document.body.removeChild(container);
  };
  container.appendChild(closeButton);

  document.body.appendChild(container);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }, 5000);
}
