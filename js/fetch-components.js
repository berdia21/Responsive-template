const fetchComponent = (path, targetElementId) => {
  fetch(path)
    .then((response) => response.text())
    .then(
      (content) =>
        (document.getElementById(targetElementId).innerHTML = content)
    );
};

document.addEventListener("DOMContentLoaded", () => {
  fetchComponent("components/Header.html", "header");
  fetchComponent("components/DesktopNavigation.html", "desktop-navigation");
  fetchComponent("components/MobileNavigation.html", "mobile-navigation");
  fetchComponent("components/Slider.html", "slider");
  fetchComponent("components/News.html", "news");
});
