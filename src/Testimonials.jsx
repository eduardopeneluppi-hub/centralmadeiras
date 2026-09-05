import { useRef } from 'react'
import BlurText from './BlurText'

const AVATAR_STACK = [
  'https://i.pravatar.cc/150?img=13',
  'https://i.pravatar.cc/150?img=32',
  'https://i.pravatar.cc/150?img=47',
  'https://i.pravatar.cc/150?img=8',
  'https://i.pravatar.cc/150?img=52',
  'https://i.pravatar.cc/150?img=44',
]

const TESTIMONIALS = [
  {
    name: 'Fernanda Rocha',
    role: 'Reforma da cozinha',
    avatar: 'https://i.pravatar.cc/150?img=47',
    rating: 5,
    quote:
      'Comprei as chapas de maderite pra reforma da cozinha e a madeira chegou certinha, sem empeno nenhum. Preço justo e entrega no prazo combinado.',
  },
  {
    name: 'Carlos Menezes',
    role: 'Construção da casa',
    avatar: 'https://i.pravatar.cc/150?img=13',
    rating: 5,
    quote:
      'Fechei tábuas, vigas e caibros pra obra inteira com a Central Madeiras. Nunca faltou material no meio da semana, e isso pra mim vale mais que preço.',
  },
  {
    name: 'Juliana Prado',
    role: 'Telhado novo',
    avatar: 'https://i.pravatar.cc/150?img=32',
    rating: 5,
    quote:
      'Trocamos o telhado inteiro com as telhas que compramos lá. Já passou chuva forte e não vazou uma gota. Atendimento também foi muito atencioso.',
  },
  {
    name: 'Marcos Tavares',
    role: 'Reforma da loja',
    avatar: 'https://i.pravatar.cc/150?img=52',
    rating: 5,
    quote:
      'Precisava de forro e arame pra reforma do meu comércio, pedi pelo WhatsApp e já saiu tudo separado certinho. Entrega rápida e sem complicação.',
  },
  {
    name: 'Beatriz Lima',
    role: 'Móveis rústicos sob medida',
    avatar: 'https://i.pravatar.cc/150?img=44',
    rating: 5,
    quote:
      'A qualidade da madeira dos móveis rústicos me surpreendeu, o acabamento parece muito mais caro do que o que paguei. Virei cliente fixa da loja.',
  },
  {
    name: 'Rafael Souza',
    role: 'Obra completa',
    avatar: 'https://i.pravatar.cc/150?img=8',
    rating: 5,
    quote:
      'Comprei praticamente tudo pra minha obra ali: madeira, telha, chapa, prego. Sempre com nota certinha e madeira de procedência legalizada.',
  },
]

const Stars = ({ count = 5 }) => (
  <div className="flex gap-1" aria-label={`${count} de 5 estrelas`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        viewBox="0 0 20 20"
        className={`h-4 w-4 ${i < count ? 'fill-[#2e7d32]' : 'fill-black/10'}`}
      >
        <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.62 1-5.8-4.21-4.1 5.82-.85z" />
      </svg>
    ))}
  </div>
)

export default function Testimonials() {
  const trackRef = useRef(null)

  const scrollByCard = (dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('[data-card]')
    const amount = (card?.offsetWidth || 320) + 24
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
      <div className="flex flex-col items-center text-center">
        <BlurText
          text="O que dizem nossos clientes"
          delay={150}
          stepDuration={0.7}
          animateBy="words"
          direction="top"
          className="max-w-2xl justify-center text-3xl uppercase leading-[1.15] text-white [font-family:var(--font-display)] sm:text-4xl"
        />

        <p className="mb-5 mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
          Clientes que confiam na Central Madeiras
        </p>

        <div className="flex items-center">
          {AVATAR_STACK.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="-ml-3 h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-md first:ml-0 sm:h-11 sm:w-11"
              style={{ zIndex: AVATAR_STACK.length - i }}
              draggable={false}
            />
          ))}
        </div>
      </div>

      <div className="relative mt-14">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map((t) => (
            <article
              key={t.name}
              data-card
              className="flex w-[300px] shrink-0 snap-center flex-col justify-between rounded-[28px] border border-black/5 bg-white/95 p-7 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.35)] backdrop-blur sm:w-[340px]"
            >
              <div>
                <Stars count={t.rating} />
                <p className="mt-5 text-[15px] leading-relaxed text-neutral-700">
                  “{t.quote}”
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-black/5 pt-5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-[#2e7d32]/15"
                  draggable={false}
                />
                <div className="text-left">
                  <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
                  <p className="text-xs text-neutral-500">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            aria-label="Depoimento anterior"
            onClick={() => scrollByCard(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
              <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Próximo depoimento"
            onClick={() => scrollByCard(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
