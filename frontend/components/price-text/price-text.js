class PriceText extends HTMLElement {
  connectedCallback() {
    this.variantPicker = null;
    // this.variantPicker =
    //   this.closest('product-card, .product-card, [data-product-card]')?.querySelector(
    //     'variant-picker, swatches-variant-picker-component'
    //   ) ||
    //   document.querySelector(
    //     '[data-product-grid-content] variant-picker, [data-product-grid-content] swatches-variant-picker-component'
    //   );

    if (!this.variantPicker) return;

    this.variantPicker.addEventListener('variant:selected', this.onVariantSelected);
    this.variantPicker.addEventListener('variant:update', this.onVariantUpdate);
  }

  disconnectedCallback() {
    if (!this.variantPicker) return;

    this.variantPicker.removeEventListener('variant:selected', this.onVariantSelected);
    this.variantPicker.removeEventListener('variant:update', this.onVariantUpdate);
  }

  onVariantSelected = () => {
    // ...
  };

  onVariantUpdate = () => {
    // ...
  };
}

if (!customElements.get('price-text')) {
  customElements.define('price-text', PriceText);
}
