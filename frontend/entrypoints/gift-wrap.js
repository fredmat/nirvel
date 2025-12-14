import { GiftWrapToggle } from '../components/gift-wrap-toggle';

if (!customElements.get('gift-wrap-toggle')) {
  customElements.define('gift-wrap-toggle', GiftWrapToggle);
}

console.debug('[gift-wrap] gift-wrap-toggle registered');

/**
 * Gift wrap orchestrator
 * Listens to UI events and decides what to do
 */
document.addEventListener('gift-wrap-toggle:change', function (event) {
  var detail = event.detail;
  if (!detail) return;

  var lineKey = detail.lineKey;
  var active = detail.active;

  console.debug('[gift-wrap-orchestrator] change received', {
    lineKey: lineKey,
    active: active
  });

  // ⚠️ No cart logic yet
  // Next step: add / remove gift wrap product
});
