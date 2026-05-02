let selectedPaket = '';
const waNumber = '6285122458298'; // ✅ BENAR - Format internasional (+62

document.addEventListener('DOMContentLoaded', function() {
    // Paket selection
    document.querySelectorAll('.paket-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.paket-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedPaket = this.dataset.paket;
            document.getElementById('paketTerpilih').value = selectedPaket;
            setTimeout(() => showFormSection(), 500);
        });
    });

    // Geolocation button
    document.getElementById('getLocationBtn').addEventListener('click', getCurrentLocation);

    // Make location input editable on click
    document.getElementById('shareloc').addEventListener('click', function() {
        this.removeAttribute('readonly');
        this.focus();
    });

    // File preview
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

    // Form submit
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            paket: document.getElementById('paketTerpilih').value,
            nama: document.getElementById('nama').value,
            email: document.getElementById('email').value,
            hp1: document.getElementById('hp1').value,
            hp2: document.getElementById('hp2').value || '-',
            shareloc: document.getElementById('shareloc').value,
            foto: document.getElementById('fotoRumah').files[0]?.name || 'Tidak ada foto'
        };

        // Validasi lokasi
        if (!formData.shareloc.trim()) {
            alert('❌ Silakan pilih lokasi dengan tombol "Dapatkan Lokasi" atau ketik manual!');
            document.getElementById('shareloc').focus();
            return;
        }

        const message = `*📋 PENDAFTARAN INDIHOME BARU* 📋\n\n` +
            `• *Paket Terpilih* : ${formData.paket}\n` +
            `• *Nama Sesuai KTP* : ${formData.nama}\n` +
            `• *Email* : ${formData.email}\n` +
            `• *No HP 1* : ${formData.hp1}\n` +
            `• *No HP 2* : ${formData.hp2}\n` +
            `• *Shareloc* : ${formData.shareloc}\n` +
            `• *Foto Rumah* : ${formData.foto}\n\n` +
            `*Terima kasih! Silakan follow up 📞*\n` +
            `_Data dikirim pada: ${new Date().toLocaleString('id-ID')}_`;

        const whatsappURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
        
        document.getElementById('loading').style.display = 'block';
        document.getElementById('registrationForm').style.display = 'none';
        
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('registrationForm').style.display = 'block';
            window.open(whatsappURL, '_blank');
        }, 1500);
    });
});

function getCurrentLocation() {
    const btn = document.getElementById('getLocationBtn');
    const input = document.getElementById('shareloc');
    
    if (!navigator.geolocation) {
        alert('❌ Browser tidak mendukung geolocation');
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mendapatkan...';

    navigator.geolocation.getCurrentPosition(
        function(position) {
            const lat = position.coords.latitude.toFixed(6);
            const lng = position.coords.longitude.toFixed(6);
            input.value = `${lat}, ${lng}`;
            input.setAttribute('readonly', true);
            
            btn.innerHTML = '<i class="fas fa-check"></i> Berhasil!';
            btn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-location-arrow"></i> Dapatkan Lokasi';
                btn.disabled = false;
                btn.style.background = 'linear-gradient(45deg, #00c851, #007e33)';
            }, 3000);
        },
        function(error) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-location-arrow"></i> Dapatkan Lokasi';
            
            let errorMsg = 'Gagal mendapatkan lokasi: ';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMsg += 'Izin lokasi ditolak. *Izinkan akses lokasi di browser*';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMsg += 'Informasi lokasi tidak tersedia';
                    break;
                case error.TIMEOUT:
                    errorMsg += 'Timeout. Coba lagi atau ketik manual';
                    break;
                default:
                    errorMsg += 'Error tidak diketahui';
            }
            alert('❌ ' + errorMsg + '\n\n*Ketik koordinat/alamat manual di kolom lokasi*');
        },
        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 60000
        }
    );
}

function showPaketSection() {
    document.getElementById('paketSection').style.display = 'grid';
    document.getElementById('formSection').classList.remove('active');
}

function showFormSection() {
    document.getElementById('paketSection').style.display = 'none';
    document.getElementById('formSection').classList.add('active');
            }
