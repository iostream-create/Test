// MENU Toggle
const menuBtn = document.getElementById('menuBtn');
const menuDropdown = document.getElementById('menuDropdown');
const menuLinks = document.querySelectorAll('.menu-link');

// Toggle menu
menuBtn.addEventListener('click', () => {
    menuDropdown.classList.toggle('active');
});

// Close menu when clicking link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuDropdown.classList.remove('active');
        // Smooth scroll to section ONLY when menu clicked
        const targetId = link.dataset.section;
        const targetSection = document.getElementById(targetSection);
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
        menuDropdown.classList.remove('active');
    }
});

// NORMAL SCROLL - NO AUTO NAVIGATION
// User has FULL scroll control - NO interference

// Rocket every 10s
setInterval(() => {
    document.querySelector('.rocket').classList.add('show');
    setTimeout(() => {
        document.querySelector('.rocket').classList.remove('show');
    }, 4000);
}, 10000);

// Projects modal
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalLink = document.getElementById('modalLink');
const modalClose = document.querySelector('.modal-close');

const projectData = [
    { img: 'https://via.placeholder.com/600x350/1e40af/ffffff?text=Project+1', title: 'Portfolio Website', url: 'https://github.com/yourusername/project1' },
    { img: 'https://via.placeholder.com/600x350/3730a3/ffffff?text=Project+2', title: 'E-Commerce App', url: 'https://github.com/yourusername/project2' },
    { img: 'https://via.placeholder.com/600x350/581c87/ffffff?text=Project+3', title: 'Network Dashboard', url: 'https://github.com/yourusername/project3' }
];

projectCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        modalImage.src = projectData[index].img;
        modalTitle.textContent = projectData[index].title;
        modalLink.href = projectData[index].url;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Fade in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections and biodata items
document.querySelectorAll('.section, .biodata-item').forEach(el => {
    fadeObserver.observe(el);
});

// Winbox icon custom hover
document.querySelector('.skill-item[data-skill="winbox"]').addEventListener('mouseenter', function() {
    this.style.animation = 'spin 1s ease-in-out';
});

document.querySelector('.skill-item[data-skill="winbox"]').addEventListener('mouseleave', function() {
    this.style.animation = 'none';
});

// Add spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: translateY(-25px) scale(1.08) rotate(0deg); }
        50% { transform: translateY(-25px) scale(1.08) rotate(180deg); }
        100% { transform: translateY(-25px) scale(1.08) rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Smooth hover effects
document.querySelectorAll('.skill-item, .hobby-card, .contact-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.willChange = 'transform';
    });
    item.addEventListener('mouseleave', () => {
        item.style.willChange = 'auto';
    });
});

// Performance: Preload critical assets
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Stagger project cards
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, index * 150);
    });
});

// Mobile optimizations
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    }
