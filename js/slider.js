let interval = setInterval(() => {
  if (document.readyState === "complete" && document.querySelector(".swiper")) {
    clearInterval(interval);
    setTimeout(() => {
      let swiper = new Swiper(".swiper", {
        autoHeight: true,
        breakpoints: {
          775: {
            autoHeight: false,
          },
        },
      });

      swiper.on("slideChange", function () {
        document.querySelector(".slide-number").innerHTML =
          swiper.activeIndex + 1;
      });

      document.querySelector(".slide-number").innerHTML =
        swiper.activeIndex + 1;
      document.querySelector(".total-slides").innerHTML = swiper.slides.length;

      document
        .querySelector(".next-slide")
        ?.addEventListener("click", () => swiper.slideNext());
      document
        .querySelector(".prev-slide")
        ?.addEventListener("click", () => swiper.slidePrev());
    }, 2000);
  }
});
