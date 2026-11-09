const skillsRibbon = document.querySelector(".skills-ribbon");
let heldPointer = null;

skillsRibbon.addEventListener("pointerdown", event => {
  const pill = event.target.closest(".skill-pills li");
  if (!pill || event.pointerType === "mouse" || event.button !== 0 || heldPointer !== null) return;

  pill.setPointerCapture(event.pointerId);
  heldPointer = event.pointerId;
  skillsRibbon.dataset.held = "";
});

function resumeSkills(event) {
  if (event.pointerId !== heldPointer) return;
  heldPointer = null;
  delete skillsRibbon.dataset.held;
}

window.addEventListener("pointerup", resumeSkills, true);
window.addEventListener("pointercancel", resumeSkills, true);
skillsRibbon.addEventListener("lostpointercapture", resumeSkills);
