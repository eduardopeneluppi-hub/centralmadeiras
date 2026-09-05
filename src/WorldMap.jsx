import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

// Coarse silhouette of Brazil's border, as (lat -> [lngMin, lngMax]) bands.
// Not survey-accurate, just enough to read as "Brazil" in a dotted map.
const BRAZIL_BANDS = [
  { lat: 5, lngMin: -61, lngMax: -51 },
  { lat: 3, lngMin: -67, lngMax: -50 },
  { lat: 1, lngMin: -70, lngMax: -48 },
  { lat: -1, lngMin: -71, lngMax: -45 },
  { lat: -3, lngMin: -72, lngMax: -40 },
  { lat: -5, lngMin: -73, lngMax: -35.5 },
  { lat: -7, lngMin: -73, lngMax: -34.8 },
  { lat: -9, lngMin: -72, lngMax: -35 },
  { lat: -11, lngMin: -69, lngMax: -37 },
  { lat: -13, lngMin: -66, lngMax: -38.5 },
  { lat: -15, lngMin: -60, lngMax: -39 },
  { lat: -17, lngMin: -58, lngMax: -39.5 },
  { lat: -19, lngMin: -58, lngMax: -40 },
  { lat: -21, lngMin: -57.5, lngMax: -41 },
  { lat: -23, lngMin: -56.5, lngMax: -44 },
  { lat: -25, lngMin: -56, lngMax: -47.5 },
  { lat: -27, lngMin: -56, lngMax: -48.3 },
  { lat: -29, lngMin: -56.5, lngMax: -49.5 },
  { lat: -31, lngMin: -57, lngMax: -50.5 },
  { lat: -33.5, lngMin: -57, lngMax: -52.5 },
]

function bandsBoundsAt(lat) {
  if (lat >= BRAZIL_BANDS[0].lat) return BRAZIL_BANDS[0]
  if (lat <= BRAZIL_BANDS[BRAZIL_BANDS.length - 1].lat) return BRAZIL_BANDS[BRAZIL_BANDS.length - 1]

  for (let i = 0; i < BRAZIL_BANDS.length - 1; i++) {
    const a = BRAZIL_BANDS[i]
    const b = BRAZIL_BANDS[i + 1]
    if (lat <= a.lat && lat >= b.lat) {
      const t = (a.lat - lat) / (a.lat - b.lat)
      return {
        lngMin: a.lngMin + (b.lngMin - a.lngMin) * t,
        lngMax: a.lngMax + (b.lngMax - a.lngMax) * t,
      }
    }
  }
  return BRAZIL_BANDS[BRAZIL_BANDS.length - 1]
}

function buildBrazilDots() {
  const dots = []
  const latStep = 0.7
  const lngStep = 0.7
  for (let lat = 5.5; lat >= -34; lat -= latStep) {
    const { lngMin, lngMax } = bandsBoundsAt(lat)
    const rowIndex = Math.round((5.5 - lat) / latStep)
    const offset = rowIndex % 2 === 0 ? 0 : lngStep / 2
    for (let lng = lngMin + offset; lng <= lngMax; lng += lngStep) {
      dots.push({ lat, lng })
    }
  }
  return dots
}

const createCurvedPath = (start, end) => {
  const midX = (start.x + end.x) / 2
  const midY = Math.min(start.y, end.y) - 50
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
}

export default function WorldMap({
  dots = [],
  lineColor = '#2e7d32',
  lngRange = [-180, 180],
  latRange = [-90, 90],
}) {
  const [lngMin, lngMax] = lngRange
  const [latMin, latMax] = latRange

  const projectPoint = (lat, lng) => {
    const x = ((lng - lngMin) / (lngMax - lngMin)) * 800
    const y = ((latMax - lat) / (latMax - latMin)) * 400
    return { x, y }
  }

  const gridDots = useMemo(() => buildBrazilDots(), [])

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const lineWidth = isMobile ? 3 : 1.5
  const pointRadius = isMobile ? 4 : 2.5
  const pulseRadius = isMobile ? 14 : 9

  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl bg-neutral-50">
      <svg viewBox="0 0 800 400" className="absolute inset-0 h-full w-full select-none">
        {gridDots.map((d, i) => {
          const p = projectPoint(d.lat, d.lng)
          return <circle key={i} cx={p.x} cy={p.y} r="2.4" fill="#00000055" />
        })}

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng)
          const endPoint = projectPoint(dot.end.lat, dot.end.lng)
          return (
            <motion.path
              key={`path-${i}`}
              d={createCurvedPath(startPoint, endPoint)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth={lineWidth}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.5 * i,
                ease: 'easeOut',
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          )
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-${i}`}>
            {[dot.start, dot.end].map((point, j) => {
              const p = projectPoint(point.lat, point.lng)
              return (
                <g key={j}>
                  <circle cx={p.x} cy={p.y} r={pointRadius} fill={lineColor} />
                  <circle cx={p.x} cy={p.y} r={pointRadius} fill={lineColor} opacity="0.5">
                    <animate attributeName="r" from={pointRadius} to={pulseRadius} dur="1.5s" begin="0s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
                  </circle>
                </g>
              )
            })}
          </g>
        ))}
      </svg>
    </div>
  )
}
