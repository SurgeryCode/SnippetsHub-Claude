/**
 * SnippetsHub PDP v2 JS
 * Gallery, Tabs, Quantity, Copy Code
 */

document.addEventListener('DOMContentLoaded', function() {
    // Thumbnail gallery switching
    const thumbnails = document.querySelectorAll('.pdp-v2-section .thumbnail');
    const mainImg = document.querySelector('.pdp-v2-section .gallery-main img');
    
    if (thumbnails.length && mainImg) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const newSrc = this.getAttribute('data-image');
                if (newSrc) {
                    mainImg.src = newSrc;
                }
            });
        });
    }

    // Tab switching
    const tabBtns = document.querySelectorAll('.pdp-v2-section .tab-btn');
    const tabContents = document.querySelectorAll('.pdp-v2-section .tab-content');

    if (tabBtns.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const target = this.getAttribute('data-tab');
                
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                this.classList.add('active');
                const targetContent = document.getElementById(target);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // Copy code sample
    const copyBtn = document.querySelector('.pdp-v2-section .copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const code = document.getElementById('pdp-code-sample');
            if (code) {
                navigator.clipboard.writeText(code.innerText).then(() => {
                    const originalText = this.innerText;
                    this.innerText = 'Copied!';
                    setTimeout(() => {
                        this.innerText = originalText;
                    }, 2000);
                });
            }
        });
    }

    // Expert Install Visibility (linking to expert-install-upsell.js logic if possible)
    // The existing expert-install-upsell.js already handles the checkbox toggle visibility
    // for .upsell-qty-wrapper. We just need to ensure the selectors match.
});
