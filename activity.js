setTimeout(() => {
  console.log("actiity.js loaded");
  let mode;
  // n2-with-logout
  // n2-no-logout
  // as-with-logout
  // as-no-logout
  // Content script me mode receive karna aur appropriate functions run karna
  chrome.storage.sync.get("mode", function (items) {
    console.log("inside extension storage");
    console.log(items.mode);
    if (items.mode) {
      mode = items.mode;
      // if (items.mode === "n2-with-logout") {
      //   console.log(items.mode);
      //   shouldLogout = true;
      // } else if (items.mode === "n2-no-logout") {
      //   console.log(items.mode);
      //   shouldLogout = false;
      // } else if (items.mode === "as-with-logout") {
      //   console.log(items.mode);
      //   shouldLogout = true;
      // } else if (items.mode === "as-no-logout") {
      //   console.log(items.mode);
      //   shouldLogout = false;
      // }
    }
  });

  function openBirthdayModel() {
    const buttonTexts = [
      "100",
      "Boldog", // hungry
      "100 bod", // chech republic
      "Získajte 100 bodov!", // Solovikaia
      "Wszystkiego", // poland
      "+100", // koria
      "100 PUAN",
      "100 PUNCTE",
      "+100 балів", // ukraine
      "+100 POINTS",
      "Získajte 100 bodov!",
      "HAPPY BIRTHDAY! PLEASE CLICK 'SUBMIT' TO EARN 100 POINTS!",
    ];
    console.log("inside opnmodel");

    const buttons = document.querySelectorAll(".ButtonRed__inner__2GkGv span");
    for (let button of buttons) {
      console.log(button.innerText);
      if (
        buttonTexts.some((text) =>
          button.innerText.toLowerCase().includes(text.toLowerCase())
        )
      ) {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      }
    }
  }

  // to share across contnt scripts
  window.sharedFunctions2 = {
    openBirthdayModel: openBirthdayModel,
  };

  function logout() {
    document.querySelector(".Header__logOut__L5y79").click();
    console.log("Logging Out");
  }

  function openRewardTwoHundred() {
    console.log("reward page");
    const rewardBtns = document.querySelectorAll(
      ".ButtonRed__inner__2GkGv span"
    );
    console.log(rewardBtns);
    rewardBtns.forEach((btn) => {
      if (btn.textContent.includes("200")) {
        btn.click();
        console.log("200 points clicked");
      }
    });
  }

  if (window.location.href.includes("reward")) {
    console.log("inside reward");
    openRewardTwoHundred();
  }

  if (window.location.href.includes("activity")) {
    openBirthdayModel();
    console.log("go to oberser 1");

    // Observer for modal appearance
    const observer = new MutationObserver(() => {
      console.log("inside fist obesrever");
      const modal = document.querySelector(
        ".BirthdayCardModal__modalBox__3IOhA"
      );

      if (modal) {
        console.log("Modal Loaded!");

        // New observer to detect submit button
        const observer2 = new MutationObserver(() => {
          const birthdaySubmitBtn = document.querySelector(
            ".BirthdayCardModal__modalBox__3IOhA .ButtonRed__inner__2GkGv"
          );
          console.log(birthdaySubmitBtn);
          if (birthdaySubmitBtn) {
            setTimeout(() => {
              console.log("Submitting Birthday Card...");
              birthdaySubmitBtn.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
              );
            }, 1000);
            observer2.disconnect(); // Stop observer2 after clicking submit

            // New observer to wait for close button
            const observer3 = new MutationObserver(() => {
              // const observer3 = setInterval(() => {
              console.log("observer 3 is running...");

              const closeButton = document.querySelector(
                ".BirthdayCardResultModal__closeModal__iNer8"
              );
              console.log(closeButton);
              if (closeButton) {
                // clearInterval(observer3);

                if (mode === "n2-with-logout" || mode === "as-with-logout") {
                  setTimeout(() => {
                    localStorage.setItem("reward_collected", "true");
                    logout();
                  }, 2000);
                } else if (mode === "n2-no-logout" || mode === "as-no-logout") {
                  window.location.href = window.location.href.replace(
                    "/activity/all",
                    "/reward/all"
                  );
                  // window.location.href = window.location.href.replace(
                  //   "/activity/all",
                  //   "/reward/all"
                  // );
                }
              }
            });

            observer3.observe(document.body, {
              childList: true,
              subtree: true,
            });
          }
        });

        observer2.observe(document.body, { childList: true, subtree: true });

        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
}, 4000);
