// Smooth scrolling untuk navbar links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe semua sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Skills hover effect
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'none';
        card.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Projects interactive functionality
const projectCards = document.querySelectorAll('.project-card');
const projectsContainer = document.querySelector('.projects-container');

projectCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        // Remove active class from all cards
        projectCards.forEach(c => {
            c.classList.remove('active', 'enlarged');
        });
        
        // Add active to clicked card
        card.classList.add('active', 'enlarged');
        
        // Show preview text
        const previewText = card.querySelector('.preview-text');
        if (previewText) {
            setTimeout(() => {
                previewText.style.opacity = '1';
            }, 300);
        }
        
        // Animate other cards
        projectCards.forEach((otherCard, otherIndex) => {
            if (otherCard !== card) {
                if (otherIndex < index) {
                    // Slide left
                    otherCard.style.transform = 'translateX(-100px) scale(0.8)';
                } else {
                    // Slide right
                    otherCard.style.transform = 'translateX(100px) scale(0.8)';
                }
            }
        });
    });
    
    // Preview text click - redirect to GitHub
    const previewText = card.querySelector('.preview-text');
    if (previewText) {
        previewText.addEventListener('click', (e) => {
            e.stopPropagation();
            // Ganti dengan link GitHub project Anda
            window.open('https://github.com/yourusername/yourproject', '_blank');
        });
    }
});

// Rocket animation every 10 seconds
setInterval(() => {
    const rocket = document.querySelector('.rocket');
    rocket.style.display = 'block';
    setTimeout(() => {
        rocket.style.display = 'none';
    }, 10000);
}, 10000);

// Dynamic scroll direction animation
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY) {
        // Scroll down - slide from top
        document.querySelectorAll('.section').forEach(section => {
            if (section.getBoundingClientRect().top < window.innerHeight) {
                section.style.transform = 'translateY(0)';
            }
        });
    } else {
        // Scroll up - slide from bottom
        document.querySelectorAll('.section').forEach(section => {
            if (section.getBoundingClientRect().top < window.innerHeight) {
                section.style.transform = 'translateY(0)';
            }
        });
    }
    
    lastScrollY = currentScrollY;
});

// Hobbies hover rotation
document.querySelectorAll('.hobby-card').forEach(card => {
    const icon = card.querySelector('.hobby-icon');
    card.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.1) rotate(360deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Contact cards hover scale
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'pulse 0.6s infinite';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.animation = 'none';
    });
});

// Add pulse animation to CSS (tambahkan di style.css jika ingin)
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: translateY(-15px) scale(1.1); }
        50% { transform: translateY(-20px) scale(1.15); }
        100% { transform: translateY(-15px) scale(1.1); }
    }
`;
document.head.appendChild(style);

// Initialize first project card
document.addEventListener('DOMContentLoaded', () => {
    projectCards[0].classList.add('active');
    projectCards[0].style.opacity = '1';
    projectCards[0].style.transform = 'translateX(0)';
});
