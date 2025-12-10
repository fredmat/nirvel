class ProductSavingsInfo extends HTMLElement {
  connectedCallback() {
    this.variantPicker =
      this.closest('product-card, .product-card, [data-product-card]')?.querySelector(
        'variant-picker, swatches-variant-picker-component'
      ) ||
      document.querySelector(
        '[data-product-grid-content] variant-picker, [data-product-grid-content] swatches-variant-picker-component'
      );

    if (!this.variantPicker) return;

    this.variantPicker.addEventListener('variant:selected', this.onVariantSelected);
    this.variantPicker.addEventListener('variant:update', this.onVariantUpdate);
  }

  disconnectedCallback() {
    this.variantPicker?.removeEventListener('variant:selected', this.onVariantSelected);
    this.variantPicker?.removeEventListener('variant:update', this.onVariantUpdate);
  }

  onVariantSelected = () => {
    const textComponent = this.querySelector('text-component');
    textComponent?.shimmer();
  };

  onVariantUpdate = (event) => {
    const { data } = event.detail || {};
    if (!data?.html) {
      window.Theme.resetShimmer(this);
      return;
    }

    if (data.newProduct) {
      this.dataset.productId = data.newProduct.id;
    } else if (
      event.target instanceof HTMLElement &&
      event.target.dataset.productId !== this.dataset.productId
    ) {
      window.Theme.resetShimmer(this);
      return;
    }

    const newSavingsInfo = data.html.querySelector('product-savings-info');

    if (!newSavingsInfo) {
      window.Theme.resetShimmer(this);
      this.innerHTML = '';
      return;
    }

    if (window.Theme?.morph) {
      window.Theme.morph(this, newSavingsInfo, { childrenOnly: true });
    } else {
      this.innerHTML = newSavingsInfo.innerHTML;
    }

    window.Theme.resetShimmer(this);
  };
}

if (!customElements.get('product-savings-info')) {
  customElements.define('product-savings-info', ProductSavingsInfo);
}
