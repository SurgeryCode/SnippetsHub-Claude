const cards     = document.querySelectorAll('.product-card');
const track     = document.getElementById('productsTrack');
const vp        = document.querySelector('.products-viewport');
const prevBtn   = document.getElementById('sliderPrev');
const nextBtn   = document.getElementById('sliderNext');
const counterEl = document.getElementById('counterCurrent');
const stripEl   = document.getElementById('stripCountCurrent');
const shoeEmoji = document.getElementById('shoeEmoji');
const heroLabel = document.getElementById('heroLabel');
const heroPrice = document.getElementById('heroPrice');

const TOTAL   = cards.length;
const VISIBLE = 3.5;
const GAP     = 12;
const SNAP    = 55;
let idx  = 0;
let step = 0;

function getStep() {
  if (!step) step = cards[0].getBoundingClientRect().width + GAP;
  return step;
}
window.addEventListener('resize', () => { step = 0; });

function maxOff() { return Math.max(0, (TOTAL - VISIBLE) * getStep()); }
function toOff(i) { return Math.min(Math.max(0, i * getStep()), maxOff()); }
function clamp(v) { return Math.max(0, Math.min(v, maxOff())); }

function go(i) {
  idx = Math.max(0, Math.min(i, TOTAL - 1));
  track.style.setProperty('--track-offset', `-${toOff(idx)}px`);
  cards.forEach((c, n) => c.classList.toggle('active', n === idx));

  const lbl = String(idx + 1).padStart(2, '0');
  counterEl.textContent = lbl;
  if (stripEl) stripEl.textContent = lbl;

  /* Hero emoji — zmiana wariantu przez klasę CSS zamiast style.filter */
  shoeEmoji.className = idx > 0
    ? `shoe-display__emoji shoe-display__emoji--${idx}`
    : 'shoe-display__emoji';

  if (heroLabel) heroLabel.textContent = cards[idx].querySelector('.card-name').textContent.toUpperCase();
  if (heroPrice) heroPrice.textContent = cards[idx].querySelector('.card-price').textContent;

  prevBtn.classList.toggle('disabled', idx === 0);
  nextBtn.classList.toggle('disabled', idx === TOTAL - 1);
}

go(0);

/* Autoplay */
let timer = setInterval(() => go(idx + 1 < TOTAL ? idx + 1 : 0), 4000);
const strip = document.querySelector('.products-strip');
strip.addEventListener('mouseenter', () => clearInterval(timer));
strip.addEventListener('mouseleave', () => { timer = setInterval(() => go(idx + 1 < TOTAL ? idx + 1 : 0), 4000); });

nextBtn.addEventListener('click', () => go(idx + 1));
prevBtn.addEventListener('click', () => go(idx - 1));
cards.forEach((c, i) => c.addEventListener('click', () => { if (!locked) go(i); }));
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') go(idx + 1);
  if (e.key === 'ArrowLeft')  go(idx - 1);
});

/* Drag / swipe
   .dragging na vp: CSS wyłącza transition na track, zmienia kursor */
let x0 = null, base = 0, moved = false, locked = false;

function begin(x) {
  x0 = x; base = toOff(idx); moved = false;
  vp.classList.add('dragging');
}
function slide(x) {
  if (x0 === null) return;
  if (Math.abs(x0 - x) > 5) moved = true;
  if (!moved) return;
  track.style.setProperty('--track-offset', `-${clamp(base + (x0 - x))}px`);
}
function finish(x) {
  if (x0 === null) return;
  const d = x0 - x, was = moved;
  x0 = null; moved = false;
  vp.classList.remove('dragging');
  if (was) {
    locked = true; setTimeout(() => { locked = false; }, 20);
    go(idx + (Math.abs(d) >= SNAP ? (d > 0 ? 1 : -1) : 0));
  }
}
function reset() {
  x0 = null; moved = false;
  vp.classList.remove('dragging');
  track.style.setProperty('--track-offset', `-${toOff(idx)}px`);
}

vp.addEventListener('mousedown', e => { if (e.button) return; begin(e.clientX); });
document.addEventListener('mousemove', e => {
  if (x0 === null) return;
  e.preventDefault(); slide(e.clientX);
});
document.addEventListener('mouseup', e => {
  if (x0 === null) return;
  finish(e.clientX);
});
document.addEventListener('mouseleave', () => {
  if (x0 === null) return;
  finish(x0);
});

vp.addEventListener('touchstart', e => { begin(e.touches[0].clientX); }, { passive: true });
vp.addEventListener('touchmove', e => {
  if (x0 === null) return;
  e.preventDefault(); slide(e.touches[0].clientX);
}, { passive: false });
vp.addEventListener('touchend', e => { if (x0 !== null) finish(e.changedTouches[0].clientX); });
vp.addEventListener('touchcancel', reset);

/* Cart button — klasa CSS zamiast style.cssText */
document.querySelectorAll('.card-add').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    btn.textContent = '✓';
    btn.classList.add('is-added');
    setTimeout(() => { btn.textContent = '+'; btn.classList.remove('is-added'); }, 1000);
  });
});
