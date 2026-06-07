/*
 * SnippetsHub | License: Default is Single Store License unless the purchased product variant states otherwise. | Version: 1.0.0 | Support: support@snippetshub.com
 */

(() => {
  const ROOT_SELECTOR = '[data-snh="snippetshub-announcement-bar"]';

  class SnhAnnouncementBar {
    constructor(root) {
      this.root = root;
      this.track = root.querySelector('[data-snh-track]');
      this.slides = Array.from(root.querySelectorAll('[data-snh-slide]'));
      this.dots = Array.from(root.querySelectorAll('[data-snh-dot]'));
      this.prevBtn = root.querySelector('[data-snh-prev]');
      this.nextBtn = root.querySelector('[data-snh-next]');
      this.closeBtn = root.querySelector('[data-snh-close]');
      this.autoplay = root.dataset.autoplay !== 'false';
      this.speed = Number(root.dataset.speed) || 4000;
      this.closeId = root.dataset.closeId || '';
      this.current = 0;
      this.timer = null;

      if (!this.track || this.slides.length === 0) return;

      if (this.closeId && sessionStorage.getItem(this.closeId) === 'dismissed') {
        root.setAttribute('data-snh-dismissed', 'true');
        return;
      }

      this.setup();
    }

    setup() {
      this.goTo(0);

      if (this.slides.length > 1 && this.autoplay) {
        this.startTimer();

        this.root.addEventListener('mouseenter', () => this.stopTimer());
        this.root.addEventListener('mouseleave', () => this.startTimer());
        this.root.addEventListener('focusin', () => this.stopTimer());
        this.root.addEventListener('focusout', () => this.startTimer());
      }

      this.dots.forEach((dot) => {
        dot.addEventListener('click', () => {
          this.stopTimer();
          this.goTo(Number(dot.dataset.snhDot));
          if (this.autoplay) this.startTimer();
        });
      });

      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => {
          this.stopTimer();
          this.goTo((this.current - 1 + this.slides.length) % this.slides.length);
          if (this.autoplay) this.startTimer();
        });
      }

      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => {
          this.stopTimer();
          this.goTo((this.current + 1) % this.slides.length);
          if (this.autoplay) this.startTimer();
        });
      }

      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => {
          this.dismiss();
        });
      }
    }

    goTo(index) {
      this.slides[this.current]?.classList.remove('is-active');
      this.slides[this.current]?.setAttribute('aria-hidden', 'true');
      this.dots[this.current]?.classList.remove('is-active');
      this.dots[this.current]?.setAttribute('aria-selected', 'false');

      this.current = index;

      this.slides[this.current]?.classList.add('is-active');
      this.slides[this.current]?.setAttribute('aria-hidden', 'false');
      this.dots[this.current]?.classList.add('is-active');
      this.dots[this.current]?.setAttribute('aria-selected', 'true');
    }

    startTimer() {
      this.stopTimer();
      this.timer = window.setInterval(() => {
        this.goTo((this.current + 1) % this.slides.length);
      }, this.speed);
    }

    stopTimer() {
      if (this.timer) {
        window.clearInterval(this.timer);
        this.timer = null;
      }
    }

    dismiss() {
      this.stopTimer();

      if (this.closeId) {
        sessionStorage.setItem(this.closeId, 'dismissed');
      }

      this.root.setAttribute('data-snh-dismissed', 'true');
    }
  }

  const init = () => {
    document.querySelectorAll(ROOT_SELECTOR).forEach((root) => {
      if (root.dataset.snhInitialized === 'true') return;
      root.dataset.snhInitialized = 'true';
      new SnhAnnouncementBar(root);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', init);
})();
