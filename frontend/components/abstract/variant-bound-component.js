export class VariantBoundComponent extends HTMLElement {
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
    this.variantPicker.addEventListener('variant:selected', this.onVariantSelected);
  }

  disconnectedCallback() {
    this.variantPicker?.removeEventListener('variant:update', this.onVariantUpdate);
    this.variantPicker?.removeEventListener('variant:selected', this.onVariantSelected);
  }

  onVariantSelected = () => {};

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

    this.updateFromHtml(data.html);
  };

  updateFromHtml(_html) {}
}
