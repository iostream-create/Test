// Navbar Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
let currentSection = 'home';

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Show target section
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
                currentSection = targetId;
            }
        });
    });
});

// Scroll-based animations
let lastScrollY = window.scrollY;
let scrollDirection = 'down';

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY) {
        scrollDirection = 'down';
    } else {
        scrollDirection = 'up';
    }
    lastScrollY = currentScrollY;
});

// Rocket Animation
setInterval(() => {
    const rocket = document.querySelector('.rocket');
    rocket.style.opacity = '1';
    rocket.classList.add('show');
    
    setTimeout(() => {
        rocket.classList.remove('show');
        rocket.style.opacity = '0';
    }, 3000);
}, 10000);

// Skills hover effects
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'none';
        card.style.transform = 'translateY(-15px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Projects functionality
const projectCards = document.querySelectorAll('.project-card');
const projectPreview = document.getElementById('projectPreview');
const previewTitle = document.getElementById('previewTitle');
const previewLink = document.querySelector('.preview-link');
const closePreview = document.querySelector('.close-preview');

let projectIndex = 0;
const projectData = [
    { title: 'Project 1 - Portfolio Website', url: 'https://github.com/yourusername/project1' },
    { title: 'Project 2 - E-Commerce App', url: 'https://github.com/yourusername/project2' },
    { title: 'Project 3 - Network Dashboard', url: 'https://github.com/yourusername/project3' }
];

// Show first project
projectCards[0].classList.remove('hidden');
projectCards[0].classList.add('active');

projectCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        // Show other projects with animation
        if (index === 0) {
            projectCards[1].classList.remove('hidden');
            projectCards[2].classList.remove('hidden');
            projectCards[1].style.transform = 'translateX(-400px)';
            projectCards[2].style.transform = 'translateX(400px)';
            
            setTimeout(() => {
                projectCards[1].style.transform = 'translateX(0)';
                projectCards[2].style.transform = 'translateX(0)';
            }, 100);
        }
        
        // Show preview
        previewTitle.textContent = projectData[index].title;
        previewLink.href = projectData[index].url;
        projectPreview.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closePreview.addEventListener('click', () => {
    projectPreview.classList.remove('active');
    document.body.style.overflow = 'auto';
});

projectPreview.addEventListener('click', (e) => {
    if (e.target === projectPreview) {
        projectPreview.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Biodata animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const biodataObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.biodata-card').forEach(card => {
    biodataObserver.observe(card);
});

// Contact hover effects
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'pulse 0.6s infinite';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.animation = 'none';
    });
});

// Add pulse animation to CSS via JS
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.7); }
        70% { box-shadow: 0 0 0 20px rgba(0, 212, 255, 0); }
        100% { box-shadow: 0 0 0 0 rgba(0, 212, 255, 0); }
    }
`;
document.head.appendChild(style);

// Smooth scrolling for mobile
document.querySelector('.nav-container').addEventListener('touchstart', (e) => {
    e.stopPropagation();
}, { passive: true });

// Preload images
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
