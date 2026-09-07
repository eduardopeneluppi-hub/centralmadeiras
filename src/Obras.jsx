import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import BlurText from './BlurText'

import obra1 from './assets/obras/obra-1.jpg'
import obra2 from './assets/obras/obra-2.jpg'
import obra3 from './assets/obras/obra-3.jpg'
import obra4 from './assets/obras/obra-4.jpg'
import obra5 from './assets/obras/obra-5.jpg'
import obra6 from './assets/obras/obra-6.jpg'

const OBRAS = [
  {
    image: obra4,
    label: 'Obra comercial',
    badges: ['Estrutura comercial', 'Entrega no prazo', 'Madeira certificada'],
  },
  {
    image: obra6,
    label: 'Deck e área de lazer',
    badges: ['Deck em madeira', 'Resistente à umidade', 'Acabamento premium'],
  },
  {
    image: obra1,
    label: 'Área externa',
    badges: ['Área externa coberta', 'Estrutura em madeira', 'Alta durabilidade'],
  },
  {
    image: obra2,
    label: 'Estrutura do telhado',
    badges: ['Estrutura em pinus', 'Montagem precisa', 'Reforço estrutural'],
  },
  {
    image: obra3,
    label: 'Obra em andamento',
    badges: ['Em execução', 'Equipe especializada', 'Qualidade em cada etapa'],
  },
  {
    image: obra5,
    label: 'Montagem do telhado',
    badges: ['Telhado completo', 'Vedação garantida', 'Madeira tratada'],
  },
]

const EXTENDED = [OBRAS[OBRAS.length - 1], ...OBRAS, OBRAS[0]]

const BADGE_POSITIONS = [
  '-top-3 left-3 rotate-[-4deg]',
  '-bottom-1 -right-2 -translate-y-[60%] rotate-[3deg]',
  '-bottom-3 -left-2 rotate-[-2deg]',
]

function Badge({ text, position, delay }) {
  return (
    <motion.div
      className={`absolute z-10 flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)] ring-1 ring-black/5 sm:gap-2.5 sm:px-5 sm:py-3 sm:text-base ${position}`}
      initial={{ opacity: 0, y: 6, scale: 0.9 }}
      animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.5 },
      }}
    >
      <span className="h-2 w-2 shrink-0 rounded-full bg-[#2e7d32] sm:h-2.5 sm:w-2.5" />
      {text}
    </motion.div>
  )
}

const ARROW_PATHS = {
  prev: 'M15 18l-6-6 6-6',
  next: 'M9 18l6-6-6-6',
}

function ArrowButton({ direction, onClick, className = '' }) {
  return (
    <button
      type="button"
      aria-label={direction === 'prev' ? 'Foto anterior' : 'Próxima foto'}
      onClick={onClick}
      className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-neutral-700 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] ring-1 ring-black/5 transition hover:bg-neutral-50 active:scale-95 sm:flex ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={ARROW_PATHS[direction]} />
      </svg>
    </button>
  )
}

export default function Obras() {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const [hasScrolled, setHasScrolled] = useState(false)

  const measureClosestIndex = () => {
    const track = trackRef.current
    if (!track) return 1
    const cards = track.querySelectorAll('[data-obra-card]')
    if (!cards.length) return 1
    const trackRect = track.getBoundingClientRect()
    const center = trackRect.left + trackRect.width / 2
    let closestIndex = 0
    let closestDistance = Infinity
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect()
      const cardCenter = rect.left + rect.width / 2
      const distance = Math.abs(cardCenter - center)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = i
      }
    })
    return closestIndex
  }

  const scrollToIndex = (index, behavior = 'smooth') => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelectorAll('[data-obra-card]')[index]
    if (!card) return
    card.scrollIntoView({ behavior, inline: 'center', block: 'nearest' })
  }

  const scrollByCard = (direction) => {
    scrollToIndex(measureClosestIndex() + direction, 'smooth')
  }

  useLayoutEffect(() => {
    scrollToIndex(1, 'auto')
    setActiveIndex(1)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf
    let fallbackTimer
    const supportsScrollEnd = 'onscrollend' in window

    const syncActive = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setActiveIndex(measureClosestIndex())
      })
    }

    const jumpTo = (index) => {
      const card = track.querySelectorAll('[data-obra-card]')[index]
      if (!card) return
      cancelAnimationFrame(raf)

      const cards = track.querySelectorAll('[data-obra-card]')
      cards.forEach((el) => {
        el.style.transition = 'none'
      })

      const trackRect = track.getBoundingClientRect()
      const cardRect = card.getBoundingClientRect()
      const delta = cardRect.left + cardRect.width / 2 - (trackRect.left + trackRect.width / 2)
      track.scrollLeft += delta

      flushSync(() => {
        setActiveIndex(index)
      })

      // commit the transition-less style before re-enabling, so the class
      // change above isn't retroactively animated
      void track.offsetHeight

      requestAnimationFrame(() => {
        cards.forEach((el) => {
          el.style.transition = ''
        })
      })
    }

    const correctLoop = () => {
      const idx = measureClosestIndex()
      if (idx === 0) {
        jumpTo(OBRAS.length)
      } else if (idx === EXTENDED.length - 1) {
        jumpTo(1)
      }
    }

    const handleScroll = () => {
      syncActive()
      if (!supportsScrollEnd) {
        clearTimeout(fallbackTimer)
        fallbackTimer = setTimeout(correctLoop, 80)
      }
    }
    const handleFirstScroll = () => setHasScrolled(true)

    track.addEventListener('scroll', handleScroll, { passive: true })
    track.addEventListener('scroll', handleFirstScroll, { passive: true, once: true })
    if (supportsScrollEnd) track.addEventListener('scrollend', correctLoop)

    return () => {
      track.removeEventListener('scroll', handleScroll)
      track.removeEventListener('scroll', handleFirstScroll)
      if (supportsScrollEnd) track.removeEventListener('scrollend', correctLoop)
      cancelAnimationFrame(raf)
      clearTimeout(fallbackTimer)
    }
  }, [])

  return (
    <section id="obras" className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-28 px-6 pb-16 pt-2 sm:pb-20 sm:pt-3">
      <div className="flex flex-col items-center text-center">
        <BlurText
          text="Obras"
          delay={150}
          stepDuration={0.7}
          animateBy="words"
          direction="top"
          className="justify-center text-3xl uppercase leading-[1.15] text-[#2e7d32] [font-family:var(--font-display)] sm:text-7xl"
        />

        <p className="mb-1 mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:mt-5 sm:text-lg sm:tracking-[0.25em]">
          Projetos entregues com nossa madeira
        </p>
      </div>

      <div className="relative mx-auto mt-10 sm:mt-12 sm:w-[1248px] sm:max-w-full">
        <div
          className="absolute left-1/2 top-1/2 -z-10 h-56 w-screen -translate-x-1/2 -translate-y-1/2 bg-[#2e7d32]"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, black 60%, transparent 100%)',
          }}
        />

        <ArrowButton
          direction="prev"
          onClick={() => scrollByCard(-1)}
          className="absolute top-1/2 z-10 left-2 -translate-y-1/2"
        />
        <ArrowButton
          direction="next"
          onClick={() => scrollByCard(1)}
          className="absolute top-1/2 z-10 right-2 -translate-y-1/2"
        />

        <div
          ref={trackRef}
          className="-mx-6 flex snap-x snap-mandatory items-center gap-4 overflow-x-auto px-12 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:gap-6 sm:px-[calc(50%-200px)] sm:py-8"
        >
          {EXTENDED.map((item, i) => (
            <div
              key={`${item.label}-${i}`}
              data-obra-card
              className={`relative w-[calc(100vw-64px)] shrink-0 snap-center transition-all duration-300 sm:w-[400px] ${
                i === activeIndex ? 'scale-100 opacity-100' : 'scale-[0.85] opacity-50'
              }`}
            >
              <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_20px_45px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img src={item.image} alt={item.label} className="h-full w-full object-cover" draggable={false} />
                </div>
              </div>

              {item.badges.map((text, bi) => (
                <Badge key={text} text={text} position={BADGE_POSITIONS[bi]} delay={bi * 0.15} />
              ))}

              {i === 1 && (
                <AnimatePresence>
                  {!hasScrolled && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pointer-events-none absolute -top-6 right-2 flex items-center gap-1 text-xs font-medium text-neutral-500 sm:hidden"
                    >
                      Role para ver mais
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
