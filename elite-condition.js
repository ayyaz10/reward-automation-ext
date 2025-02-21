console.log("elite-condition.js loaded");

console.log(localStorage?.getItem("isConditionSet") === "true");
localStorage.setItem("isLoggedIn", "true");
function checkRedirect() {
  console.log("inside if");
  localStorage.setItem("isConditionSet", "false");
  window.location.href =
    window.location.href.replace(/\/$/, "") + "/activity/all";
  return; // ✅ Now it's valid inside a function
}

if (localStorage?.getItem("isConditionSet") === "true") {
  checkRedirect();
}

const observer = new MutationObserver((mutations, obs) => {
  const element = document.querySelector("#agreeTermsAndCondition");
  if (element) {
    setTimeout(checkCondition, 3000);
    obs.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// Wait for the terms and policy checkboxes

function checkCondition() {
  const terms = document.querySelector("#agreeTermsAndCondition");
  const policy = document.querySelector("#agreePrivacyPolicy");

  if (terms && policy) {
    console.log("Found elements:", terms, policy);
    terms.click();
    policy.click();

    // Wait for the button before clicking it
    localStorage.setItem("isConditionSet", "true");
    document.querySelector(".ButtonRed__inner__2GkGv").click();

    // Redirect after clicking the button
    // setTimeout(() => {
    // console.log("change country");
    // window.location.href = "https://rog.asus.com/uk/elite/activity/all";
    // }, 2000);
    // window.location.href =
    //   window.location.href.replace(/\/$/, "") + "/activity/all";
  }
}
