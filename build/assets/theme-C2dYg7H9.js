import "./tooltips-Cys2S6oV.js";
class ProductBadge extends HTMLElement {
  connectedCallback() {
    requestAnimationFrame(() => {
      this.variantPicker = this.closest("product-card, .product-card, [data-product-card]")?.querySelector("variant-picker, swatches-variant-picker-component");
      if (!this.variantPicker) return;
      this.variantPicker.addEventListener("variant:update", this.onVariantUpdate);
    });
  }
  disconnectedCallback() {
    this.variantPicker?.removeEventListener("variant:update", this.onVariantUpdate);
  }
  onVariantUpdate = (event) => {
    const { data } = event.detail || {};
    console.log("[ProductBadge] event.detail =", event.detail);
    if (!data || !data.html) {
      return;
    }
    const html = data.html;
    const productId = data.productId;
    console.log("[ProductBadge] html =", html);
    console.log("[ProductBadge] productId =", productId);
    console.log("[ProductBadge] dataset.productId =", this.dataset.productId);
    if (String(productId) !== String(this.dataset.productId)) {
      return;
    }
    const incoming = html.querySelector(
      `product-badge[data-product-id="${this.dataset.productId}"]`
    ) || html.querySelector("product-badge");
    console.log("[ProductBadge] incoming =", incoming);
    if (!incoming) return;
    if (window.Theme?.morph) {
      window.Theme.morph(this, incoming, { childrenOnly: true });
    } else if (window.morph) {
      window.morph(this, incoming, { childrenOnly: true });
    } else {
      this.innerHTML = incoming.innerHTML;
    }
  };
  // _____onVariantUpdate = (event) => {
  //   const { html, productId } = event.detail || {};
  //   console.log(event)
  //   console.log(html)
  //   console.log(productId)
  //   if (!html || String(productId) !== String(this.dataset.productId)) {
  //     return;
  //   }
  //   const incoming = html.querySelector(
  //     `product-badge[data-product-id="${this.dataset.productId}"]`
  //   );
  //   if (!incoming) return;
  //   // Morph natif Horizon (déjà chargé)
  //   if (window.Theme?.morph) {
  //     window.Theme.morph(this, incoming, { childrenOnly: true });
  //   } else if (window.morph) {
  //     window.morph(this, incoming, { childrenOnly: true });
  //   } else {
  //     // fallback sécurité
  //     this.innerHTML = incoming.innerHTML;
  //   }
  // };
}
if (!customElements.get("product-badge")) {
  customElements.define("product-badge", ProductBadge);
}
