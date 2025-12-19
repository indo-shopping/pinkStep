const products = [
    { 
        id: 1, 
        name: "Chuck 70 Hi Black Heritage", 
        price: 1199000, 
        category: "Chuck 70", 
        rating: "4.9", 
        img: "https://www.karenwalker.com/cdn/shop/files/converse-chuck-70-de-luxe-squared-foundation-high-top-black-blackblackegret-a06435-0526426001705976352_1d9aa765-517f-42f8-8cfc-b73dad6194f4.jpg?v=1724711635&width=1445", 
        desc: "Siluet legendaris hitam klasik dengan kanvas premium dan insole empuk." 
    },
    { 
        id: 2, 
        name: "All Star Hi Optical White", 
        price: 999000, 
        category: "Classic", 
        rating: "4.8", 
        img: "https://images.unsplash.com/photo-1494496195158-c3becb4f2475?q=80&w=800", 
        desc: "Sepatu kanvas putih original yang menjadi standar gaya kasual global." 
    },
    { 
        id: 3, 
        name: "Chuck 70 Ox Sunflower Gold", 
        price: 1099000, 
        category: "Chuck 70", 
        rating: "4.9", 
        img: "https://thefullkit.com/cdn/shop/products/IMG_6393_grande.jpg?v=1568306591", 
        desc: "Warna kuning cerah premium untuk tampilan retro yang elegan." 
    },
    { 
        id: 4, 
        name: "Chuck 70 Hi Midnight Navy", 
        price: 1199000, 
        category: "Chuck 70", 
        rating: "4.7", 
        img: "https://feature.com/cdn/shop/articles/Converse_Chuck_Taylor_Hi_70s_Midnight_August_31_2017-1.jpg?v=1535446034", 
        desc: "Warna navy gelap yang formal, cocok untuk berbagai aktivitas." 
    },
    { 
        id: 5, 
        name: "Chuck 70 Crimson Red", 
        price: 1199000, 
        category: "Chuck 70", 
        rating: "4.8", 
        img: "https://images.journeys.com/images/products/1_109776_FS_HERO.JPG", 
        desc: "Merah klasik yang berani, mencerminkan semangat kreativitas." 
    },
    { 
        id: 6, 
        name: "Platform Lugged 2.0 High", 
        price: 1499000, 
        category: "Platform", 
        rating: "4.8", 
        img: "https://www.gluestore.com.au/cdn/shop/files/FTWR_FL-128_1200x.jpg?v=1697150047", 
        desc: "Sol tinggi dengan tekstur lug yang tangguh untuk gaya street-wear." 
    },
    { 
        id: 7, 
        name: "Run Star Hike Black Gum", 
        price: 1599000, 
        category: "Platform", 
        rating: "5.0", 
        img: "https://u-mercari-images.mercdn.net/photos/m16962116751_1.jpg", 
        desc: "Evolusi Chuck klasik dengan sol bergerigi yang provokatif." 
    },
    { 
        id: 8, 
        name: "Chuck Taylor Move Light Pink", 
        price: 1299000, 
        category: "Platform", 
        rating: "4.9", 
        img: "https://images.asos-media.com/products/converse-chuck-taylor-all-star-lift-hi-platform-trainers-in-pink/208059229-1-lightpink?$n_640w$&wid=513&fit=constrain", 
        desc: "Platform sangat ringan dengan desain streamline warna pastel." 
    },
    { 
        id: 9, 
        name: "All Star Ox Charcoal Grey", 
        price: 899000, 
        category: "Classic", 
        rating: "4.8", 
        img: "https://images.unsplash.com/photo-1514311548104-ae305aac4688?q=80&w=800", 
        desc: "Abu-abu netral dengan outsole karet vulcanized yang awet." 
    },
    { 
        id: 10, 
        name: "Kids Chuck Taylor Classic", 
        price: 699000, 
        category: "Kids", 
        rating: "5.0", 
        img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800", 
        desc: "Sepatu ikonik versi mini yang nyaman untuk si kecil." 
    }
];



// 2. FUNGSI LOAD KOMPONEN
function loadComponents() {
    fetch('components/navbar.html').then(r => r.text()).then(d => {
        document.getElementById('navbar-placeholder').innerHTML = d;
        highlightActiveMenu();
    });
    fetch('components/footer.html').then(r => r.text()).then(d => {
        document.getElementById('footer-placeholder').innerHTML = d;
    });
}

// 3. FUNGSI GENERATE KARTU PRODUK
function generateCard(p) {
    return `
        <div class="product-card bg-white rounded-[2rem] p-4 animate-fade cursor-pointer border border-pink-50" onclick="openModal(${p.id})">
            <div class="relative overflow-hidden rounded-[1.5rem] bg-gray-100 mb-4">
                <img src="${p.img}" class="w-full aspect-square object-cover transition-transform duration-500 hover:scale-110">
                <div class="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-pink-500 uppercase flex items-center gap-1">
                    <span class="material-symbols-rounded text-[12px]">label</span> ${p.category}
                </div>
            </div>
            <div class="px-2">
                <h3 class="font-bold text-gray-800 truncate">${p.name}</h3>
                <p class="text-pink-500 font-bold mt-1">Rp ${p.price.toLocaleString('id-ID')}</p>
                <div class="flex items-center gap-1 mt-2 text-yellow-400">
                    <span class="material-symbols-rounded text-sm fill-current" style="font-variation-settings: 'FILL' 1">star</span>
                    <span class="text-xs text-gray-400 font-medium">${p.rating}</span>
                </div>
            </div>
        </div>`;
}

// 4. RENDER LIST (Search & Filter)
function renderList(data) {
    const listEl = document.getElementById('product-list');
    if (!listEl) return;
    listEl.innerHTML = data.length > 0 ? data.map(p => generateCard(p)).join('') : `
        <div class="col-span-full text-center py-20 animate-fade">
            <span class="material-symbols-rounded text-6xl text-gray-200">search_off</span>
            <p class="text-gray-400 mt-4 text-lg font-medium">Maaf, produk tidak ditemukan...</p>
        </div>`;
}

// 5. SEARCH REAL-TIME
function filterProducts() {
    const query = document.getElementById('product-search').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
    renderList(filtered);
}

// 6. FILTER KATALOG & PERBAIKAN WARNA TOMBOL
function renderKatalog(category = 'All') {
    const filtered = category === 'All' ? products : products.filter(p => p.category === category);
    renderList(filtered);

    document.querySelectorAll('.filter-btn').forEach(btn => {
        const btnText = btn.innerText.trim();
        const isActive = (category === 'All' && btnText.includes('All')) || btnText.includes(category);
        
        if (isActive) {
            btn.classList.add('bg-pink-500', 'text-white', 'shadow-lg', 'shadow-pink-100');
            btn.classList.remove('bg-white', 'text-gray-600', 'border-pink-100');
        } else {
            btn.classList.remove('bg-pink-500', 'text-white', 'shadow-lg', 'shadow-pink-100');
            btn.classList.add('bg-white', 'text-gray-600', 'border-pink-100');
        }
    });
}

// 7. RENDER RECOMMENDED (HOME)
function renderRecommended() {
    const el = document.getElementById('recommended-products');
    if (el) el.innerHTML = products.slice(0, 4).map(p => generateCard(p)).join('');
}

// 8. MODAL BOX
function openModal(id) {
    const p = products.find(i => i.id === id);
    const m = document.getElementById('modal-box');
    if(!p || !m) return;
    document.getElementById('modal-img').src = p.img;
    document.getElementById('modal-title').innerText = p.name;
    document.getElementById('modal-desc').innerText = p.desc;
    document.getElementById('modal-price').innerText = `Rp ${p.price.toLocaleString('id-ID')}`;
    document.getElementById('wa-btn').href = `https://wa.me/628123456789?text=Halo PinkStep Official, saya ingin memesan: ${p.name}`;
    m.classList.remove('hidden');
    m.classList.add('flex');
}

function closeModal() {
    document.getElementById('modal-box').classList.add('hidden');
}

// 9. NAVBAR MOBILE & HIGHLIGHT
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    const isHidden = menu.classList.toggle('hidden');
    icon.innerText = isHidden ? 'menu' : 'close';
}

function highlightActiveMenu() {
    const currentPath = window.location.pathname.split("/").pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('text-pink-500');
            if (window.innerWidth >= 768) link.classList.add('border-b-2', 'border-pink-500');
        }
    });
}

// 10. INISIALISASI
document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    if (document.getElementById('recommended-products')) renderRecommended();
    if (document.getElementById('product-list')) renderKatalog('All');
});