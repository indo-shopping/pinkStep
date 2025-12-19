// Fungsi untuk memanggil komponen Header & Footer
function loadComponents() {
    // Load Navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
        });

    // Load Footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
}

// Jalankan fungsi saat halaman dibuka
window.onload = loadComponents;

// Fungsi Order WhatsApp (Untuk di halaman produk)
function beliProduk(namaProduk) {
    const nomorWA = "628123456789"; 
    const pesan = `Halo PinkStep ✨, saya mau order: ${namaProduk}. Ready?`;
    window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`, '_blank');
}

// 1. DATA PRODUK TERBARU
const products = [
    {
        id: 1,
        name: "Chuck 70 Hi 'Pink Quartz'",
        price: "Rp 1.199.000",
        rating: "4.9 (120 terjual)",
        category: "High Top",
        img: "https://images.unsplash.com/photo-1597043530272-e8991c8897cf?w=500",
        desc: "Hadir dengan balutan kanvas premium berwarna pink quartz yang elegan. Insole OrthoLite memberikan kenyamanan ekstra untuk dipakai seharian."
    },
    {
        id: 2,
        name: "One Star Pro Rose",
        price: "Rp 999.000",
        rating: "4.8 (85 terjual)",
        category: "Low Top",
        img: "https://images.unsplash.com/photo-1511551203524-9a24350a5771?w=500",
        desc: "Sepatu ikonik One Star dengan bahan suede lembut berwarna rose. Desain minimalis namun tetap manis."
    },
    {
        id: 3,
        name: "Run Star Hike Pastel",
        price: "Rp 1.599.000",
        rating: "5.0 (200 terjual)",
        category: "Platform",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        desc: "Berani tampil beda dengan sol tebal yang memberikan kesan tinggi dan futuristik namun tetap feminin."
    }
];

// 2. FUNGSI RENDER PRODUK KE HALAMAN
function renderProducts() {
    const list = document.getElementById('product-list');
    products.forEach(p => {
        list.innerHTML += `
            <div class="bg-white rounded-[32px] p-4 shadow-sm hover:shadow-xl transition-all border border-pink-50 group cursor-pointer" onclick="openModal(${p.id})">
                <div class="overflow-hidden rounded-[24px] mb-4 relative">
                    <img src="${p.img}" class="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110">
                    <div class="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-pink-500 uppercase">
                        ${p.category}
                    </div>
                </div>
                <div class="px-2">
                    <h3 class="font-bold text-gray-800 truncate">${p.name}</h3>
                    <p class="text-pink-500 font-bold mt-1">${p.price}</p>
                    <div class="flex items-center gap-1 mt-2 text-yellow-400">
                        <span class="material-symbols-rounded text-[16px] fill-current">star</span>
                        <span class="text-[12px] text-gray-400 font-medium">${p.rating}</span>
                    </div>
                </div>
            </div>
        `;
    });
}

// 3. FUNGSI MODAL BOX
function openModal(id) {
    const p = products.find(item => item.id === id);
    const modal = document.getElementById('modal-box');
    
    document.getElementById('modal-img').src = p.img;
    document.getElementById('modal-title').innerText = p.name;
    document.getElementById('modal-badge').innerText = p.category;
    document.getElementById('modal-desc').innerText = p.desc;
    document.getElementById('modal-rating').innerText = p.rating;
    document.getElementById('modal-price').innerText = p.price;

    // Link WhatsApp
    const noWA = "628123456789"; 
    const pesan = `Halo PinkStep ✨, saya mau pesan: ${p.name}. Masih ada?`;
    document.getElementById('wa-btn').href = `https://wa.me/${noWA}?text=${encodeURIComponent(pesan)}`;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeModal() {
    document.getElementById('modal-box').classList.add('hidden');
}

// 4. LOAD KOMPONEN (Fetch Navbar & Footer)
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    
    // Memanggil Navbar & Footer
    fetch('components/navbar.html').then(r => r.text()).then(d => document.getElementById('navbar-placeholder').innerHTML = d);
    fetch('components/footer.html').then(r => r.text()).then(d => document.getElementById('footer-placeholder').innerHTML = d);
});