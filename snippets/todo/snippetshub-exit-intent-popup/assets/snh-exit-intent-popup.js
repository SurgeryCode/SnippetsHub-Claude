/*
 * SnippetsHub | License: Default is Single Store License unless the purchased product variant states otherwise. | Version: 1.0.0 | Support: support@snippetshub.com
 */

(() => {
  const ROOT_SELECTOR = '[data-snh="snippetshub-exit-intent-popup"]';

  class SnhExitIntentPopup {
    constructor(root) {
      this.root = root;
      this.modal = root.querySelector('[data-snh-modal]');
      this.overlay = root.querySelector('[data-snh-overlay]');
      this.closeBtns = root.querySelectorAll('[data-snh-close]');
      this.copyBtn = root.querySelector('[data-snh-copy]');
      this.codeEl = root.querySelector('[data-snh-code]');
      this.feedback = root.querySelector('[data-snh-feedback]');
      this.ctaBtn = root.querySelector('[data-snh-cta]');

      this.sessionKey = root.dataset.sessionKey || 'snh-exit-popup';
      this.desktopTrigger = root.dataset.desktopTrigger || 'mouse_leave';
      this.mobileDelay = Number(root.dataset.mobileDelay || 15000);
      this.showOnce = root.dataset.showOnce !== 'false';
      this.timer = null;
      this.shown = false;

      if (!this.modal) return;
      if (this.showOnce && sessionStorage.getItem(this.sessionKey) === 'shown') return;

      this.bindClose();
      this.bindCopy();
      this.setupTriggers();
    }

    setupTriggers() {
      const isMobile = window.matchMedia('(max-width: 749px)').matches;

      if (!isMobile && this.desktopTrigger === 'mouse_leave') {
        // Exit intent: mouse moves toward top of viewport
        document.addEventListener('mouseleave', (e) => {
          if (e.clientY <= 20) this.show();
        });
      }

      // Timer trigger: mobile always, desktop if configured
      if (isMobile || this.desktopTrigger === 'timer') {
        this.timer = window.setTimeout(() => this.show(), this.mobileDelay);
      }

      // Pause timer on user interaction (sign of engagement)
      if (this.timer) {
        ['click', 'scroll', 'keydown'].forEach((ev) => {
          document.addEventListener(ev, () => this.resetTimer(), { once: true });
        });
      }
    }

    resetTimer() {
      if (this.timer) {
        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(() => this.show(), this.mobileDelay);
      }
    }

    show() {
      if (this.shown) return;
      this.shown = true;

      if (this.timer) window.clearTimeout(this.timer);
      if (this.showOnce) sessionStorage.setItem(this.sessionKey, 'shown');

      this.root.setAttribute('aria-hidden', 'false');
      this.root.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      // Focus first interactive element
      window.requestAnimationFrame(() => {
        const focusTarget = this.modal.querySelector('button, a, [tabindex]');
        focusTarget?.focus();
      });
    }

    close() {
      this.root.setAttribute('aria-hidden', 'true');
      this.root.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    bindClose() {
      this.closeBtns.forEach((btn) => btn.addEventListener('click', () => this.close()));

      this.overlay?.addEventListener('click', () => this.close());

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.root.classList.contains('is-open')) this.close();
      });
    }

    bindCopy() {
      if (!this.copyBtn || !this.codeEl) return;

      this.copyBtn.addEventListener('click', () => {
        const code = this.codeEl.textContent.trim();

        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(code).then(() => this.showCopyFeedback('Copied!'));
        } else {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = code;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          this.showCopyFeedback('Copied!');
        }
      });
    }

    showCopyFeedback(message) {
      if (!this.feedback) return;
      this.feedback.textContent = message;
      this.feedback.classList.add('is-visible');
      window.setTimeout(() => {
        this.feedback.classList.remove('is-visible');
        this.feedback.textContent = '';
      }, 1800);
    }
  }

  const init = () => {
    document.querySelectorAll(ROOT_SELECTOR).forEach((root) => {
      if (root.dataset.snhInitialized === 'true') return;
      root.dataset.snhInitialized = 'true';
      new SnhExitIntentPopup(root);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', init);
})();
