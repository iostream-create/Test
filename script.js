let selectedPaket = '';
let map, marker;
const waNumber = '085122458298';

// Initialize map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -6.2088, lng: 106.8456 }, // Jakarta default
        zoom: 15,
        mapTypeId: 'roadmap'
    });

    map.addListener('click', function(event) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        document.getElementById('shareloc').value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        
        if (marker) marker.setMap(null);
        marker = new google.maps.Marker({
            position: event.latLng,
            map: map,
            title: 'Lokasi Rumah'
        });
    });
}

// Paket selection
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.paket-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.paket-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedPaket = this.dataset.paket;
            document.getElementById('paketTerpilih').value = selectedPaket;
            setTimeout(() => showFormSection(), 500);
        });
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

        if (!formData.shareloc) {
            alert('Silakan pilih lokasi di peta terlebih dahulu!');
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
            `*Terima kasih! Silakan follow up 📞*`;

        const whatsappURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
        
        document.getElementById('loading').style.display = 'block';
        
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            window.open(whatsappURL, '_blank');
        }, 1500);
    });
});

function showPaketSection() {
    document.getElementById('paketSection').style.display = 'grid';
    document.getElementById('formSection').classList.remove('active');
}

function showFormSection() {
    document.getElementById('paketSection').style.display = 'none';
    document.getElementById('formSection').classList.add('active');
}
