/**
 * BGPattern — lightweight background pattern component (no Tailwind, no shadcn)
 * Supports: dots | grid | diagonal-stripes | horizontal-lines | vertical-lines | checkerboard
 * Masks: fade-center | fade-edges | fade-top | fade-bottom | fade-left | fade-right | fade-x | fade-y | none
 */

const MASK_STYLES = {
  'fade-edges': 'radial-gradient(ellipse at center, var(--bg, #f5f5f7), transparent)',
  'fade-center': 'radial-gradient(ellipse at center, transparent, var(--bg, #f5f5f7))',
  'fade-top': 'linear-gradient(to bottom, transparent, var(--bg, #f5f5f7))',
  'fade-bottom': 'linear-gradient(to bottom, var(--bg, #f5f5f7), transparent)',
  'fade-left': 'linear-gradient(to right, transparent, var(--bg, #f5f5f7))',
  'fade-right': 'linear-gradient(to right, var(--bg, #f5f5f7), transparent)',
  'fade-x': 'linear-gradient(to right, transparent, var(--bg, #f5f5f7), transparent)',
  'fade-y': 'linear-gradient(to bottom, transparent, var(--bg, #f5f5f7), transparent)',
  none: undefined,
}

function getBgImage(variant, fill, size) {
  switch (variant) {
    case 'dots':
      return `radial-gradient(${fill} 1px, transparent 1px)`
    case 'grid':
      return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`
    case 'diagonal-stripes':
      return `repeating-linear-gradient(45deg, ${fill}, ${fill} 1px, transparent 1px, transparent ${size}px)`
    case 'horizontal-lines':
      return `linear-gradient(to bottom, ${fill} 1px, transparent 1px)`
    case 'vertical-lines':
      return `linear-gradient(to right, ${fill} 1px, transparent 1px)`
    case 'checkerboard':
      return [
        `linear-gradient(45deg, ${fill} 25%, transparent 25%)`,
        `linear-gradient(-45deg, ${fill} 25%, transparent 25%)`,
        `linear-gradient(45deg, transparent 75%, ${fill} 75%)`,
        `linear-gradient(-45deg, transparent 75%, ${fill} 75%)`,
      ].join(', ')
    default:
      return undefined
  }
}

export function BGPattern({
  variant = 'dots',
  mask = 'fade-edges',
  size = 24,
  fill = '#d1d5db',
  className = '',
  style = {},
  ...props
}) {
  const bgSize = `${size}px ${size}px`
  const backgroundImage = getBgImage(variant, fill, size)
  const maskImage = MASK_STYLES[mask]

  return (
    <div
      className={`bg-pattern ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
        backgroundImage,
        backgroundSize: bgSize,
        WebkitMaskImage: maskImage,
        maskImage,
        pointerEvents: 'none',
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  )
}

export default BGPattern
