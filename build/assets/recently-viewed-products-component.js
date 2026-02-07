import { RecentlyViewed } from '@theme/recently-viewed-products';
import { sectionRenderer } from '@theme/section-renderer';

class RecentlyViewedProductsComponent extends HTMLElement {
  async connectedCallback() {
    try {
      if (this.dataset.recentlyViewedPerformed === 'true') return;

      const sectionId = this.dataset.sectionId;
      const id = this.id;

      if (!sectionId || !id) {
        throw new Error('data-section-id and an id attribute are required');
      }

      const limit = Math.max(1, Math.min(10, parseInt(this.dataset.limit || '4', 10)));

      let ids = RecentlyViewed.getProducts();

      const currentProductId = this.dataset.currentProductId;
      if (currentProductId) {
        ids = ids.filter((pid) => String(pid) !== String(currentProductId));
      }

      if (!ids.length) {
        this.setAttribute('hidden', '');
        return;
      }

      ids = ids.slice(0, limit);

      const url = new URL(Theme.routes.search_url, location.origin);
      url.searchParams.set('q', ids.map((pid) => `id:${pid}`).join(' OR '));
      url.searchParams.set('resources[type]', 'product');

      const markup = await sectionRenderer.getSectionHTML(sectionId, false, url);
      const doc = new DOMParser().parseFromString(markup, 'text/html');
      const updatedComponent = doc.querySelector(`recently-viewed-products-component#${CSS.escape(id)}`);

      if (updatedComponent?.innerHTML && updatedComponent.innerHTML.trim().length) {
        this.dataset.recentlyViewedPerformed = 'true';
        this.innerHTML = updatedComponent.innerHTML;
        this.removeAttribute('hidden');
      } else {
        this.setAttribute('hidden', '');
      }
    } catch (e) {
      console.error('[rv] error:', e);
      this.setAttribute('hidden', '');
      this.dataset.error = 'Error loading recently viewed products';
    }
  }
}

if (!customElements.get('recently-viewed-products-component')) {
  customElements.define('recently-viewed-products-component', RecentlyViewedProductsComponent);
}
