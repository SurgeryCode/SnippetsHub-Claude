/*
  🧩 Counter Web Component (v1.0)
  Developed by SurgeryCode | https://SurgeryCode.com
  © 2025 SnippetsHub & SurgeryCode
*/

class SurgerycodeCounter extends HTMLElement {
  connectedCallback() {
    const target    = this.getAttribute('target');
    const type      = (this.getAttribute('type') || 'until').toLowerCase();
    const showDays  = this.getAttribute('show-days') !== 'false';
    const targetDate = target ? new Date(target) : null;

    if (!targetDate || isNaN(targetDate.getTime())) {
      console.warn('[SurgeryCode Counter] Invalid target attribute:', target);
      return;
    }

    this._render(showDays);
    this._tick(targetDate, type, showDays);
    this._iv = setInterval(() => this._tick(targetDate, type, showDays), 1000);
  }

  disconnectedCallback() {
    clearInterval(this._iv);
  }

  _render(showDays) {
    const labelSlot = this.querySelector('[slot="label"]');
    const labelHtml = labelSlot
      ? `<div class="sc-counter__label">${labelSlot.textContent}</div>`
      : '';
    labelSlot?.remove();

    const segments = showDays
      ? ['days', 'hours', 'minutes', 'seconds']
      : ['hours', 'minutes', 'seconds'];

    const units = { days: 'days', hours: 'hrs', minutes: 'min', seconds: 'sec' };

    const segsHtml = segments.map((key, i) => {
      const sep = i < segments.length - 1
        ? '<span class="sc-counter__sep" aria-hidden="true">:</span>'
        : '';
      return `<div class="sc-segment">
        <span class="sc-segment__value" data-key="${key}">00</span>
        <span class="sc-segment__unit">${units[key]}</span>
      </div>${sep}`;
    }).join('');

    this.innerHTML = `
      <style>
        surgerycode-counter { display: inline-flex; flex-direction: column; align-items: center; gap: .5rem; }
        .sc-counter__label { font-size: .875rem; color: #555; font-weight: 500; }
        .sc-counter__wrap { display: flex; align-items: center; gap: .25rem; }
        .sc-counter__sep { font-size: 1.25rem; font-weight: 700; color: #555; align-self: flex-start; margin-top: .4rem; line-height: 1; }
        .sc-segment { display: flex; flex-direction: column; align-items: center; gap: .2rem; min-width: 3.5rem; background: #f5f5f5; border-radius: 8px; padding: .5rem .625rem; }
        .sc-segment__value { font-size: 1.5rem; font-weight: 700; color: #111; font-variant-numeric: tabular-nums; line-height: 1; }
        .sc-segment__unit { font-size: .65rem; text-transform: uppercase; letter-spacing: .08em; color: #888; }
        @media (max-width: 480px) {
          .sc-segment { min-width: 2.75rem; padding: .4rem .5rem; }
          .sc-segment__value { font-size: 1.2rem; }
        }
      </style>
      ${labelHtml}
      <div class="sc-counter__wrap" aria-live="polite">${segsHtml}</div>
    `;
  }

  _tick(targetDate, type, showDays) {
    const now    = new Date();
    const diffMs = Math.max(0, type === 'since' ? now - targetDate : targetDate - now);
    const total  = Math.floor(diffMs / 1000);
    const secs   = total % 60;
    const mins   = Math.floor(total / 60) % 60;

    const vals = showDays
      ? { days: Math.floor(total / 86400), hours: Math.floor(total / 3600) % 24, minutes: mins, seconds: secs }
      : { hours: Math.floor(total / 3600), minutes: mins, seconds: secs };

    for (const [key, val] of Object.entries(vals)) {
      const el = this.querySelector(`[data-key="${key}"]`);
      if (el) el.textContent = String(val).padStart(2, '0');
    }
  }
}

if (!customElements.get('surgerycode-counter')) {
  customElements.define('surgerycode-counter', SurgerycodeCounter);
}
