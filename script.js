// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const mainContent = document.querySelector('.main-content');

let currentSection = 'home';

// Smooth section switching
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.dataset.section;
        
        // Update active nav
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Switch sections
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetSection) {
                section.scrollIntoView({ behavior: 'smooth' });
                section.classList.add('active');
                currentSection = targetSection;
            }
        });
        
        // Scroll to top of section
        setTimeout(() => {
            window.scrollTo({
                top: section.offsetTop - 200,
                behavior: 'smooth'
            });
        }, 100);
    });
});

// Rocket animation every 10 seconds
setInterval(() => {
    const rocket = document.querySelector('.rocket');
    rocket.classList.add('show');
    
    setTimeout(() => {
        rocket.classList.remove('show');
    }, 4000);
}, 10000);

// Projects functionality
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalLink = document.getElementById('modalLink');
const modalClose = document.querySelector('.modal-close');

const projectData = [
    { img: 'https://via.placeholder.com/500x300/1e40af/ffffff?text=Project+1', title: 'Portfolio Website', url: 'https://github.com/yourusername/project1' },
    { img: 'https://via.placeholder.com/500x300/3730a3/ffffff?text=Project+2', title: 'E-Commerce App', url: 'https://github.com/yourusername/project2' },
    { img: 'https://via.placeholder.com/500x300/581c87/ffffff?text=Project+3', title: 'Network Dashboard', url: 'https://github.com/yourusername/project3' }
];

// Show first project
setTimeout(() => {
    projectCards[0].classList.add('active');
}, 500);

projectCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        modalImage.src = projectData[index].img;
        modalTitle.textContent = projectData[index].title;
        modalLink.href = projectData[index].url;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Biodata animation
const biodataObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 200);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.biodata-item').forEach(item => {
    biodataObserver.observe(item);
});

// Smooth scrolling for sections
document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('wheel', (e) => {
        e.stopPropagation();
    }, { passive: false });
});

// Preload and performance
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    // Animate first project cards
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
        }, index * 200);
    });
});

// Touch/swipe support for mobile
let touchStartY = 0;
let touchEndY = 0;

mainContent.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

mainContent.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndY < touchStartY - swipeThreshold) {
        // Swipe up - next section
        const currentIndex = Array.from(sections).indexOf(document.querySelector('.section.active'));
        if (currentIndex < sections.length - 1) {
            const nextLink = document.querySelector(`[data-section="${sections[currentIndex + 1].id}"]`);
            nextLink.click();
        }
    }
    if (touchEndY > touchStartY + swipeThreshold) {
        // Swipe down - prev section
        const currentIndex = Array.from(sections).indexOf(document.querySelector('.section.active'));
        if (currentIndex > 0) {
            const prevLink = document.querySelector(`[data-section="${sections[currentIndex - 1].id}"]`);
            prevLink.click();
        }
    }
}
