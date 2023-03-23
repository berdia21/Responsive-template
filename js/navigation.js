var Greedy = function Greedy(options) {
  this.element = document.querySelector(options.element);
  this.visibleLinks = this.element.querySelector("nav");
  this.toggleButton = this.element.querySelector("#toggle-links");
  this.breakpoints = [];
  this.init();
};

window.Greedy = Greedy;

Greedy.prototype.init = function () {
  this.setupMenu();
  this.calculateBreakpoints();
  this.updateMenu();
  this.addBindings();
};

Greedy.prototype.bindMethod = function (name) {
  return (
    this["_" + name + "_"] ||
    Object.defineProperty(this, "_" + name + "_", {
      value: this[name].bind(this),
    })["_" + name + "_"]
  );
};

Greedy.prototype.setupMenu = function () {
  this.hiddenLinks = document.querySelector(".overflow");
  this.element.appendChild(this.hiddenLinks);
  this.visibleLinks.classList.add("visible-links");
};

Greedy.prototype.calculateBreakpoints = function () {
  var childrenWidth = 0;

  for (var i = 0; i < this.visibleLinks.children.length; i++) {
    childrenWidth += this.visibleLinks.children[i].offsetWidth;
    this.breakpoints[i] = childrenWidth;
  }
};

Greedy.prototype.addBindings = function () {
  window.addEventListener("resize", this.bindMethod("updateMenu"));

  this.toggleButton.addEventListener("click", () => {
    this.toggleButton.classList.toggle("visible-links");
    this.hiddenLinks.classList.toggle("max-h-none");
    this.hiddenLinks.classList.toggle("py-[12px]");
  });
};

Greedy.prototype.updateMenu = function () {
  var availableSpace = this.element.offsetWidth;
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
    window.innerWidth > 1199 &&
    document.querySelector(".overflow")
  ) {
    clearInterval(documentStateCheck);
    var menu = new Greedy({
      element: ".menu",
    });
    menu;
  }
}, 100);
