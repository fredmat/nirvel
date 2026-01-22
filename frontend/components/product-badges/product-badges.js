class ProductBadges extends HTMLElement {
  connectedCallback() {
    this.variantPicker =
      this.closest('product-card, .product-card, [data-product-card]')?.querySelector(
        'variant-picker, swatches-variant-picker-component'
      ) ||
      document.querySelector(
        '[data-product-grid-content] variant-picker, [data-product-grid-content] swatches-variant-picker-component'
      );

    if (!this.variantPicker) return;

    this.variantPicker.addEventListener('variant:update', this.onVariantUpdate);
  }

  disconnectedCallback() {
    this.variantPicker?.removeEventListener('variant:update', this.onVariantUpdate);
  }

  onVariantUpdate = (event) => {
    const { data } = event.detail || {};
    if (!data?.html) return;

    if (data.newProduct) {
      this.dataset.productId = data.newProduct.id;
    } else if (
      event.target instanceof HTMLElement &&
      event.target.dataset.productId !== this.dataset.productId
    ) {
      return;
    }

    const newBadge = data.html.querySelector('product-badges');
    if (!newBadge) return;

    const animationsEnabled = this.classList.contains('product-badges--animations-enabled');

    if (!animationsEnabled) {
      if (window.Theme?.morph) {
        window.Theme.morph(this, newBadge, { childrenOnly: true });
      } else {
        this.innerHTML = newBadge.innerHTML;
      }
      return;
    }

    this.classList.remove('badge-animate');
    this.classList.add('badge-fade-out');

    const onFadeOutEnd = () => {
      this.removeEventListener('animationend', onFadeOutEnd);
      this.classList.remove('badge-fade-out');

      if (window.Theme?.morph) {
        window.Theme.morph(this, newBadge, { childrenOnly: true });
      } else {
        this.innerHTML = newBadge.innerHTML;
      }

      void this.offsetWidth;
      this.classList.add('badge-animate');
    };

    this.addEventListener('animationend', onFadeOutEnd, { once: true });
  };
}

if (!customElements.get('product-badges')) {
  customElements.define('product-badges', ProductBadges);
}
