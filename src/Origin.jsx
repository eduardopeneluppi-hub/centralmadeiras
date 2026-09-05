import BlurText from './BlurText'
import WorldMap from './WorldMap'

const LIMEIRA = { lat: -22.5645, lng: -47.4016, label: 'Limeira, SP' }

const ROUTES = [
  { start: { lat: -1.4558, lng: -48.4902, label: 'Belém, PA' }, end: LIMEIRA },
  { start: { lat: -11.8642, lng: -55.5025, label: 'Sinop, MT' }, end: LIMEIRA },
  { start: { lat: -8.7619, lng: -63.9039, label: 'Porto Velho, RO' }, end: LIMEIRA },
  { start: { lat: -25.4284, lng: -49.2733, label: 'Curitiba, PR' }, end: LIMEIRA },
]

export default function Origin() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 sm:pb-28">
      <div className="flex flex-col items-center text-center">
        <BlurText
          text="Madeira de origem rastreada"
          delay={150}
          stepDuration={0.7}
          animateBy="words"
          direction="top"
          className="max-w-2xl justify-center text-3xl uppercase leading-[1.15] text-neutral-900 [font-family:var(--font-display)] sm:text-4xl"
        />
        <p className="mt-4 max-w-xl text-sm text-neutral-500">
          Trabalhamos com madeira de procedência legalizada, vinda de áreas de manejo florestal
          certificado em diferentes regiões do Brasil até chegar até você em Limeira e região.
        </p>
      </div>

      <div className="mt-10">
        <WorldMap dots={ROUTES} lineColor="#2e7d32" lngRange={[-78, -32]} latRange={[-36, 8]} />
      </div>
    </section>
  )
}
