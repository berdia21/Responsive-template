let stateCheck = setInterval(() => {
  if (document.readyState === "complete" && document.querySelector("#burger")) {
    clearInterval(stateCheck);
    let burger_btn = document.querySelector("#burger");
    let mobile_nav = document.querySelector("#mobile-navigation-wrapper");

    burger_btn.addEventListener("click", () => {
      mobile_nav.classList.toggle("max-h-none");
      mobile_nav.classList.toggle("py-[10px]");
    });
  }
}, 100);
