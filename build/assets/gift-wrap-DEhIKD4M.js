class GiftWrapToggle extends HTMLElement {
  connectedCallback() {
    this.lineKey = this.dataset.lineKey;
    this.productTitle = this.dataset.productTitle;
    this.active = this.dataset.active === "true";
    this.checkbox = this.querySelector(".gift-wrap-toggle__checkbox");
    if (!this.checkbox) {
      console.warn("[gift-wrap-toggle] checkbox not found", this);
      return;
    }
    this.checkbox.checked = this.active;
    this.onChange = this.onChange.bind(this);
    this.checkbox.addEventListener("change", this.onChange);
    console.debug("[gift-wrap-toggle] ready", {
      lineKey: this.lineKey,
      active: this.active
    });
  }
  disconnectedCallback() {
    if (this.checkbox) {
      this.checkbox.removeEventListener("change", this.onChange);
    }
  }
  onChange(event) {
    this.active = this.checkbox.checked;
    console.debug("[gift-wrap-toggle] toggled", {
      lineKey: this.lineKey,
      active: this.active
    });
    this.dispatchEvent(
      new CustomEvent("gift-wrap-toggle:change", {
        bubbles: true,
        detail: {
          lineKey: this.lineKey,
          active: this.active
        }
      })
    );
  }
}
if (!customElements.get("gift-wrap-toggle")) {
  customElements.define("gift-wrap-toggle", GiftWrapToggle);
}
console.debug("[gift-wrap] gift-wrap-toggle registered");
document.addEventListener("gift-wrap-toggle:change", function(event) {
  var detail = event.detail;
  if (!detail) return;
  var lineKey = detail.lineKey;
  var active = detail.active;
  console.debug("[gift-wrap-orchestrator] change received", {
    lineKey,
    active
  });
});
