// Smooth scrolling navbar
document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(lnk => lnk.classList.remove('active'));
    this.classList.add('active');
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({behavior: 'smooth'});
  });
});

// Update active navbar item on scroll
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + window.innerHeight/3;
  let current = 'home';
  ['home','about','skills','hobbies','contact'].forEach(id => {
    const section = document.getElementById(id);
    if (section.offsetTop <= scrollPos) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(lnk => {
    lnk.classList.toggle('active', lnk.getAttribute('href') === '#'+current);
  });
});

// Skill ball click animation
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
  const ball = item.querySelector('.skill-ball');
  const logo = item.querySelector('.skill-logo');
  const text = item.querySelector('.skill-text');

  item.addEventListener('click', () => {
    // Reset all others
    skillItems.forEach(s => {
      s.classList.remove('active');
      s.querySelector('.skill-logo').classList.remove('visible');
      s.querySelector('.skill-text').style.opacity = '0';
      s.querySelector('.skill-text').style.width = '0';
      s.querySelector('.skill-ball').classList.remove('liquid');
    });

    // Active this
    item.classList.add('active');
    ball.classList.add('liquid');

    // After liquid animation (~800ms), fade in logo
    setTimeout(() => {
      logo.classList.add('visible');

      // Then reveal skill text with width transition
      text.style.opacity = '1';
      text.style.width = text.scrollWidth + 12 + 'px'; 
    }, 800);
  });
});
