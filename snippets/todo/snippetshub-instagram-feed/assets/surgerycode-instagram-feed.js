/*
  🧩 Instagram Feed Script (v1.1)
  Developed by SurgeryCode | https://SurgeryCode.com
  © 2025 SnippetsHub & SurgeryCode
*/

(() => {
  'use strict';

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  async function fetchItems(endpoint) {
    if (!endpoint) return [];
    try {
      const res = await fetch(endpoint, { credentials: 'omit' });
      if (!res.ok) return [];
      const json = await res.json();
      if (Array.isArray(json)) return json;
      if (Array.isArray(json.data)) return json.data;
      return [];
    } catch (err) {
      console.warn('[SurgeryCode IG] fetch failed', err);
      return [];
    }
  }

  function buildItem(item) {
    const img  = escapeHtml(item.media_url || item.thumbnail_url || item.url || '');
    const link = escapeHtml(item.permalink || item.link || '#');
    const alt  = escapeHtml(item.caption || item.alt || '');
    if (!img) return '';
    return `<a class="surgerycode-ig__item" href="${link}" target="_blank" rel="noopener nofollow" aria-label="${alt || 'Instagram post'}">
      <img class="surgerycode-ig__img" src="${img}" alt="${alt}" loading="lazy" width="280" height="280">
    </a>`;
  }

  async function initInstance(root) {
    const endpoint = root.dataset.endpoint;
    const limit    = parseInt(root.dataset.limit || '8', 10);
    const grid     = root.querySelector('.surgerycode-ig__grid');
    if (!grid) return;

    if (!endpoint) {
      grid.innerHTML = '<p class="surgerycode-ig__notice">No endpoint configured.</p>';
      return;
    }

    grid.setAttribute('aria-busy', 'true');
    const items = await fetchItems(endpoint);
    grid.removeAttribute('aria-busy');

    if (!items.length) {
      grid.innerHTML = '<p class="surgerycode-ig__notice">No posts found.</p>';
      return;
    }

    grid.innerHTML = items.slice(0, limit).map(buildItem).filter(Boolean).join('');
  }

  function init() {
    document.querySelectorAll('.surgerycode-ig').forEach(initInstance);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
