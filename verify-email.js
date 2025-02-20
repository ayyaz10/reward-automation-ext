let observer2;
let observer1;

console.log("verify-email.js loaded");
function verifyEmail() {
  console.log("inside functn");
  // if (element) {
  //   console.log("Verification email Loaded!");
  //   element.click();
  // }

  if (!observer1) {
    // Ensure observer is created only once
    observer1 = new MutationObserver((mutationsList, observer) => {
      console.log("observer1 triggered");

      const element = document.querySelector('[name="ASUS_member"]');
      if (element) {
        const styles = window.getComputedStyle(element);
        console.log(styles);
        if (styles.getPropertyValue("font-weight") === "700") {
          element.click();
          console.log("Clicked element!");

          // Disconnect observer to prevent infinite loop
          observer.disconnect();
          observer1 = null; // Reset so it can be reinitialized if needed
        }
      }
    });

    observer1.observe(document.body, { childList: true, subtree: true });
  }

  let lastUrl = window.location.href;

  setInterval(() => {
    if (window.location.href !== lastUrl) {
      lastUrl = window.location.href;
      console.log("URL changed:", lastUrl);

      // Find the link that contains "Click here"
      const link = Array.from(document.querySelectorAll("a")).find((a) =>
        a.textContent.includes("Click here")
      );

      console.log(link);

      if (link) {
        console.log("Found link:", link);
        link.dispatchEvent(new MouseEvent("click", { bubbles: false }));
        document.addEventListener("keydown", (event) => {
          // trigger with button
          if (event.code === "NumpadMultiply") {
            event.preventDefault(); // Prevent default behavior if needed
            link.dispatchEvent(new MouseEvent("click", { bubbles: false }));
            console.log("NumpadMultiply pressed!");
            // Your custom action here
          }
        });

        setTimeout(() => {
          window.close();
        }, 80000000);
      } else {
        console.log("Link not found.");
      }
    }
  }, 1000);
}
const button = document.createElement("button");
button.textContent = "Verify Email";
button.onclick = verifyEmail;
document.body.appendChild(button);
button.style.position = "fixed";
button.style.top = "0";
button.style.right = "0";
button.style.zIndex = "9999";
button.style.backgroundColor = "red";
button.style.color = "white";
button.style.padding = "10px";

verifyEmail();

// let lastUrl = window.location.href;
// if (!observer2) {
//   observer2 = new MutationObserver(() => {
//     if (window.location.href !== lastUrl) {
//       lastUrl = window.location.href;
//       console.log("URL changed:", lastUrl);
//       console.log(document.querySelector(".im a"));
//       document
//         .querySelector(".im a")
//         .dispatchEvent(new MouseEvent("click", { bubbles: true }));
//     }
//   });

//   observer2.observe(document.body, { childList: true, subtree: true });
// }
