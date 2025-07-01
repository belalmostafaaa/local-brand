document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialSlides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    setInterval(nextSlide, 5000);

    // Products Array with correct paths (assuming images are in assets/products/)
    const products = [
        {
            id: 1,
            image: 'assets/products/short1.jpg',
            title: 'Ocean Breeze Shorts',
            price: 370,
            description: 'Short with waterproof material provided with protection',
            category: 'Men’s Swimwear',
            inStock: true
        },
        {
            id: 2,
            image: 'assets/products/short2.jpeg',
            title: 'Wave Rider Pro',
            price: 350,
            description: 'Beach design Short with Flexible Material',
            category: 'Men’s Swimwear',
            inStock: true
        },
        {
            id: 3,
            image: 'assets/products/short3.jpeg',
            title: 'Tidal Hybrid Shorts',
            price: 350,
            description: 'Convertible design that works for both swimming and casual wear.',
            category: 'Men’s Hybrid',
            inStock: true
        }
    ];

    // Load featured products
    function loadFeaturedProducts() {
        const productGrid = document.querySelector('.product-grid');
        if (productGrid) {
            productGrid.innerHTML = products.map(product => `
                <div class="product-card">
                    <div class="product-img">
                        <img src="${product.image}" alt="${product.title}">
                        <div class="waterproof-badge">Waterproof</div>
                        <div class="product-actions">
                            
                            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3>${product.title}</h3>
                        <div class="product-price">EGP ${product.price.toFixed(2)}</div>
                        <p>${product.description}</p>
                    </div>
                </div>
            `).join('');
        }
        
        // Add event listeners after products are loaded
        setupProductInteractions();
    }

    // Setup product interactions
    function setupProductInteractions() {
        // Quick View Modal
        const quickViewModal = document.getElementById('quickViewModal');
        const closeModal = document.querySelector('.close-modal');

        function openModal(product) {
            document.getElementById('modalProductImg').src = product.image;
            document.getElementById('modalProductTitle').textContent = product.title;
            document.getElementById('modalProductPrice').textContent = `EGP ${product.price.toFixed(2)}`;
            document.getElementById('modalProductDesc').textContent = product.description;
            document.getElementById('modalProductCategory').textContent = product.category;
            document.getElementById('modalProductStock').textContent = product.inStock ? 'In Stock' : 'Out of Stock';

            quickViewModal.style.display = 'flex';
            setTimeout(() => {
                quickViewModal.style.opacity = '1';
            }, 10);
            document.body.style.overflow = 'hidden';
        }

        function closeModalFunc() {
            quickViewModal.style.opacity = '0';
            setTimeout(() => {
                quickViewModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }

        // Quick View buttons
        document.querySelectorAll('.quick-view').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                if (product) openModal(product);
            });
        });

        // Modal close events
        quickViewModal.addEventListener('click', function(e) {
            if (e.target === quickViewModal) {
                closeModalFunc();
            }
        });

        closeModal.addEventListener('click', closeModalFunc);

        // Size selector
        const sizeOptions = document.querySelectorAll('.size-option');
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                sizeOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Quantity selector
        const quantityMinus = document.querySelector('.quantity-minus');
        const quantityPlus = document.querySelector('.quantity-plus');
        const quantityInput = document.querySelector('.quantity-control input');

        if (quantityMinus && quantityPlus && quantityInput) {
            quantityMinus.addEventListener('click', function() {
                let value = parseInt(quantityInput.value);
                if (value > 1) {
                    quantityInput.value = value - 1;
                }
            });

            quantityPlus.addEventListener('click', function() {
                let value = parseInt(quantityInput.value);
                quantityInput.value = value + 1;
            });
        }

        // Cart functionality
        const addToCartBtns = document.querySelectorAll('.add-to-cart, .add-to-cart-btn');
        const cartCount = document.querySelectorAll('.cart-count');
        let cartItems = 0;

        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                cartItems++;
                cartCount.forEach(count => count.textContent = cartItems);

                // Show confirmation
                const confirmation = document.createElement('div');
                confirmation.className = 'cart-confirmation';
                confirmation.innerHTML = `
                    <div class="confirmation-content">
                        <i class="fas fa-check-circle"></i>
                        <p>Added to your beach bag!</p>
                    </div>
                `;
                document.body.appendChild(confirmation);

                setTimeout(() => {
                    confirmation.classList.add('show');
                }, 10);

                setTimeout(() => {
                    confirmation.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(confirmation);
                    }, 300);
                }, 3000);
            });
        });
    }

    // Initialize
    loadFeaturedProducts();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            document.querySelector('.header').classList.add('scrolled');
        } else {
            document.querySelector('.header').classList.remove('scrolled');
        }
    });
});

