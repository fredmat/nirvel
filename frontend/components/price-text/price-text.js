class PriceText extends HTMLElement {
  connectedCallback() {
    // Trouver le bon variant picker comme dans product-badges
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
    if (!this.variantPicker) return;

    this.variantPicker.removeEventListener('variant:selected', this.onVariantSelected);
    this.variantPicker.removeEventListener('variant:update', this.onVariantUpdate);
  }

  onVariantSelected = () => {
    // Démarre le shimmer
    this.setAttribute('shimmer', '');

    // Mettre à jour l’attribut "value" utilisé par ::after
    this.syncValue();
  };

  onVariantUpdate = () => {
    // Le shimmer doit disparaître
    this.removeAttribute('shimmer');

    // Met à jour l'attribut "value" pour refléter le nouveau prix
    this.syncValue();
  };

  syncValue() {
    // Récupérer le texte visible du prix
    const priceSpan = this.querySelector('.price');
    if (!priceSpan) return;

    // Mettre à jour l'attribut value pour le shimmer (::after)
    this.setAttribute('value', priceSpan.textContent.trim());
  }
}

if (!customElements.get('price-text')) {
  customElements.define('price-text', PriceText);
}
