document.addEventListener("keydown", function (event) {
  // Check if the key is from NumPad
  // if (!event?.code?.startsWith("Numpad")) return;

  switch (event.code) {
    case "Numpad0":
      signup();
      break;
    case "Numpad1":
      accountSubmit();
      break;
    case "NumpadDecimal":
      setBirthday();
      break;
    case "Numpad4":
      giftCard400();
      break;
    case "Numpad2":
      giftCard200();
      break;
    case "Numpad5":
      changeCountrySubmit();
      break;
    case "NumpadAdd":
      openAccountPage();
      break;
    case "NumpadDivide":
      copyPassword();
      break;
    case "NumpadMultiply":
      pasteText();
      break;
    case "NumpadMultiply":
      setBirthday();
      break;
    case "Numpad6":
      // gmail
      // window.open("https://mail.google.com/mail/u/0", "_blank");
      window.location.href = window.location.href.replace(
        "https://account.asus.com/global/info.aspx",
        "https://rog.asus.com/kr/elite/"
      );

      break;
    case "Numpad9":
      // for google sheet
      openGoogleSheet();

      break;
    case "NumpadEnter":
      openBirthdayModel();
      break;
    case "Numpad8":
      localStorage.removeItem("hasClicked");
      location.reload(true);

      break;
    case "PageDown":
      resetChangeCountryLocalStorage();
      break;
    case "NumpadSubtract":
      logout();
      break;
    default:
      break;
  }

  // if (event.ctrlKey && event.code === "NumpadEnter") {
  //   event.preventDefault(); // Prevent default behavior if needed
  //   console.log("Ctrl + Numpad Enter pressed!");
  //   // Your custom action here
  // }
});

// Example functions

function setBirthday() {
  window.sharedBirthFunction.setBirthday();
}

// 0
function signup() {
  window.sharedFunctions.signup();
  window.location.href = "https://mail.google.com/mail/u/0/#inbox";
  console.log("Submited for verification");
}
// 1
function accountSubmit() {
  const submitProfile = document.querySelector(
    "#ctl00_ContentPlaceHolder1_btnSubmit"
  );
  submitProfile.click();
  openElite();
  setTimeout(() => {
    window.close();
  }, 1000);
  console.log("Account Submit triggered");
}

// change country submit
function changeCountrySubmit() {
  const submit = document.querySelector("#ctl00_ContentPlaceHolder1_btnSubmit");
  submit.click();
}

// Home
function openElite() {
  // window.open = ("https://rog.asus.com/elite/", "_blank");
  window.location.href = "https://rog.asus.com/elite/";
  console.log("Elite Page Opened");
}

function giftCard400() {
  console.log("Go to 200 giftcard");
}
function giftCard400() {
  console.log("Go to 400 giftcard");
}

// +
function openAccountPage() {
  window.location.href = "https://account.asus.com/signup.aspx?";
  console.log("Account Page Opened");
}
// Enter
function openBirthdayModel() {
  if (window.sharedFunctions2 && window.sharedFunctions2.openBirthdayModel) {
    window.sharedFunctions2.openBirthdayModel();
  } else {
    console.log("Birthday function not ready yet.");
  }
  console.log("Birthday model opened");
}
// 9
function openGoogleSheet() {
  window.location.href =
    "https://docs.google.com/spreadsheets/d/1KPCxnn1H4Ac-WHku_9W80EAJ3oQVXBlYz2uDG6WYJvE/edit?gid=0#gid=0";
  console.log("Google sheet opened");
}
// -
function logout() {
  document.querySelector(".Header__logOut__L5y79").click();
  console.log("Logged Out");
}

function copyPassword() {
  navigator.clipboard
    .writeText("T@keItE@$y1")
    .then(() => {
      console.log("Password copied to clipboard");
    })
    .catch((err) => {
      console.log(err);
    });
}

function pasteText() {
  navigator.clipboard
    .readText()
    .then((text) => {
      passInput.value = text;
      console.log("Password pasted from clipboard", text);
    })
    .catch((err) => {
      console.log(err);
    });
}

function resetChangeCountryLocalStorage() {
  localStorage.removeItem("is_changecountry_completed");
}
