document.querySelectorAll("[data-carousel]").forEach(carousel => {
  const track = carousel.querySelector(".carousel-track");
  const controls = carousel.querySelector(".carousel-controls");
  const count = controls.querySelector("[data-carousel-count]");
  const total = track.children.length;

  function currentIndex() {
    const slideWidth = track.clientWidth;
    return slideWidth ? Math.round(track.scrollLeft / slideWidth) : 0;
  }

  function updateCount() {
    const label = `${currentIndex() + 1} из\u00a0${total}`;
    if (count.textContent !== label) count.textContent = label;
  }

  controls.querySelectorAll("[data-carousel-step]").forEach(button => {
    button.addEventListener("click", () => {
      const index = (currentIndex() + Number(button.dataset.carouselStep) + total) % total;
      track.scrollLeft = index * track.clientWidth;
      updateCount();
    });
  });
  track.addEventListener("scroll", updateCount, { passive: true });
  controls.hidden = false;
  carousel.dataset.enhanced = "";
  updateCount();
});
