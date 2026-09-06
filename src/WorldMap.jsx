import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import mapImage from './assets/brazil-map.png'

// Pixel coordinates on the 800x827 map image.
const POINTS = {
  belem: { x: 330, y: 140, label: 'Belém, PA' },
  sinop: { x: 280, y: 330, label: 'Sinop, MT' },
  portoVelho: { x: 100, y: 280, label: 'Porto Velho, RO' },
  curitiba: { x: 420, y: 650, label: 'Curitiba, PR' },
  limeira: { x: 480, y: 580, label: 'Limeira, SP' },
}

const ORIGINS = [POINTS.belem, POINTS.sinop, POINTS.portoVelho, POINTS.curitiba]
const DESTINATION = POINTS.limeira

const createCurvedPath = (start, end) => {
  const midX = (start.x + end.x) / 2
  const midY = (start.y + end.y) / 2 - Math.abs(end.x - start.x) * 0.15
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
}

export default function WorldMap({ lineColor = '#2e7d32' }) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const lineWidth = isMobile ? 4 : 2.5
  const originRadius = isMobile ? 6 : 4.5
  const destRadius = isMobile ? 8 : 6
  const pulseOrigin = isMobile ? 20 : 15
  const pulseDest = isMobile ? 26 : 20

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-neutral-50 p-4 sm:p-8" style={{ aspectRatio: '800 / 827' }}>
      <img src={mapImage} alt="" className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] object-contain sm:inset-8 sm:h-[calc(100%-4rem)] sm:w-[calc(100%-4rem)]" draggable={false} />

      <svg viewBox="0 0 800 827" className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] select-none sm:inset-8 sm:h-[calc(100%-4rem)] sm:w-[calc(100%-4rem)]">
        {ORIGINS.map((origin, i) => (
          <motion.path
            key={`path-${i}`}
            d={createCurvedPath(origin, DESTINATION)}
            fill="none"
            stroke="url(#path-gradient)"
            strokeWidth={lineWidth}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 * i, ease: 'easeOut', repeat: Infinity, repeatDelay: 3 }}
          />
        ))}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {ORIGINS.map((origin, i) => (
          <g key={`origin-${i}`}>
            <circle cx={origin.x} cy={origin.y} r={originRadius} fill={lineColor} />
            <circle cx={origin.x} cy={origin.y} r={originRadius} fill={lineColor} opacity="0.5">
              <animate attributeName="r" from={originRadius} to={pulseOrigin} dur="1.5s" begin="0s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        <g>
          <circle cx={DESTINATION.x} cy={DESTINATION.y} r={destRadius} fill={lineColor} />
          <circle cx={DESTINATION.x} cy={DESTINATION.y} r={destRadius} fill={lineColor} opacity="0.55">
            <animate attributeName="r" from={destRadius} to={pulseDest} dur="1.5s" begin="0s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.55" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  )
}
