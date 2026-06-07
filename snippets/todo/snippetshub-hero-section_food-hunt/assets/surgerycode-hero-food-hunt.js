/* SnippetsHub Hero Food Hunt — v1.0 | SurgeryCode.com */
(function () {
  'use strict';

  class FoodHeroCarousel {
    constructor(sectionId) {
      this.id = sectionId;
      this.root = document.getElementById('sc-food-hero-' + sectionId);
      if (!this.root) return;

      this.dishes = (window.scFoodHeroDishes || {})[sectionId] || [];
      if (this.dishes.length < 2) return;

      this.currentIndex = 0;

      this.mainImg = this.root.querySelector('.sc-food-hero__main-img');
      this.dishName = this.root.getElementById
        ? null
        : document.getElementById('sc-dish-name-' + sectionId);
      this.dishDesc = document.getElementById('sc-dish-desc-' + sectionId);
      this.dishNameEl = document.getElementById('sc-dish-name-' + sectionId);
      this.orbitItems = Array.from(this.root.querySelectorAll('.sc-food-hero__orbit-item'));

      this.root.querySelector('[data-sc-prev]')?.addEventListener('click', () => this.navigate(-1));
      this.root.querySelector('[data-sc-next]')?.addEventListener('click', () => this.navigate(1));

      this.orbitItems.forEach((btn, i) => {
        btn.addEventListener('click', () => this.goTo(i + 1));
      });
    }

    navigate(direction) {
      const total = this.dishes.length;
      const next = (this.currentIndex + direction + total) % total;
      this.goTo(next);
    }

    goTo(index) {
      if (index === this.currentIndex) return;
      this.currentIndex = index;
      this.updateMainDish();
      this.updateOrbitActive();
    }

    updateMainDish() {
      const dish = this.dishes[this.currentIndex];
      if (!dish || !this.mainImg) return;

      this.mainImg.classList.add('is-fading');

      setTimeout(() => {
        const src = dish.image || dish.imageFallback;
        if (src) this.mainImg.src = src;
        if (dish.name && this.dishNameEl) this.dishNameEl.textContent = dish.name;
        if (dish.description && this.dishDesc) this.dishDesc.textContent = dish.description;
        this.mainImg.alt = dish.name || '';
        this.mainImg.classList.remove('is-fading');
      }, 180);
    }

    updateOrbitActive() {
      this.orbitItems.forEach((btn, i) => {
        const orbitIndex = i + 1;
        btn.classList.toggle('is-active', orbitIndex === this.currentIndex);
      });
    }
  }

  function init() {
    const heroes = document.querySelectorAll('[data-sc-food-hero]');
    heroes.forEach((el) => {
      const id = el.id.replace('sc-food-hero-', '');
      new FoodHeroCarousel(id);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
