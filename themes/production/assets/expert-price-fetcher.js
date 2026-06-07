/**
 * Expert Price Fetcher for SnippetsHub
 * Price source is resolved dynamically by handle/variant mapping.
 */
(function() {
    window.ExpertInstallBasePrice = window.ExpertInstallBasePrice || 8900;
    window.ExpertCurrency = window.ExpertCurrency || "USD";

    function triggerInitialPriceUpdate() {
        document.querySelectorAll('[data-expert-price-placeholder]').forEach((el) => {
            const container = el.closest('.product-card, .snippet-card, .upsell-box, article, .product-info, .shopify-sticky-cta');
            const qtyInput = container ? container.querySelector('[data-expert-install-quantity]') : null;
            const qty = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
            window.updateExpertDisplayPrice(el, qty);
        });
    }

    async function resolveBasePrice() {
        const resolver = window.ExpertInstallUpsell && typeof window.ExpertInstallUpsell.resolveExpertInstallProduct === 'function'
            ? window.ExpertInstallUpsell.resolveExpertInstallProduct
            : null;

        if (resolver) {
            const product = await resolver();
            if (product && typeof product.price === 'number') {
                window.ExpertInstallBasePrice = product.price;
                window.ExpertCurrency = product.currency || window.Shopify?.currency?.active || 'USD';
                return true;
            }
        }

        const handles = Array.isArray(window.SnippetsHubExpertInstallHandles) && window.SnippetsHubExpertInstallHandles.length
            ? window.SnippetsHubExpertInstallHandles
            : ['shopify-developer-nbsp-by-the-hour', 'developer-hour', 'expert-installation', 'expert-install', 'shopify-developer-hour'];

        for (const handle of handles) {
            try {
                const response = await fetch(`/products/${encodeURIComponent(handle)}.js`, { credentials: 'same-origin' });
                if (!response.ok) continue;
                const product = await response.json();
                if (!product || !Array.isArray(product.variants) || !product.variants.length) continue;

                const variant = product.variants.find((item) => item.available) || product.variants[0];
                if (!variant || typeof variant.price !== 'number') continue;

                window.ExpertInstallBasePrice = variant.price;
                window.ExpertCurrency = window.Shopify?.currency?.active || 'USD';
                return true;
            } catch (error) {
                // try next handle
            }
        }

        return false;
    }

    window.updateExpertDisplayPrice = function(element, quantity = 1) {
        if (!element || !window.ExpertInstallBasePrice) return;

        const totalCents = window.ExpertInstallBasePrice * quantity;
        const formattedPrice = (totalCents / 100).toFixed(2);
        const currency = window.ExpertCurrency || 'USD';

        element.textContent = `+${formattedPrice} ${currency}`;
    };

    document.addEventListener('DOMContentLoaded', async () => {
        try {
            await resolveBasePrice();
        } catch (error) {
            console.error('Error resolving expert price:', error);
        } finally {
            triggerInitialPriceUpdate();
        }
    });
})();
