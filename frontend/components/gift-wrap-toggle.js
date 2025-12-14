export class GiftWrapToggle extends HTMLElement {
  connectedCallback() {
    // Data from Liquid
    this.lineKey = this.dataset.lineKey;
    this.productTitle = this.dataset.productTitle;
    this.active = this.dataset.active === 'true';

    // Elements
    this.checkbox = this.querySelector('.gift-wrap-toggle__checkbox');

    if (!this.checkbox) {
      console.warn('[gift-wrap-toggle] checkbox not found', this);
      return;
    }

    // Sync initial state
    this.checkbox.checked = this.active;

    // Bind
    this.onChange = this.onChange.bind(this);
    this.checkbox.addEventListener('change', this.onChange);

    console.debug('[gift-wrap-toggle] ready', {
      lineKey: this.lineKey,
      active: this.active
    });
  }

  disconnectedCallback() {
    if (this.checkbox) {
      this.checkbox.removeEventListener('change', this.onChange);
    }
  }

  onChange(event) {
    this.active = this.checkbox.checked;

    console.debug('[gift-wrap-toggle] toggled', {
      lineKey: this.lineKey,
      active: this.active
    });

    // Dispatch a custom event (no cart logic yet)
    this.dispatchEvent(
      new CustomEvent('gift-wrap-toggle:change', {
        bubbles: true,
        detail: {
          lineKey: this.lineKey,
          active: this.active
        }
      })
    );
  }
}
