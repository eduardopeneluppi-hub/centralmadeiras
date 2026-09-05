import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WHATSAPP_NUMBER } from './theme'

import ripasImg from './assets/catalog/ripas-madeira.jpg'
import moveisImg from './assets/catalog/moveis-rusticos.jpg'
import mesaImg from './assets/catalog/mesa-cadeiras.jpg'
import telhasImg from './assets/catalog/telhas.jpg'
import chapaImg from './assets/catalog/chapa-maderit.jpg'
import pinusImg from './assets/catalog/tabua-pinus.jpg'
import cedroImg from './assets/catalog/tabua-cedro.jpg'

const CATALOG_ITEMS = [
  {
    image: chapaImg,
    label: 'Chapa de Maderit',
    description:
      'Chapas de maderite plastificado, ideais para fôrma de concreto e usos diversos na obra. Resistentes, reutilizáveis e com ótimo custo-benefício.',
  },
  {
    image: pinusImg,
    label: 'Tábua de Pinus',
    description:
      'Tábuas de pinus selecionadas, prontas para início de obra, estruturas e acabamentos. Madeira seca e de boa procedência.',
  },
  {
    image: cedroImg,
    label: 'Tábua Padrão Cedro',
    description:
      'Tábuas no padrão cedro, com ótimo acabamento para estruturas, forros e revestimentos que pedem mais qualidade visual.',
  },
  {
    image: ripasImg,
    label: 'Ripas de Madeira',
    description:
      'Ripas de madeira de qualidade, ideais para forros, estruturas leves e acabamentos decorativos em geral.',
  },
  {
    image: moveisImg,
    label: 'Móveis Rústicos',
    description:
      'Móveis rústicos sob encomenda, com acabamento diferenciado e madeira maciça de procedência legalizada.',
  },
  {
    image: mesaImg,
    label: 'Mesa e Cadeiras',
    description:
      'Conjunto de mesa e cadeiras em madeira maciça, resistente e com acabamento artesanal para sua casa ou comércio.',
  },
  {
    image: telhasImg,
    label: 'Telhas',
    description:
      'Telhas de qualidade com garantia, ideais para cobertura residencial e comercial, com boa resistência a chuva forte.',
  },
]

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 32 32" {...props}>
    <path
      fill="currentColor"
      d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.22.6 4.3 1.65 6.09L3 29l8.1-2.6a12.9 12.9 0 004.92.98h.01c6.62 0 12.02-5.4 12.02-12.02C28.05 8.4 22.65 3 16.02 3zm0 21.9h-.01a10.8 10.8 0 01-5.5-1.5l-.4-.24-4.8 1.55 1.57-4.68-.26-.42a10.83 10.83 0 01-1.66-5.6C5 9.53 9.53 5 16.02 5c5.4 0 10.03 4.4 10.03 10.02 0 5.53-4.63 9.88-10.03 9.88zm5.87-7.4c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.51-.16-.73.16-.21.32-.84 1.04-1.03 1.25-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.6-1.6-.96-.86-1.6-1.92-1.79-2.24-.19-.32-.02-.5.14-.66.14-.14.32-.38.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.42-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.68 0 1.58 1.15 3.1 1.3 3.31.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.68.76.24 1.46.2 2 .12.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.6-.37z"
    />
  </svg>
)

const ARROW_PATHS = {
  prev: 'M15 18l-6-6 6-6',
  next: 'M9 18l6-6-6-6',
}

function ArrowButton({ direction, onClick, className = '' }) {
  return (
    <button
      type="button"
      aria-label={direction === 'prev' ? 'Produto anterior' : 'Próximo produto'}
      onClick={onClick}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-neutral-700 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] ring-1 ring-black/5 transition hover:bg-neutral-50 active:scale-95 ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={ARROW_PATHS[direction]} />
      </svg>
    </button>
  )
}

export default function Catalog() {
  const trackRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')

  const scrollByCard = (direction) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[data-catalog-card]')
    const step = card ? card.getBoundingClientRect().width + 16 : track.clientWidth * 0.8
    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  const filteredItems = CATALOG_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(query.trim().toLowerCase())
  )

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-6 sm:pb-20 sm:pt-8">
      <div className="relative mx-auto mb-6 w-full max-w-[420px] sm:mb-8 sm:max-w-[500px]">
        <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 fill-none stroke-neutral-400 stroke-2">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar produto..."
          className="w-full rounded-full border border-black/5 bg-white py-3 pl-11 pr-4 text-sm text-neutral-800 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.3)] outline-none placeholder:text-neutral-400 focus:border-[#2e7d32]/40"
        />
      </div>

      <div className="relative">
        <ArrowButton
          direction="prev"
          onClick={() => scrollByCard(-1)}
          className="absolute top-[38%] z-10 -translate-y-1/2 left-1 sm:-left-14 lg:-left-16"
        />
        <ArrowButton
          direction="next"
          onClick={() => scrollByCard(1)}
          className="absolute top-[38%] z-10 -translate-y-1/2 right-1 sm:-right-14 lg:-right-16"
        />

        <div
          ref={trackRef}
          className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-auto sm:w-[948px] sm:max-w-full sm:gap-6 sm:px-0"
        >
          {filteredItems.map((item) => (
            <button
              key={item.label}
              type="button"
              data-catalog-card
              onClick={() => setSelected(item)}
              className="w-[calc(100vw-48px)] shrink-0 snap-center overflow-hidden rounded-[28px] bg-white text-left shadow-[0_20px_45px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5 transition active:scale-[0.98] sm:w-[300px]"
            >
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.label}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="px-5 py-4">
                <p className="text-[13px] uppercase leading-tight text-neutral-900 [font-family:var(--font-display)]">{item.label}</p>
              </div>
            </button>
          ))}

          {filteredItems.length === 0 && (
            <p className="w-full py-10 text-center text-sm text-neutral-400">
              Nenhum produto encontrado para "{query}".
            </p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30, mass: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-[28px] bg-white shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Fechar"
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="aspect-[4/3] w-full overflow-hidden">
                <img src={selected.image} alt={selected.label} className="h-full w-full object-cover" draggable={false} />
              </div>

              <div className="p-6 sm:p-7">
                <p className="text-xl uppercase leading-tight text-neutral-900 [font-family:var(--font-display)]">
                  {selected.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{selected.description}</p>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá! Gostaria de encomendar: ${selected.label}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_-8px_rgba(37,211,102,0.6)] transition active:scale-[0.98]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Encomendar
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
