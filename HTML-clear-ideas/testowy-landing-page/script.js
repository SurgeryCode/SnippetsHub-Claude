/**
 * Testowy Landing Page
 * Slug: testowy-landing-page
 * Iteration: v2 — JS + Animations
 * Spec: ../SPEC.md — pattern IIFE, eventy hci:slug:*
 *
 * Vanilla JS only. Zero dependencies.
 */

(function () {
  'use strict';

  /* --- Selectors & Classes (zgodnie z SPEC.md) --- */
  const SELECTORS = {
    root: '.hci-testowy-landing-page',
    btn:  '.hci-testowy-landing-page__btn',
  };

  const CLASSES = {
    active:  'hci-testowy-landing-page--active',
    visible: 'hci-testowy-landing-page--visible',
  };

  /* --- State --- */
  let isActive = false;

  /* --- Init --- */
  function init() {
    const root = document.querySelector(SELECTORS.root);
    if (!root) return;

    const btn = root.querySelector(SELECTORS.btn);
    if (btn) btn.addEventListener('click', handleBtnClick);

    /* Animacja wejścia */
    requestAnimationFrame(() => {
      root.classList.add(CLASSES.visible);
    });
  }

  /* --- Handlers --- */
  function handleBtnClick(event) {
    event.preventDefault();
    isActive = !isActive;

    const root = document.querySelector(SELECTORS.root);
    if (root) root.classList.toggle(CLASSES.active, isActive);

    /* Custom event — format: hci:{slug}:{akcja} */
    document.dispatchEvent(new CustomEvent('hci:testowy-landing-page:toggle', {
      detail: { isActive },
      bubbles: true,
    }));
  }

  /* --- Start --- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
