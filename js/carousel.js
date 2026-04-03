const carousel = document.getElementById("tipsCarousel");

if (carousel) {
  const track = carousel.querySelector("#tipsTrack");
  const cards = Array.from(track.querySelectorAll(".tip-card"));
  const prevButton = carousel.querySelector(".carousel-prev");
  const nextButton = carousel.querySelector(".carousel-next");
  const dotsContainer = document.getElementById("carouselDots");
  const slideDelay = 4000;
  let currentIndex = 0;
  let autoPlayId = null;
  let dots = [];

  function getVisibleCards() {
    if (window.innerWidth >= 1100) {
      return 3;
    }

    if (window.innerWidth >= 768) {
      return 2;
    }

    return 1;
  }

  function getMaxIndex() {
    return Math.max(cards.length - getVisibleCards(), 0);
  }

  function getPageCount() {
    return getMaxIndex() + 1;
  }

  function updateCarousel() {
    const visibleCards = getVisibleCards();
    const offset = (100 / visibleCards) * currentIndex;
    track.style.transform = `translateX(-${offset}%)`;
    updateDots();
  }

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
      dot.setAttribute("aria-current", index === currentIndex ? "true" : "false");
    });
  }

  function buildDots() {
    if (!dotsContainer) {
      return;
    }

    dotsContainer.innerHTML = "";
    dots = Array.from({ length: getPageCount() }, (_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `Go to tips page ${index + 1}`);
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
      return dot;
    });
  }

  function goToNext() {
    const maxIndex = getMaxIndex();
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateCarousel();
  }

  function goToPrev() {
    const maxIndex = getMaxIndex();
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    updateCarousel();
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayId = window.setInterval(goToNext, slideDelay);
  }

  function stopAutoPlay() {
    if (autoPlayId) {
      window.clearInterval(autoPlayId);
      autoPlayId = null;
    }
  }

  prevButton.addEventListener("click", goToPrev);
  nextButton.addEventListener("click", goToNext);

  carousel.addEventListener("mouseenter", stopAutoPlay);
  carousel.addEventListener("mouseleave", startAutoPlay);
  window.addEventListener("resize", () => {
    currentIndex = Math.min(currentIndex, getMaxIndex());
    buildDots();
    updateCarousel();
  });

  buildDots();
  updateCarousel();
  startAutoPlay();
}
