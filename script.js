document.addEventListener('DOMContentLoaded', () => {
    // === LOGIKA NAVBAR MENU ===
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            navLinks.classList.toggle('active');
            e.stopPropagation(); // Mencegah klik ke document saat membuka menu
        });
    }

    // Klik pada link menu akan menutup dropdown otomatis
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Klik di luar navbar untuk menutup menu
    document.addEventListener('click', (e) => {
        if (navLinks && !navLinks.contains(e.target) && e.target !== menuToggle) {
            navLinks.classList.remove('active');
        }
    });


    // === LOGIKA PROJECT SLIDER ===
    const pUtama = document.getElementById('pUtama');
    const pKiri = document.querySelector('.side-left');
    const pKanan = document.querySelector('.side-right');
    let isOpen = false;

    // Fungsi redirect yang bersih
    function goToLink(element) {
        const url = element.getAttribute('data-url');
        if (url && url !== "#") {
            window.open(url, '_blank');
        }
    }

    if (pUtama) {
        pUtama.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (!isOpen) {
                // Membuka slider
                pUtama.style.transform = 'scale(0.85)';
                
                pKiri.style.opacity = '1';
                pKiri.style.pointerEvents = 'auto'; 
                pKiri.style.transform = 'translateX(-110px) scale(0.75)';
                
                pKanan.style.opacity = '1';
                pKanan.style.pointerEvents = 'auto';
                pKanan.style.transform = 'translateX(110px) scale(0.75)';
                
                isOpen = true;
            } else {
                // Jika sudah terbuka, baru bisa redirect
                goToLink(pUtama);
            }
        });
    }

    // Handler Project Samping (Project 2 & 4)
    [pKiri, pKanan].forEach(card => {
        if (card) {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isOpen) {
                    goToLink(card);
                }
            });
        }
    });

    // Klik di mana saja (selain project) untuk reset slider
    document.addEventListener('click', () => {
        if (isOpen && pUtama) {
            pUtama.style.transform = 'scale(1.05)';
            pKiri.style.opacity = '0';
            pKiri.style.pointerEvents = 'none';
            pKiri.style.transform = 'translateX(0) scale(1)';
            pKanan.style.opacity = '0';
            pKanan.style.pointerEvents = 'none';
            pKanan.style.transform = 'translateX(0) scale(1)';
            isOpen = false;
        }
    });
});
