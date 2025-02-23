if (localStorage.getItem("shouldClose") === "true") {
  localStorage.setItem("shouldClose", "false");
  window.close();
}

window.onload = () => {
  setTimeout(() => {
    window.focus();
    console.log("window focused");
  }, 2000);

  console.log("change country");
  navigator.clipboard
    .writeText("T@keItE@$y1")
    .then(() => {
      console.log("Password copied to clipboard");
    })
    .catch((err) => {
      console.log(err);
    });
  function openProfile(accountSet) {
    console.log("inside openProfile");
    if (localStorage.getItem("hasClicked") === "true") return;
    console.log("after return");
    console.log(accountSet);
    console.log("inside openprifole");
    if (accountSet.length > 0) {
      console.log(accountSet);
      accountSet[0].querySelector("a").click();
      localStorage.setItem("hasClicked", "true");
    }
  }
  const intervalId = setInterval(() => {
    const accountSet = document.querySelectorAll("#AccountSettings li");
    if (accountSet.length > 0) {
      // console.log(accountSet);
      // console.log("hleo");
      openProfile(accountSet);
      clearInterval(intervalId);
    }
  }, 500);

  // setTimeout(() => {
  //   openProfile();
  //   // localStorage.getItem("isRedirected") === "true" &&
  //   //   window.open("https://rog.asus.com/elite", "_blank");
  // }, 3000);

  window.addEventListener("message", (event) => {
    if (event.source !== window || event.data.type !== "FROM_EXTENSION") return;

    const selectedValue = event.data.value;

    if (selectedValue) {
      localStorage.setItem("mode", selectedValue);
    }
  });
  if (localStorage.getItem("mode") === "alreadySignup") {
    setTimeout(() => {
      changeBirthday();
      countryChange();
    }, 3000);
  } else if (localStorage.getItem("mode") === "n2") {
    setTimeout(() => {
      countryChange();
    }, 3000);
  }
  // countryChange();

  function countryChange() {
    // window.alert = function () {};
    // window.confirm = function () {
    //   return false;
    // };
    // window.prompt = function () {
    //   return null;
    // };

    console.log("country change");
    const country = localStorage.getItem("country");

    if (country) {
      document.getElementById("ddlCountry").value = country;
      document.querySelector(".btn-asus").click();

      const submit = document.querySelector(
        "#ctl00_ContentPlaceHolder1_btnSubmit"
      );
      const passInput = document.querySelector(
        "#ctl00_ContentPlaceHolder1_txtPValue"
      );

      navigator.clipboard
        .readText()
        .then((password) => {
          passInput.value = password;
          console.log("Password pasted from clipboard:", password);
          chrome.storage.sync
            .set({ countryChange: true })
            .then(() => {
              console.log("countryChange set in sync storage.");
            })
            .catch((err) => {
              console.error("Error setting countryChange:", err);
            });
          // Check if the password is "see to password" and click submit
          submit.click();
          // if (password.trim() === "T@keItE@$y1") {
          console.log("submit clicked");
          // chrome.storage.local.set({ isCountryChange: true }, () => {
          //   console.log("countryChange set to true");
          // });

          // localStorage.setItem("is_changecountry_completed", "true");

          localStorage.setItem("shouldClose", "true");
          // }
        })
        .catch((err) => {
          console.log(err);
        });

      // setTimeout(() => {
      //   // localStorage.setItem("isRedirected", "true");
      //   submit.dispatchEvent(new MouseEvent("click", { bubbles: false }));
      //   // setTimeout(() => {
      //   //   document.dispatchEvent(
      //   //     new KeyboardEvent("keydown", {
      //   //       key: "Escape",
      //   //       code: "Escape",
      //   //       keyCode: 27,
      //   //       which: 27,
      //   //       bubbles: true,
      //   //     })
      //   //   );
      //   //   console.log("Escape pressed");
      //   // }, 4000);
      // }, 2000);

      localStorage.setItem("hasClicked", "false");
    }
  }
  function changeBirthday() {
    const randYear = Math.floor(Math.random() * 25) + 1990;
    let today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1;

    const birthYear = document.querySelector("#birthYear");
    const birthMonth = document.querySelector("#birthMonth");
    const birthDay = document.querySelector("#birthDay");

    // set year
    if (birthYear) {
      birthYear.querySelectorAll("option").forEach((li) => {
        if (li.textContent.trim() == randYear.toString()) {
          li.selected = true;
        }
      });
    }

    // set month
    if (birthMonth) {
      birthMonth.querySelectorAll("option").forEach((li) => {
        if (li.textContent.trim() == month.toString()) {
          li.selected = true;
        }
      });
    }
    // set day
    if (birthDay) {
      birthDay.querySelectorAll("option").forEach((li) => {
        if (li.textContent.trim() == day.toString()) {
          li.selected = true;
        }
      });
    }
  }
};

// document
//   .querySelector("#ctl00_ContentPlaceHolder1_btnSubmit")
//   .addEventListener("click", () => {
//     window.open("https://rog.asus.com/elite", "_blank");
//   });
