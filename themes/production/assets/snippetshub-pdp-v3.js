/**
 * SnippetsHub PDP v3 - Strict 1:1 Match JS
 * Source: pdp-snippetshub-updated _v1.html
 */

document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.snippetshub-pdp-v3-wrapper');
    if (!wrapper) return;

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;

    themeToggle?.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        if (themeToggle) {
            themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        }
    }

    // Thumbnail gallery functionality
    const thumbnails = wrapper.querySelectorAll('.thumbnail');
    const mainImage = wrapper.querySelector('#mainImage');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const imageUrl = this.dataset.image;
            if (imageUrl && mainImage) {
                mainImage.src = imageUrl;
                const thumbImg = this.querySelector('img');
                if (thumbImg) mainImage.alt = thumbImg.alt;
            }
        });
    });

    // Quantity controls
    const decreaseBtn = wrapper.querySelector('#decreaseQty');
    const increaseBtn = wrapper.querySelector('#increaseQty');
    const quantityInput = wrapper.querySelector('#quantityInput');

    decreaseBtn?.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    increaseBtn?.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });

    // Variant selection
    const variantOptions = wrapper.querySelectorAll('.variant-option');
    const priceElement = wrapper.querySelector('.price-current');

    variantOptions.forEach(option => {
        option.addEventListener('click', function() {
            variantOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const price = this.dataset.price;
            if (priceElement && price) {
                priceElement.textContent = price;
            }
        });
    });

    // Tabs functionality
    const tabButtons = wrapper.querySelectorAll('.tab-btn');
    const tabContents = wrapper.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            wrapper.querySelector(`#${targetTab}`)?.classList.add('active');
        });
    });

    // Copy code functionality
    const copyButtons = wrapper.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.dataset.copy;
            const codeElement = wrapper.querySelector(`#${targetId}`);
            if (codeElement) {
                const codeText = codeElement.textContent;

                navigator.clipboard.writeText(codeText).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                });
            }
        });
    });

    // Scroll to top
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn?.classList.add('visible');
        } else {
            scrollToTopBtn?.classList.remove('visible');
        }
    });

    scrollToTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate review bars on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.review-bar-fill');
                bars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const reviewSummary = wrapper.querySelector('.review-summary');
    if (reviewSummary) {
        observer.observe(reviewSummary);
    }
});
