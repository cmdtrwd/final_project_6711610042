$(function () {
  const $navToggle = $(".nav-toggle");
  const $mainNav = $(".main-nav");
  const mobileBreakpoint = 768;

  if (!$navToggle.length || !$mainNav.length) {
    return;
  }

  function setMenuState(isOpen) {
    $mainNav.toggleClass("is-open", isOpen);
    $navToggle.toggleClass("is-open", isOpen);
    $navToggle.attr("aria-expanded", String(isOpen));
    $navToggle.attr("aria-label", isOpen ? "Close menu" : "Open menu");
  }

  function closeMenu() {
    setMenuState(false);
  }

  $navToggle.on("click", function () {
    setMenuState(!$mainNav.hasClass("is-open"));
  });

  $mainNav.on("click", ".nav-link", function () {
    if (window.innerWidth < mobileBreakpoint) {
      closeMenu();
    }
  });

  $(document).on("click", function (event) {
    if (window.innerWidth >= mobileBreakpoint) {
      return;
    }

    const $target = $(event.target);

    if (!$target.closest(".site-header").length) {
      closeMenu();
    }
  });

  $(window).on("resize", function () {
    if (window.innerWidth >= mobileBreakpoint) {
      closeMenu();
    }
  });
});
