// SCROLL ANIMATION
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight / 1.2;

  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < trigger) {
      sec.classList.add("show");
    }
  });
});

// PROJECT INTERACTION
const projects = document.querySelectorAll(".project");
const preview = document.querySelector(".preview");

projects.forEach((img, index) => {
  img.addEventListener("click", () => {
    projects.forEach(p => p.classList.remove("active"));
    img.classList.add("active");
    preview.classList.remove("hidden");
  });
});

// PREVIEW CLICK
preview.addEventListener("click", () => {
  window.open("https://github.com/", "_blank");
});
