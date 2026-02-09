const PRODUCTS = [
    { id: 1, name: "Produto 1", category: "Beleza", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: true },
    { id: 2, name: "Produto 2", category: "Emagrecimento", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: true },
    { id: 3, name: "Produto 3", category: "Queda de Cabelo", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: true },
    { id: 4, name: "Produto 4", category: "Sono", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: true },
    { id: 5, name: "Produto 5", category: "Emagrecimento", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: true },
    { id: 6, name: "Produto 6", category: "Saúde", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: true },
    { id: 7, name: "Produto 7", category: "Acnes", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: true },
    { id: 8, name: "Produto 8", category: "Bem-estar", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: true },
    { id: 9, name: "Produto 9", category: "Emagrecimento", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: false },
    { id: 10, name: "Produto 10", category: "Emagrecimento", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: false },
    { id: 11, name: "Produto 11", category: "Queda de Cabelo", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: false },
    { id: 12, name: "Produto 12", category: "Queda de Cabelo", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: false },
    { id: 13, name: "Produto 13", category: "Sono", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: false },
    { id: 14, name: "Produto 14", category: "Sono", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: false },
    { id: 15, name: "Produto 15", category: "Acnes", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: false },
    { id: 16, name: "Produto 16", category: "Acnes", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: false },
    { id: 17, name: "Produto 17", category: "Saúde", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: false },
    { id: 18, name: "Produto 18", category: "Beleza", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: false },
    { id: 19, name: "Produto 19", category: "Bem-estar", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: false },
    { id: 20, name: "Produto 20", category: "Saúde", price: "0,00", description: "Descrição do produto", info: "Informações nulas", featured: false },
];

// Cart State
let cart = [];

// Carousel Logic
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel__slide');
const dots = document.querySelectorAll('.dot');

function setSlide(index) {
    const activeSlide = slides[currentSlide];
    const newSlide = slides[index];
    
    activeSlide.classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Reset animations for existing content
    const activeContent = activeSlide.querySelector('.carousel__content');
    activeContent.style.opacity = '0';
    activeContent.style.transform = 'translateY(20px)';
    
    currentSlide = index;
    newSlide.classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Trigger entrance animation for new content
    setTimeout(() => {
        const newContent = newSlide.querySelector('.carousel__content');
        newContent.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        newContent.style.opacity = '1';
        newContent.style.transform = 'translateY(0)';
    }, 100);
}

setInterval(() => {
    let next = (currentSlide + 1) % slides.length;
    setSlide(next);
}, 5000);

const featuredGrid = document.getElementById('featured-grid');
const productGrid = document.getElementById('product-grid');
let currentCategory = 'All';

function filterCategory(category) {
    currentCategory = category;
    
    // Smooth scroll to results
    const resultsSection = document.getElementById('produtos-categoria');
    if (category !== 'All') {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    document.querySelectorAll('.category-link').forEach(btn => {
        const btnText = btn.innerText.trim();
        if (btnText === category || (category === 'All' && btnText === 'Todos os Produtos')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    renderProducts();
}

function renderProducts() {
    // Featured Sections
    const featuredProducts = PRODUCTS.filter(p => p.featured);
    featuredGrid.innerHTML = featuredProducts.map(product => renderCard(product)).join('');

    // Category Section
    const filteredProducts = currentCategory === 'All' 
        ? PRODUCTS.filter(p => !p.featured) 
        : PRODUCTS.filter(p => p.category === currentCategory);

    productGrid.innerHTML = filteredProducts.map(product => renderCard(product)).join('');
    
    // Show/Hide category header based on filter
    const catTitle = document.getElementById('category-section-title');
    catTitle.innerText = currentCategory === 'All' ? 'Nossos Produtos' : `Categoria: ${currentCategory}`;
}

function renderCard(product) {
    return `
        <div class="product-card">
            <div class="product-placeholder" onclick="openModal(${product.id})">
                Produto ainda não adicionado
            </div>
            <div class="product-card__category">${product.category}</div>
            <h3 class="product-card__title">${product.name}</h3>
            <p class="product-card__info">${product.description}</p>
            <div class="product-card__price">R$ ${product.price}</div>
            <button class="product-card__btn" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        </div>
    `;
}

// Cart UI Logic
const cartSidebar = document.getElementById('cart-sidebar');
const cartIconTrigger = document.getElementById('cart-icon-trigger');
const cartClose = document.getElementById('cart-sidebar-close');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalValue = document.getElementById('cart-total-value');

cartIconTrigger.onclick = () => cartSidebar.classList.add('active');
cartClose.onclick = () => cartSidebar.classList.remove('active');

function addToCart(id) {
    const product = PRODUCTS.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    cartSidebar.classList.add('active');
}

function updateCartUI() {
    cartCount.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div style="width: 60px; height: 60px; background: var(--accent-orange); flex-shrink: 0;"></div>
            <div class="cart-item__info">
                <h4>${item.name}</h4>
                <p>Qtd: ${item.quantity} x R$ ${item.price}</p>
            </div>
            <span class="cart-item__remove" onclick="removeFromCart(${item.id})">&times;</span>
        </div>
    `).join('');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 2rem;">Seu carrinho está vazio.</p>';
    }

    const total = cart.reduce((acc, item) => {
        const price = parseFloat(item.price.replace(',', '.'));
        return acc + (price * item.quantity);
    }, 0);
    
    cartTotalValue.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function checkoutCart() {
    if (cart.length === 0) return alert('Seu carrinho está vazio!');
    
    const itemsList = cart.map(item => `- ${item.name} (${item.quantity}x)`).join('\n');
    const total = cartTotalValue.innerText;
    const message = `Olá! Gostaria de finalizar o pedido:\n\n${itemsList}\n\n*Total: ${total}*`;
    
    const url = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Modal Logic
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

function openModal(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    document.getElementById('modal-placeholder').innerText = "Produto ainda não adicionado";
    document.getElementById('modal-category').innerText = product.category;
    document.getElementById('modal-title').innerText = product.name;
    document.getElementById('modal-description').innerText = product.description;
    document.getElementById('modal-tech-info').innerText = product.info;
    document.getElementById('modal-price').innerText = `R$ ${product.price}`;
    

    // Recommendations
    const recs = PRODUCTS.filter(p => p.id !== id).slice(0, 3);
    document.getElementById('modal-recommendations').innerHTML = recs.map(p => `
        <div class="product-card" style="padding: 1rem;" onclick="openModal(${p.id})">
            <div style="width: 100%; height: 150px; background: var(--accent-orange); display: flex; align-items: center; justify-content: center; color: white; font-size: 0.6rem; text-align: center; font-weight: 900; text-transform: uppercase;">Ainda não adicionado</div>
            <h4 style="font-size: 0.9rem; margin-top: 1rem;">${p.name}</h4>
            <div class="product-card__price" style="font-size: 1.1rem; margin-top: 0.5rem;">R$ ${p.price}</div>
        </div>
    `).join('');

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

modalClose.onclick = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
};

modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) modalClose.onclick();
};

// Purchase Logic
function buyWhatsApp(id) {
    const product = PRODUCTS.find(p => p.id === id);
    const message = `Olá! Tenho interesse no produto manipulado: *${product.name}* (R$ ${product.price}). Pode me ajudar?`;
    const url = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Form Submission (Mock for Static)
const contactForm = document.getElementById('contact-form');
contactForm.onsubmit = (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Logo entraremos em contato.');
    contactForm.reset();
};

// Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

// Init
function init() {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    renderProducts();
    
    // Initial carousel content setup
    if (slides.length > 0) {
        const firstContent = slides[0].querySelector('.carousel__content');
        if (firstContent) {
            firstContent.style.opacity = '1';
            firstContent.style.transform = 'translateY(0)';
        }
    }
}

// Run init
init();
