import { initTooltips, initTooltipsInside } from '@/components/tooltips'

document.addEventListener('DOMContentLoaded', initTooltips)

document.addEventListener('shopify:section:load', e => {
  initTooltipsInside(e.target)
})

document.addEventListener('shopify:block:load', e => {
  initTooltipsInside(e.target)
})

document.addEventListener('variant:update', () => {
  initTooltipsInside(document)
})

// document.addEventListener('variant:selected', () => {// ...})
