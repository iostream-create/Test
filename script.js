let selectedPaket = '';
// 🔥 GANTI INI DENGAN NOMOR WA AKTIFMU (format 62xxxxxxxxxx)
const waNumber = '62882020063479'; 

document.addEventListener('DOMContentLoaded', function() {
    // 1. PAKET SELECTION
    document.querySelectorAll('.paket-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.paket-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedPaket = this.dataset.paket;
            document.getElementById('paketTerpilih').value = selectedPaket;
            setTimeout(() => showFormSection(), 500);
        });
    });

    // 2. GEOLOCATION - GPS OPTIMIZED (CEPAT!)
    document.getElementById('getLocationBtn').addEventListener('click', getCurrentLocation);

    // 3. IP GEOLOCATION - SUPER CEPAT!
    document.getElementById('getIPLocationBtn').addEventListener('click', getIPLocation);

    // 4. EDIT MANUAL LOKASI
    document.getElementById('shareloc').addEventListener('click', function() {
        this.removeAttribute('readonly');
        this.focus();
    });

    // 5. FOTO PREVIEW
    document.getElementById('fotoRumah').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.getElementById('fotoPreview');
                preview.src = e.target.result;
                preview.style.display = 'block';
            }
            reader.readAsDataURL(file);
        }
    });

    // 6. KIRIM WA - FINAL VERSION
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            paket: document.getElementById('paketTerpilih').value,
            nama: document.getElementById('nama').value,
            email: document.getElementById('email').value,
            hp1: document.getElementById('hp1').value,
            hp2: document.getElementById('hp2').value || '-',
            shareloc: document.getElementById('shareloc').value.trim(),
            foto: document.getElementById('fotoRumah').files[0]?.name || 'Tidak ada foto'
        };

        // VALIDASI
        if (!formData.paket) return alert('❌ Pilih paket dulu!');
        if (!formData.shareloc) return alert('❌ Pilih lokasi dulu!');
        
        const message = `*📋 PENDAFTARAN INDIHOME BARU* 📋\n\n` +
            `🔴 *Paket* : ${formData.paket}\n` +
            `👤 *Nama KTP* : ${formData.nama}\n` +
            `📧 *Email* : ${formData.email}\n` +
            `📱 *HP 1* : ${formData.hp1}\n` +
            `📱 *HP 2* : ${formData.hp2}\n` +
            `📍 *LOKASI* : ${formData.shareloc}\n` +
            `🖼️ *Foto* : ${formData.foto}\n\n` +
            `⏰ *Waktu* : ${new Date().toLocaleString('id-ID')}\n\n` +
            `*Silakan follow up! 📞*`;

        const whatsappURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
        
        // LOADING
        document.getElementById('loading').style.display = 'block';
        document.getElementById('registrationForm').style.display = 'none';
        
        // KIRIM
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('registrationForm').style.display = 'block';
            window.open(whatsappURL, '_blank');
            alert('✅ Data terkirim ke WhatsApp!');
        }, 1500);
    });
});

// 🔥 GPS ULTRA CEPAT (Max 8 detik)
function getCurrentLocation() {
    const btn = document.getElementById('getLocationBtn');
    const input = document.getElementById('shareloc');
    
    if (!navigator.geolocation) {
        return alert('❌ Browser tidak support GPS');
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude.toFixed(6);
            const lng = position.coords.longitude.toFixed(6);
            input.value = `${lat}, ${lng} ✅`;
            input.setAttribute('readonly', true);
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = '#28a745';
        },
        error => {
            // FALLBACK JAKARTA
            input.value = '-6.2088, 106.8456 (Jakarta)';
            input.removeAttribute('readonly');
            alert('⚠️ GPS gagal. Jakarta diisi otomatis.\nKlik kolom untuk edit.');
        },
        {
            enableHighAccuracy: false,  // CEPAT!
            timeout: 8000,             // 8 detik
            maximumAge: 30000          // Cache 30s
        }
    );

    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-location-arrow"></i>';
        btn.style.background = '#00c851';
    }, 3000);
}

// 🔥 IP LOCATION - 1 DETIK SAJA!
async function getIPLocation() {
    const btn = document.getElementById('getIPLocationBtn');
    const input = document.getElementById('shareloc');
    
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.latitude) {
            const lat = data.latitude.toFixed(6);
            const lng = data.longitude.toFixed(6);
            input.value = `${lat}, ${lng} (${data.city}) 🌐`;
            input.setAttribute('readonly', true);
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = '#28a745';
        }
    } catch (e) {
        input.value = '-6.2088, 106.8456 (IP gagal - Jakarta)';
    }

    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-globe"></i>';
        btn.style.background = '#17a2b8';
    }, 2000);
}

function showPaketSection() {
    document.getElementById('paketSection').style.display = 'grid';
    document.getElementById('formSection').classList.remove('active');
}

function showFormSection() {
    document.getElementById('paketSection').style.display = 'none';
    document.getElementById('formSection').classList.add('active');
                          }
