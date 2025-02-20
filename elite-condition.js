console.log("elite-condition.js loaded");

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

    document.querySelector(".ButtonRed__inner__2GkGv").click();

    // Redirect after clicking the button
    window.location.href =
      window.location.href.replace(/\/$/, "") + "/activity/all";
  }
}
