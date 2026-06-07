/**
 * Featured Product Card Interactions
 * Adds a mouse-following shine effect.
 */
document.addEventListener('DOMContentLoaded', () => {
    const featuredCards = document.querySelectorAll('.featured-premium');
    
    featuredCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
});
