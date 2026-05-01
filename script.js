// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Navbar effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .skill-item, .hobby-item, .social-link').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Parallax nodes
window.addEventListener('mousemove', (e) => {
    const nodes = document.querySelectorAll('.network-bg .node');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    nodes.forEach((node, index) => {
        const speed = (index + 1) * 0.02;
        node.style.transform = `translate(${x * 50 * speed}px, ${y * 50 * speed}px)`;
    });
});

// JKT48 Easter Egg link check
const lilyLink = document.querySelector('.lily-link');
if (lilyLink) {
    lilyLink.addEventListener('click', () => {
        console.log("%c Menuju TikTok Lily JKT48... Full Support! ❤️", "color: red; font-size: 16px; font-weight: bold;");
    });
}
