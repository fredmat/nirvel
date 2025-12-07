class ProductBadge extends HTMLElement {
  connectedCallback() {
    requestAnimationFrame(() => {
      this.variantPicker = this.closest('product-card, .product-card, [data-product-card]')
        ?.querySelector('variant-picker, swatches-variant-picker-component');

      if (!this.variantPicker) return;

      this.variantPicker.addEventListener('variant:update', this.onVariantUpdate);
    });
  }

  disconnectedCallback() {
    this.variantPicker?.removeEventListener('variant:update', this.onVariantUpdate);
  }

  onVariantUpdate = (event) => {
    if (event.detail.data.newProduct) {
      this.dataset.productId = event.detail.data.newProduct.id;
    } else if (event.target instanceof HTMLElement && event.target.dataset.productId !== this.dataset.productId) {
      return;
    }

    const newBadge = event.detail.data.html.querySelector('product-badge');

    if (!newBadge) return;

    morph(this, newBadge, { childrenOnly: true });
  };

  // onVariantUpdate = (event) => {
  //   const { data } = event.detail || {};

  //   // console.log('[ProductBadge] event.detail =', event.detail);

  //   if (!data || !data.html) {
  //     return;
  //   }

  //   const html = data.html;
  //   const productId = data.productId;

  //   // console.log('[ProductBadge] html =', html);
  //   // console.log('[ProductBadge] productId =', productId);
  //   // console.log('[ProductBadge] dataset.productId =', this.dataset.productId);

  //   if (String(productId) !== String(this.dataset.productId)) {
  //     return;
  //   }

  //   const incoming = html.querySelector(
  //     `product-badge[data-product-id="${this.dataset.productId}"]`
  //   ) || html.querySelector('product-badge');

  //   // console.log('[ProductBadge] incoming =', incoming);

  //   if (!incoming) return;

  //   if (window.Theme?.morph) {
  //     window.Theme.morph(this, incoming, { childrenOnly: true });
  //   } else if (window.morph) {
  //     window.morph(this, incoming, { childrenOnly: true });
  //   } else {
  //     this.innerHTML = incoming.innerHTML;
  //   }
  // };
}

if (!customElements.get('product-badge')) {
  customElements.define('product-badge', ProductBadge);
}
