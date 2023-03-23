var DynamicNav = function DynamicNav() {
  this.element = document.querySelector(".menu");
  this.visibleLinks = this.element.querySelector("nav");
  this.toggleButton = this.element.querySelector("#toggle-links");
  this.breakpoints = [];
  this.init();
};

window.DynamicNav = DynamicNav;

DynamicNav.prototype.init = function () {
  this.setupMenu();
  this.calculateBreakpoints();
  this.updateMenu();
  this.addBindings();
};

DynamicNav.prototype.bindMethod = function (name) {
  return (
    this["_" + name + "_"] ||
    Object.defineProperty(this, "_" + name + "_", {
      value: this[name].bind(this),
    })["_" + name + "_"]
  );
};

DynamicNav.prototype.setupMenu = function () {
  this.hiddenLinks = document.querySelector(".dropdown-body");
  this.element.appendChild(this.hiddenLinks);
  this.visibleLinks.classList.add("visible-links");
};

DynamicNav.prototype.calculateBreakpoints = function () {
  var childrenWidth = 0;

  for (var i = 0; i < this.visibleLinks.children.length; i++) {
    childrenWidth += this.visibleLinks.children[i].offsetWidth;
    this.breakpoints[i] = childrenWidth;
  }
};

DynamicNav.prototype.addBindings = function () {
  window.addEventListener("resize", this.bindMethod("updateMenu"));

  this.toggleButton.addEventListener("click", () => {
    this.toggleButton.classList.toggle("visible-links");
    this.hiddenLinks.classList.toggle("max-h-none");
    this.hiddenLinks.classList.toggle("py-[12px]");
  });
};

DynamicNav.prototype.updateMenu = function () {
  var availableSpace = this.element.offsetWidth - this.toggleButton.offsetWidth;
  var itemsVisible = this.visibleLinks.children.length;
  var requiredSpace = this.breakpoints[itemsVisible - 1];

  if (availableSpace < this.breakpoints[itemsVisible - 1]) {
    this.toggleButton.style.setProperty("display", "flex", "important");

    while (availableSpace < this.breakpoints[itemsVisible - 1]) {
      this.hiddenLinks.insertBefore(
        this.visibleLinks.children[itemsVisible - 1],
        this.hiddenLinks.firstChild
      );
      itemsVisible--;
    }
  } else if (availableSpace > this.breakpoints[itemsVisible]) {
    while (availableSpace > this.breakpoints[itemsVisible]) {
      this.visibleLinks.appendChild(
        this.hiddenLinks.removeChild(this.hiddenLinks.firstChild)
      );
      itemsVisible++;
    }
  }

  if (!this.hiddenLinks.children.length) {
    this.toggleButton.style.setProperty("display", "none", "important");
    this.toggleButton.classList.remove("visible-links");
    this.hiddenLinks.classList.remove("max-h-none");
    this.hiddenLinks.classList.remove("py-[12px]");
  }
};

let documentStateCheck = setInterval(() => {
  if (
    document.readyState === "complete" &&
    document.querySelector(".dropdown-body")
  ) {
    clearInterval(documentStateCheck);
    var DynamicNavigation = new DynamicNav();
    DynamicNavigation;
  }
}, 100);
