import { motion } from 'framer-motion'
import produto1 from './assets/floating/produto-1.webp'
import produto2 from './assets/floating/produto-2.webp'
import produto3 from './assets/floating/produto-3.webp'

const ITEMS = [
  { src: produto1, duration: 3.2, floatDelay: 0, dir: 1 },
  { src: produto2, duration: 3.6, floatDelay: 0.4, dir: -1 },
  { src: produto3, duration: 3, floatDelay: 0.8, dir: 1 },
]

export default function FloatingProducts({ active }) {
  return (
    <div className="flex flex-col items-center">
      {ITEMS.map((item, i) => (
        <motion.div
          key={item.src}
          initial={{ opacity: 0, x: item.dir * 80, y: 20 }}
          animate={
            active
              ? { opacity: 1, x: 0, y: [0, -12, 0] }
              : { opacity: 0, x: item.dir * 80, y: 20 }
          }
          transition={
            active
              ? {
                  opacity: { duration: 0.6, delay: i * 0.15 },
                  x: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
                  y: {
                    duration: item.duration,
                    delay: item.floatDelay + 0.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }
              : { duration: 0.3 }
          }
          className={i > 0 ? '-mt-4 sm:-mt-6' : ''}
        >
          <img src={item.src} alt="" className="w-[160px] drop-shadow-[0_15px_25px_rgba(0,0,0,0.35)] sm:w-[220px]" draggable={false} />
        </motion.div>
      ))}
    </div>
  )
}
