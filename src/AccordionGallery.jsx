import { useRef, useState, useEffect } from 'react'
import './AccordionGallery.css'

const DEFAULT_ITEMS = [
  { image: 'https://picsum.photos/id/1015/900/1200', label: 'Canyon', link: '#' },
  { image: 'https://picsum.photos/id/1018/900/1200', label: 'Ridgeline', link: '#' },
  { image: 'https://picsum.photos/id/1039/900/1200', label: 'Falls', link: '#' },
  { image: 'https://picsum.photos/id/1043/900/1200', label: 'Harbour', link: '#' },
  { image: 'https://picsum.photos/id/1044/900/1200', label: 'Skyline', link: '#' },
]

const AccordionGallery = ({
  items = DEFAULT_ITEMS,
  defaultIndex = 2,
  accentColor = '#ffffff',
  overlayColor = '#060010',
  textColor = '#ffffff',
  height = 460,
  gap = 10,
  radius = 16,
  expandRatio = 0.52,
  orientation = 'horizontal',
  duration = 0.6,
  ease = 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  className = '',
  ctaLabel = 'Solicitar orçamento',
  whatsappNumber = '',
}) => {
  const rootRef = useRef(null)
  const count = items.length
  const [active, setActive] = useState(defaultIndex < 0 ? -1 : Math.min(Math.max(defaultIndex, 0), count - 1))
  const [mediaSize, setMediaSize] = useState(320)
  const [isNarrow, setIsNarrow] = useState(false)
  const [revealedCta, setRevealedCta] = useState(null)

  const vertical = orientation === 'vertical' || isNarrow
  const ratio = Math.min(Math.max(expandRatio, 0.2), 0.9)
  const grow = count > 1 ? (ratio * (count - 1)) / (1 - ratio) : 1

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const measure = () => {
      const rect = el.getBoundingClientRect()
      const narrow = orientation !== 'vertical' && rect.width < 520
      setIsNarrow(narrow)
      const v = orientation === 'vertical' || narrow
      const total = v ? rect.height : rect.width
      const usable = Math.max(total - gap * (count - 1), 120)
      setMediaSize(Math.max(140, usable * ratio * 1.22))
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [gap, count, ratio, orientation])

  // The CTA link only becomes clickable a moment after a panel activates.
  // This is a real (not just a timed check) pointer-events gate, so a tap
  // that expands a panel can never be retargeted onto the CTA underneath it.
  useEffect(() => {
    setRevealedCta(null)
    const t = setTimeout(() => setRevealedCta(active), 550)
    return () => clearTimeout(t)
  }, [active])

  const handleEnter = (i) => {
    if (trigger === 'hover') setActive(i)
  }

  const handleClick = (i, e) => {
    if (i !== active) {
      e.preventDefault()
      setActive(i)
    }
  }

  const handleFocus = (i) => {
    setActive(i)
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i + 1) % count)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i - 1 + count) % count)
    }
  }

  const handleCtaClick = (i, e) => {
    if (revealedCta !== i) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    e.stopPropagation()
    if (!whatsappNumber) e.preventDefault()
  }

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--ag-accent': accentColor,
        '--ag-overlay': overlayColor,
        '--ag-text': textColor,
        '--ag-gap': `${gap}px`,
        '--ag-radius': `${radius}px`,
        '--ag-media-size': `${mediaSize}px`,
        '--ag-duration': `${duration}s`,
        '--ag-ease': ease,
        height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`,
      }}
      role="list"
      aria-label="Image accordion gallery"
    >
      {items.map((item, i) => {
        const isActive = active !== -1 && i === active
        const Tag = item.link ? 'a' : 'div'
        const rot = active === -1 || isActive ? 0 : i < active ? tilt : -tilt
        const drift = active === -1 ? 0 : Math.max(-1.5, Math.min(1.5, active - i))
        const shift = drift * parallax * mediaSize * 0.06
        const focusShift = isActive ? item.focusOffset || 0 : 0

        return (
          <Tag
            key={i}
            className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
            style={{
              borderRadius: `${radius}px`,
              flexGrow: isActive ? grow : 1,
              transform: vertical ? `rotateX(${-rot}deg)` : `rotateY(${rot}deg)`,
            }}
            href={item.link || undefined}
            onClick={(e) => handleClick(i, e)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => handleFocus(i)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.label}
          >
            <span className="ag-panel__frame">
              <span
                className="ag-panel__media"
                style={{
                  transform: `translate(-50%, -50%) translate(${vertical ? 0 : isActive ? 0 : shift}px, ${
                    vertical ? (isActive ? focusShift : shift) : isActive ? focusShift : 0
                  }px)`,
                  filter: grayscale ? `grayscale(${isActive ? 0 : 1})` : 'none',
                }}
              >
                <img
                  src={item.image}
                  alt={item.alt || item.label || ''}
                  draggable="false"
                  style={{ objectPosition: item.imagePosition || '50% 50%' }}
                />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
              <span className="ag-panel__dim" style={{ opacity: isActive ? 0 : 0.35 }} aria-hidden="true" />
            </span>
            {showLabels && (
              <span className="ag-panel__label">
                <span className="ag-panel__caption" aria-hidden="true">
                  <span
                    className="ag-panel__bar"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(-14px)',
                      transitionDelay: isActive ? `${stagger}s` : '0s',
                    }}
                  />
                  <span
                    className="ag-panel__text"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(-14px)',
                      transitionDelay: isActive ? `${stagger * 2}s` : '0s',
                    }}
                  >
                    {item.label}
                  </span>
                </span>

                <a
                  className="ag-panel__cta"
                  href={whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá! Gostaria de solicitar um orçamento para ${item.label}.`)}` : '#'}
                  target={whatsappNumber ? '_blank' : undefined}
                  rel={whatsappNumber ? 'noopener noreferrer' : undefined}
                  onClick={(e) => handleCtaClick(i, e)}
                  tabIndex={revealedCta === i ? 0 : -1}
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateX(0)' : 'translateX(-14px)',
                    transitionDelay: isActive ? `${stagger * 3}s` : '0s',
                    pointerEvents: revealedCta === i ? 'auto' : 'none',
                  }}
                >
                  {ctaLabel}
                  <span className="ag-panel__cta-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </span>
            )}
          </Tag>
        )
      })}
    </div>
  )
}

export default AccordionGallery
