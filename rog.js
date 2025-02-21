window.onload = function () {
  setTimeout(() => {
    console.log("rog.js loaded");

    function setPassword() {
      const pass1 = document.querySelector("#txtPassword1");
      const pass2 = document.querySelector("#txtPassword2");
      pass1.addEventListener("change", () => {
        navigator.clipboard
          .writeText(pass1.value)
          .then(() => {
            console.log("Password copied to clipboard");
          })
          .catch((err) => {
            console.log(err);
          });

        const eyeIcon = document.querySelector(".PasswordWithSMS__eye__3L2Y4");
        if (eyeIcon) {
          eyeIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        } else {
          console.error("SVG eye icon not found!");
        }

        // pass2.dispatchEvent(new Event("input", { bubbles: true }));
        // pass2.dispatchEvent(new Event("change", { bubbles: true }));
        // pass2.dispatchEvent(new Event("blur", { bubbles: true }));
        pass2.addEventListener("change", window.sharedFunctions.signup);
      });
    }
    window.sharedBirthFunction = {
      setBirthday: setBirthday,
    };
    function setBirthday() {
      const randYear = Math.floor(Math.random() * 25) + 1990;
      let today = new Date();

      let day = today.getDate();
      let month = today.getMonth() + 1;
      const birthElements = document.querySelectorAll(
        "ul.Select__selectDropdown__sEMI7"
      );
      // set year
      if (birthElements[0]) {
        birthElements[0].querySelectorAll("li").forEach((li) => {
          if (li.textContent.trim() == randYear.toString()) {
            li.click();
          }
        });
      }

      // set month
      if (birthElements[1]) {
        birthElements[1].querySelectorAll("li").forEach((li) => {
          if (li.textContent.trim() == month.toString()) {
            li.click();
          }
        });
      }
      // set day
      if (birthElements[2]) {
        birthElements[2].querySelectorAll("li").forEach((li) => {
          if (li.textContent.trim() == day.toString()) {
            li.click();
          }
        });
      }
    }
    function setAgreement() {
      // document.querySelector(".Agreement2__checkmark__28Cct").click();
      document.querySelector(".Agreement2__checkmark__26hzW").click();
    }
    function setCountry() {
      const input = document.createElement("input");
      const button = document.createElement("button");

      button.textContent = "Set Cntry";
      document.body.appendChild(input);
      document.body.appendChild(button);
      button.addEventListener("click", () => {
        const country = input.value;
        if (country) {
          localStorage.setItem("country", country);
        }
        input.value = "";
      });

      Object.assign(input.style, {
        position: "fixed",
        top: "0",
        right: "0",
        zIndex: "9999",
        backgroundColor: "white",
        border: "1px solid black",
        color: "black",
        padding: "10px",
      });
      Object.assign(button.style, {
        position: "fixed",
        top: "0",
        right: "0",
        zIndex: "9999",
        backgroundColor: "red",
        color: "white",
        padding: "10px",
      });

      // document.querySelector("#ddlCountry").value = "GBR";
    }
    // function submit() {
    //   const btn = document.querySelectorAll(".ButtonRedRog__inner__1UTt1");
    //   btn[2].click();
    //   setTimeout(() => {
    //     window.close();
    //   }, 4000);
    // }
    // v1
    // ButtonRedRog__inner__1UTt1
    // v2
    // ButtonRedRog__inner__1sgjP
    window.sharedFunctions = {
      signup: () => {
        const btn = document.querySelectorAll(".ButtonRedRog__inner__1sgjP");
        btn[2].click();
        // setTimeout(() => {
        //   window.location.href = "https://mail.google.com/mail/u/0/#inbox";
        // }, 4000);
      },
    };
    setCountry();
    setPassword();
    setAgreement();
    setBirthday();
  }, 1000);
};
