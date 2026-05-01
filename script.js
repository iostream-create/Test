// Smooth scrolling untuk navbar links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
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

// Intersection Observer untuk animasi scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Dynamic slide direction based on scroll position
            const rect = entry.target.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2) {
                entry.target.classList.add('slide-down');
                entry.target.classList.remove('slide-up');
            } else {
                entry.target.classList.add('slide-up');
                entry.target.classList.remove('slide-down');
            }
        }
    });
}, observerOptions);

// Observe semua section dan elements
document.querySelectorAll('.section, .skill-item, .hobby-item, .social-link').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Skill hover effect dengan particle
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.05)';
        
        // Create particle effect
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: #4A90E2;
            border-radius: 50%;
            pointer-events: none;
            animation: particle-float 1s ease-out forwards;
            left: 50%;
            top: 50%;
        `;
        this.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    });
    
    skill.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-10px)';
    });
});

// Profile picture pulse animation
setInterval(() => {
    const profilePic = document.querySelector('.profile-pic');
    profilePic.style.boxShadow = `
        0 0 40px rgba(74, 144, 226, 0.4),
        0 20px 40px rgba(74, 144, 226, 0.2)
    `;
    setTimeout(() => {
        profilePic.style.boxShadow = `
            0 20px 40px rgba(74, 144, 226, 0.2)
        `;
    }, 500);
}, 3000);

// Typing effect untuk hero title (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Uncomment untuk enable typing effect
// window.addEventListener('load', () => {
//     const title = document.querySelector('.hero-title');
//     typeWriter(title, 'WebDev & Network Engineer', 100);
// });

// Parallax effect untuk network nodes
window.addEventListener('mousemove', (e) => {
    const nodes = document.querySelectorAll('.network-bg .node');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    nodes.forEach((node, index) => {
        const speed = (index + 1) * 0.02;
        node.style.transform = `
            translate(${x * 50 * speed}px, ${y * 50 * speed}px)
        `;
    });
});

// Preloader (optional)
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add CSS keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes particle-float {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(var(--mouse-x, 0), var(--mouse-y, -100px)) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);

// --- JKT48 Easter Egg Logic ---
const lilyLink = document.querySelector('.lily-link');

if (lilyLink) {
    lilyLink.addEventListener('click', (e) => {
        // Notifikasi keren di console browser
        console.log("%c Menuju TikTok Lily JKT48... Full Support! ❤️", "color: red; font-size: 20px; font-weight: bold;");
        
        // Opsional: Alert sederhana
        // alert("Otw ke TikTok Lily! Jangan lupa follow ya! ❤️");
    });
}

// Perbaikan Observer untuk memastikan animasi slide muncul dengan benar
const refreshObserver = () => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => {
        observer.observe(el);
    });
};

// Panggil fungsi jika ada konten baru yang dimuat
document.addEventListener('DOMContentLoaded', refreshObserver);

// Efek Teks Connect muncul secara berkala mengikuti sinyal
const connectStatus = document.getElementById('connect-status');

function triggerConnectText() {
    // Menambahkan class show setiap beberapa detik
    connectStatus.classList.add('show');
}

// Jalankan fungsi
triggerConnectText();

