const player = document.querySelector("[data-story-player]");
const controls = player.querySelector(".story-controls");
const slides = [...player.querySelectorAll(".story-stage figure")];
const steps = [...controls.querySelectorAll(".story-progress button")];
const count = controls.querySelector("[data-story-count]");
const title = controls.querySelector("[data-story-title]");
const previous = controls.querySelector("[data-story-prev]");
const next = controls.querySelector("[data-story-next]");
let active = 0;

function show(index) {
  active = index;
  slides.forEach((slide, position) => {
    const selected = position === active;
    slide.hidden = !selected;
    steps[position].setAttribute("aria-current", selected ? "step" : "false");
  });
  count.textContent = `Шаг\u00a0${active + 1} из\u00a0${slides.length}`;
  title.textContent = slides[active].dataset.title;
  previous.setAttribute("aria-disabled", active === 0 ? "true" : "false");
  next.textContent = active === slides.length - 1 ? "Сначала" : "Дальше";
}

function goBack() {
  if (active > 0) show(active - 1);
}

function goForward() {
  show((active + 1) % slides.length);
}

steps.forEach((step, index) => step.addEventListener("click", () => show(index)));
previous.addEventListener("click", goBack);
next.addEventListener("click", goForward);
player.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    goBack();
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    goForward();
  }
});

show(0);
controls.hidden = false;

const prototypeDemo = document.querySelector(".prototype-demo");
const motionToggle = document.querySelector("[data-prototype-toggle]");
const stillFrame = prototypeDemo.getAttribute("src");
let playing = false;

function setPrototypeMotion(shouldPlay) {
  playing = shouldPlay;
  prototypeDemo.src = playing ? prototypeDemo.dataset.animation : stillFrame;
  motionToggle.textContent = playing ? "Пауза" : "Воспроизвести";
}

motionToggle.addEventListener("click", () => setPrototypeMotion(!playing));
setPrototypeMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
motionToggle.hidden = false;
