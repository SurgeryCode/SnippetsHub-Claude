/*
  🧩 Predictive Search Script (v1.1)
  Developed by SurgeryCode | https://SurgeryCode.com
  © 2025 SnippetsHub & SurgeryCode
*/

(() => {
  'use strict';

  const API = '/search/suggest.json';

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatMoney(cents) {
    if (!cents && cents !== 0) return '';
    if (window.Shopify?.money_format) {
      return window.Shopify.money_format
        .replace('{{amount}}', (cents / 100).toFixed(2))
        .replace('{{amount_no_decimals}}', Math.round(cents / 100));
    }
    return '$' + (cents / 100).toFixed(2);
  }

  function buildItem(item, showPrice) {
    const url   = escapeHtml(item.url || '#');
    const title = escapeHtml(item.title || '');
    const img   = item.image
      ? `<img class="surgerycode-search__thumb" src="${escapeHtml(item.image)}" alt="" width="44" height="44" loading="lazy">`
      : '';
    const price = showPrice && item.price
      ? `<span class="surgerycode-search__price">${formatMoney(item.price)}</span>`
      : '';
    return `<a class="surgerycode-search__item" href="${url}" role="option" aria-selected="false" tabindex="-1">
      ${img}
      <span class="surgerycode-search__meta">
        <span class="surgerycode-search__title">${title}</span>
        ${price}
      </span>
    </a>`;
  }

  async function fetchResults(q, limit) {
    const params = new URLSearchParams({ q, resources: 'product', limit: String(limit) });
    try {
      const res = await fetch(`${API}?${params}`, { credentials: 'same-origin' });
      if (!res.ok) return [];
      const data = await res.json();
      return (data?.resources?.results?.products || []).map(p => ({
        title: p.title,
        url:   p.url,
        image: p.image,
        price: p.price,
      }));
    } catch {
      return [];
    }
  }

  function initInstance(root) {
    const input     = root.querySelector('.surgerycode-search__input');
    const box       = root.querySelector('.surgerycode-search__results');
    const limit     = parseInt(root.dataset.limit || '5', 10);
    const showPrice = root.dataset.showPrice !== 'false';

    let timer, activeIdx = -1, optionEls = [];

    function close() {
      box.hidden = true;
      box.innerHTML = '';
      optionEls = [];
      activeIdx = -1;
      root.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
    }

    function open(html) {
      box.innerHTML = html;
      box.hidden = false;
      optionEls = Array.from(box.querySelectorAll('.surgerycode-search__item'));
      activeIdx = -1;
      root.setAttribute('aria-expanded', 'true');
    }

    function setActive(idx) {
      optionEls.forEach((el, i) => {
        const on = i === idx;
        el.setAttribute('aria-selected', on ? 'true' : 'false');
        el.classList.toggle('is-active', on);
      });
      activeIdx = idx;
      if (idx >= 0 && optionEls[idx]) {
        const id = `sc-search-opt-${idx}`;
        optionEls[idx].id = id;
        input.setAttribute('aria-activedescendant', id);
      } else {
        input.removeAttribute('aria-activedescendant');
      }
    }

    input.addEventListener('input', () => {
      const q = input.value.trim();
      clearTimeout(timer);
      if (q.length < 2) { close(); return; }
      timer = setTimeout(async () => {
        const results = await fetchResults(q, limit);
        if (!results.length) { close(); return; }
        open(results.map(r => buildItem(r, showPrice)).join(''));
      }, 200);
    });

    input.addEventListener('keydown', (e) => {
      if (box.hidden) return;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActive(Math.min(activeIdx + 1, optionEls.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActive(Math.max(activeIdx - 1, 0));
          break;
        case 'Enter':
          if (activeIdx >= 0 && optionEls[activeIdx]) {
            e.preventDefault();
            optionEls[activeIdx].click();
          }
          break;
        case 'Escape':
          close();
          break;
      }
    });

    document.addEventListener('click', (e) => {
      if (!root.contains(e.target)) close();
    });
  }

  function init() {
    document.querySelectorAll('[data-sc-search]').forEach(initInstance);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
