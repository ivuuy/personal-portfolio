// Use the upstream renderer unchanged: RGB and alpha occupy two halves of one video.
import { createHandRenderer } from './assets/vendor/handstouch/hand-renderer.js';

const hero = document.querySelector('.hero');
const frame = hero.querySelector('.hands-frame');
const canvas = hero.querySelector('.hands-canvas');
const hands = hero.querySelector('.hands-source');
const background = hero.querySelector('.hero-surface-video');
const toggle = hero.querySelector('.motion-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let disposeRenderer;
let inView = true;
let userPaused = false;
let failed = false;

function stop() {
  disposeRenderer?.();
  disposeRenderer = undefined;
  hands.pause();
  background.pause();
  frame.dataset.ready = 'false';
}

function syncMotion() {
  const paused = userPaused || reducedMotion.matches;
  toggle.textContent = failed ? '动画暂不可用' : reducedMotion.matches ? '已减少动态效果' : paused ? '播放动画' : '暂停动画';
  toggle.setAttribute('aria-pressed', String(paused));
  toggle.disabled = reducedMotion.matches || failed;
  if (paused || !inView || document.hidden || failed) {
    stop();
    return;
  }
  if (!disposeRenderer) {
    try {
      disposeRenderer = createHandRenderer(canvas, hands, ready => {
        frame.dataset.ready = String(ready);
      });
    } catch (error) {
      console.warn('Hands animation unavailable; keeping the transparent poster.', error);
      failed = true;
      syncMotion();
      return;
    }
  }
  background.play().catch(() => {});
}

toggle.addEventListener('click', () => {
  userPaused = !userPaused;
  syncMotion();
});
hands.addEventListener('error', () => {
  failed = true;
  syncMotion();
});
const visibilityObserver = new IntersectionObserver(([entry]) => {
  inView = entry.isIntersecting;
  syncMotion();
}, { threshold: 0 });
visibilityObserver.observe(hero);
document.addEventListener('visibilitychange', syncMotion);
reducedMotion.addEventListener('change', syncMotion);
window.addEventListener('pagehide', stop);
window.addEventListener('pageshow', syncMotion);
syncMotion();
