// Smooth scrolling for navbar links
document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelectorAll(".nav-link").forEach(a => a.classList.remove("active"));
    this.classList.add("active");

    const targetID = this.getAttribute("href");
    const target = document.querySelector(targetID);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Set initial active nav link based on scroll
function updateActiveNav() {
  const scrollPos = window.scrollY + window.innerHeight / 3;
  const sections = document.querySelectorAll("section");
  let currentID = "";
  sections.forEach((sec) => {
    if (scrollPos > sec.offsetTop) {
      currentID = sec.id;
    }
  });
  document.querySelectorAll(".nav-link").forEach(a => a.classList.remove("active"));
  if (currentID)
    document.querySelector(`.nav-link[href="#${currentID}"]`)?.classList.add("active");
}
window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// -----------------------------
// Skill Click Animation Logic
// -----------------------------
const skillItems = document.querySelectorAll(".skill-item");

skillItems.forEach((item) => {
  const ball = item.querySelector(".skill-ball");
  const logo = item.querySelector(".skill-logo");
  const text = item.querySelector(".skill-text");

  item.addEventListener("click", () => {
    // Reset all first
    skillItems.forEach((el) => {
      el.classList.remove("active");
      el.querySelector(".skill-logo").classList.remove("visible");
      el.querySelector(".skill-text").style.width = "0";
      el.querySelector(".skill-text").style.opacity = "0";
      el.querySelector(".skill-ball").style.transform = "scale(1)";
    });

    // Activate this clicked
    item.classList.add("active");

    // Animation sequence:
    // 1. Ball grows with animation (scale & color already set)
    ball.style.transform = "scale(1.15)";

    // 2. Show logo with fade-in + scale after 400ms
    setTimeout(() => {
      logo.classList.add("visible");

      // 3. Slide in text from left to right after logo visible
      setTimeout(() => {
        text.style.width = text.scrollWidth + 12 + "px"; // 12px padding margin
        text.style.opacity = "1";
      }, 300);
    }, 400);
  });
});

// -----------------------------
// Plane Flying with Smoke Background Animation
// -----------------------------
const canvas = document.getElementById("planeCanvas");
const ctx = canvas.getContext("2d");

let width, height;
function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const planeImg = new Image();
planeImg.src = "https://img.icons8.com/ios-filled/50/ffffff/airplane-take-off.png"; // Simple white plane icon

class SmokeParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 5 + Math.random() * 5;
    this.opacity = 0.8;
    this.life = 100 + Math.random() * 60;
    this.vx = -0.3 + Math.random() * 0.2;
    this.vy = -0.2 + Math.random() * 0.1;
    this.color = "rgba(255,255,255," + this.opacity + ")";
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    this.opacity -= 0.007;
    this.color = "rgba(255,255,255," + this.opacity.toFixed(2) + ")";
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}
class Plane {
  constructor() {
    // Start from bottom-right
    this.x = width + 50;
    this.y = height + 50;
    this.speedX = -3.5;
    this.speedY = -2.7;
    this.smokes = [];
    this.isFlying = true;
  }
  update() {
    if (!this.isFlying) return;

    this.x += this.speedX;
    this.y += this.speedY;

    // Add smoke particle at tail
    this.smokes.push(new SmokeParticle(this.x + 20, this.y + 10));

    // Update smoke particles
    this.smokes.forEach((p, i) => {
      p.update();
      if (p.life <= 0 || p.opacity <= 0) {
        this.smokes.splice(i, 1);
      }
    });

    // Plane finished flying off screen
    if (this.x < -100 || this.y < -100) {
      this.isFlying = false;
    }
  }
  draw(ctx) {
    if (!this.isFlying) return;

    // Draw smoke particles
    this.smokes.forEach((p) => p.draw(ctx));

    // Draw plane icon
    ctx.save();
    ctx.shadowColor = "white";
    ctx.shadowBlur = 10;
    ctx.drawImage(planeImg, this.x, this.y, 50, 50);
    ctx.restore();
  }
}

const plane = new Plane();

// Animation Loop
function animate() {
  ctx.clearRect(0, 0, width, height);
  plane.update();
  plane.draw(ctx);
  requestAnimationFrame(animate);
}
planeImg.onload = () => animate();

// -----------------------------
// Optional: Profile picture pulse effect
const profilePic = document.querySelector(".profile-pic img");
setInterval(() => {
  if (!profilePic) return;
  profilePic.style.filter = "drop-shadow(0 0 20px #4a90e2)";
  setTimeout(() => (profilePic.style.filter = "none"), 600);
}, 3000);
