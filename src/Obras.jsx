import { useEffect, useRef, useState } from 'react'
import BlurText from './BlurText'

import obra1 from './assets/obras/obra-1.jpg'
import obra2 from './assets/obras/obra-2.jpg'
import obra3 from './assets/obras/obra-3.jpg'
import obra4 from './assets/obras/obra-4.jpg'
import obra5 from './assets/obras/obra-5.jpg'
import obra6 from './assets/obras/obra-6.jpg'

const OBRAS = [
  { image: obra4, label: 'Obra comercial' },
  { image: obra6, label: 'Deck e área de lazer' },
  { image: obra1, label: 'Área externa' },
  { image: obra2, label: 'Estrutura do telhado' },
  { image: obra3, label: 'Obra em andamento' },
  { image: obra5, label: 'Montagem do telhado' },
]

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
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-neutral-700 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] ring-1 ring-black/5 transition hover:bg-neutral-50 active:scale-95 ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={ARROW_PATHS[direction]} />
      </svg>
    </button>
  )
}

export default function Obras() {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollByCard = (direction) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[data-obra-card]')
    const step = card ? card.getBoundingClientRect().width + 16 : track.clientWidth * 0.8
    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf
    const handleScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const cards = track.querySelectorAll('[data-obra-card]')
        if (!cards.length) return
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
        setActiveIndex(closestIndex)
      })
    }
    track.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      track.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-2 sm:pb-20 sm:pt-3">
      <div className="flex flex-col items-center text-center">
        <BlurText
          text="Obras"
          delay={150}
          stepDuration={0.7}
          animateBy="words"
          direction="top"
          className="justify-center text-3xl uppercase leading-[1.15] text-[#2e7d32] [font-family:var(--font-display)] sm:text-5xl"
        />
      </div>

      <div className="relative mx-auto mt-10 sm:mt-12 sm:w-[1068px] sm:max-w-full">
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
          className="-mx-6 flex snap-x snap-mandatory items-center gap-4 overflow-x-auto px-12 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:gap-6 sm:px-0"
        >
          {OBRAS.map((item, i) => (
            <div
              key={item.label}
              data-obra-card
              className={`w-[calc(100vw-64px)] shrink-0 snap-center overflow-hidden rounded-[28px] bg-white shadow-[0_20px_45px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition-all duration-300 sm:w-[340px] ${
                i === activeIndex ? 'scale-100 opacity-100' : 'scale-[0.85] opacity-50'
              }`}
            >
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img src={item.image} alt={item.label} className="h-full w-full object-cover" draggable={false} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
