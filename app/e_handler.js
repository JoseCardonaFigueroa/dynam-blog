(function registerEventsFunc () {
  var menuMobileBtn = document.querySelector("#btn-submenu-container"),
  menuMobileContainer = document.querySelector("#main-nav"),
  bodyTag = document.getElementsByTagName('body')[0],
  target = null;

  menuMobileBtn.addEventListener("touchstart", function (event) {
    target = event.target;

    if (target.classList.length === 0) {
      bodyTag.classList.add('no-scroll');
      menuMobileContainer.classList.add('open');
      target.classList.add('open');
    }else {
      bodyTag.classList.remove('no-scroll');
      menuMobileContainer.classList.remove('open');
      target.classList.remove('open');
    };
  }, false);
})();
