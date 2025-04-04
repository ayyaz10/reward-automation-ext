document.addEventListener("DOMContentLoaded", function () {
  const radios = document.getElementsByName("reward_activity");

  // Function to restore saved selection
  function restoreSelection() {
    chrome.storage.sync.get("selectedRadio", function (data) {
      if (data.selectedRadio) {
        const selectedRadio = document.querySelector(
          `input[name="reward_activity"][value="${data.selectedRadio}"]`
        );
        if (selectedRadio) selectedRadio.checked = true;
      }
    });
  }

  function saveSelectionToExtensionStorage(mode) {
    chrome.storage.sync.set({ selectedRadio: mode }, function () {
      chrome.runtime.sendMessage({ mode: mode });
    });
  }

  restoreSelection();

  radios.forEach((radio) => {
    radio.addEventListener("change", function () {
      console.log(this.value);
      saveSelectionToExtensionStorage(this.value);
    });
  });
  function setCountry() {
    const countryInput = document.querySelector(".set-country");
    console.log(countryInput);
    chrome.storage.sync.get("country", function (data) {
      if (data && data.country) {
        console.log(data.country);
        countryInput.value = data.country;
      }
    });
    countryInput.addEventListener("change", (event) => {
      const selectedCountry = event.target.value;

      chrome.storage.sync.set({ country: selectedCountry }, function () {
        chrome.runtime.sendMessage({ country: selectedCountry });
      });
    });
  }
  setCountry();
});

// document.addEventListener("DOMContentLoaded", function () {
//   const radios = document.getElementsByName("reward_activity");

//   // Function to restore saved selection
//   function restoreSelection() {
//     const savedValue = localStorage.getItem("selectedRadio");
//     if (savedValue) {
//       const selectedRadio = document.querySelector(
//         `input[name="reward_activity"][value="${savedValue}"]`
//       );

//       if (selectedRadio) selectedRadio.checked = true;
//     }
//   }

//   function saveSelectionToExtensionStorage(mode) {
//     localStorage.setItem("selectedRadio", mode);
//     chrome.storage.sync.set({ mode: mode }, function () {
//       chrome.runtime.sendMessage({ mode: mode });
//     });
//   }
//   restoreSelection();
//   radios.forEach((radio) => {
//     radio.addEventListener("change", function () {
//       console.log(this.value);
//       saveSelectionToExtensionStorage(this.value);
//     });
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const radios = document.getElementsByName("reward_activity");

//   // Function to restore saved selection
//   function restoreSelection() {
//     const savedValue = localStorage.getItem("selectedRadio");
//     if (savedValue) {
//       const selectedRadio = document.querySelector(
//         `input[name="reward_activity"][value="${savedValue}"]`
//       );
//       if (selectedRadio) selectedRadio.checked = true;
//     }
//   }

//   // Function to send message and store selection
//   function sendMessageToContentScript(value) {
//     localStorage.setItem("selectedRadio", value); // Save selection
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       if (tabs[0]) {
//         chrome.runtime.sendMessage({ action: "radioSelected", value: value });
//       }
//     });
//   }

//   // Attach event listeners to radio buttons
//   radios.forEach((radio) => {
//     radio.addEventListener("change", function () {
//       sendMessageToContentScript(this.value);
//     });
//   });

//   // Restore selection on popup open
//   restoreSelection();
// });
