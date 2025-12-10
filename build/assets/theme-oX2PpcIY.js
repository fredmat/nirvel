import "./tooltips-Cys2S6oV.js";
class ProductBadges extends HTMLElement {
  connectedCallback() {
    this.variantPicker = this.closest("product-card, .product-card, [data-product-card]")?.querySelector(
      "variant-picker, swatches-variant-picker-component"
    ) || document.querySelector(
      "[data-product-grid-content] variant-picker, [data-product-grid-content] swatches-variant-picker-component"
    );
    if (!this.variantPicker) return;
    this.variantPicker.addEventListener("variant:update", this.onVariantUpdate);
  }
  disconnectedCallback() {
    this.variantPicker?.removeEventListener("variant:update", this.onVariantUpdate);
  }
  onVariantUpdate = (event) => {
    const { data } = event.detail || {};
    if (!data?.html) return;
    if (data.newProduct) {
      this.dataset.productId = data.newProduct.id;
    } else if (event.target instanceof HTMLElement && event.target.dataset.productId !== this.dataset.productId) {
      return;
    }
    const newBadge = data.html.querySelector("product-badges");
    if (!newBadge) return;
    const animationsEnabled = this.classList.contains("product-badges--animations-enabled");
    if (!animationsEnabled) {
      if (window.Theme?.morph) {
        window.Theme.morph(this, newBadge, { childrenOnly: true });
      } else {
        this.innerHTML = newBadge.innerHTML;
      }
      return;
    }
    this.classList.remove("badge-animate");
    this.classList.add("badge-fade-out");
    const onFadeOutEnd = () => {
      this.removeEventListener("animationend", onFadeOutEnd);
      this.classList.remove("badge-fade-out");
      if (window.Theme?.morph) {
        window.Theme.morph(this, newBadge, { childrenOnly: true });
      } else {
        this.innerHTML = newBadge.innerHTML;
      }
      void this.offsetWidth;
      this.classList.add("badge-animate");
    };
    this.addEventListener("animationend", onFadeOutEnd, { once: true });
  };
}
if (!customElements.get("product-badges")) {
  customElements.define("product-badges", ProductBadges);
}
class ProductSavingsInfo extends HTMLElement {
  connectedCallback() {
    this.variantPicker = this.closest("product-card, .product-card, [data-product-card]")?.querySelector(
      "variant-picker, swatches-variant-picker-component"
    ) || document.querySelector(
      "[data-product-grid-content] variant-picker, [data-product-grid-content] swatches-variant-picker-component"
    );
    if (!this.variantPicker) return;
    this.variantPicker.addEventListener("variant:selected", this.onVariantSelected);
    this.variantPicker.addEventListener("variant:update", this.onVariantUpdate);
  }
  disconnectedCallback() {
    this.variantPicker?.removeEventListener("variant:selected", this.onVariantSelected);
    this.variantPicker?.removeEventListener("variant:update", this.onVariantUpdate);
  }
  onVariantSelected = () => {
    const textComponent = this.querySelector("text-component");
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
    } else if (event.target instanceof HTMLElement && event.target.dataset.productId !== this.dataset.productId) {
      window.Theme.resetShimmer(this);
      return;
    }
    const newSavingsInfo = data.html.querySelector("product-savings-info");
    if (!newSavingsInfo) {
      window.Theme.resetShimmer(this);
      this.innerHTML = "";
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
if (!customElements.get("product-savings-info")) {
  customElements.define("product-savings-info", ProductSavingsInfo);
}
