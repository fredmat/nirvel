import tippy, { roundArrow } from 'tippy.js'

export function initTooltipsInside(root = document) {
  const elements = root.querySelectorAll('[data-tooltip-toggle]')

  if (!elements.length) return

  elements.forEach((el) => {
    const borderSetting = el.getAttribute('data-border')
    const hasBorderSetting = borderSetting === 'solid'
    const isTranslucent = el.getAttribute('data-translucent') === 'true'
    const hasBorder = hasBorderSetting && !isTranslucent

    const instance = tippy(el, {
      allowHTML: true,
      zIndex: 4,
      ignoreAttributes: false,
      arrow: hasBorder ? roundArrow + roundArrow : roundArrow,

      appendTo: (ref) => ref.parentElement,

      onCreate(instance) {
        const reference = instance.reference
        const box = instance.popper.querySelector('.tippy-box')
        const scheme = reference.getAttribute('data-color-scheme')

        if (scheme) {
          const remove = [...box.classList].filter(c => c.startsWith('color-scheme-'))
          remove.forEach(c => box.classList.remove(c))
          box.classList.add(scheme)
        }

        box.classList.toggle('tippy-box--with-border', hasBorder)
        box.classList.toggle('tippy-box--translucent', isTranslucent)
      },
    })
  })
}

export function initTooltips() {
  initTooltipsInside(document)
}
