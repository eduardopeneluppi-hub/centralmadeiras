import { AnimatePresence, motion } from 'framer-motion'
import BlurText from './BlurText'
import StoreLocationCard from './StoreLocationCard'
import { WHATSAPP_NUMBER } from './theme'

import facaSeuPedidoBtn from './assets/buttons/faca-seu-pedido.webp'

const spring = { type: 'spring', stiffness: 320, damping: 30, mass: 0.9 }

export default function ContactModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={spring}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl sm:p-7"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-5 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition hover:bg-neutral-200"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <BlurText
              text="Fale conosco!"
              delay={120}
              stepDuration={0.6}
              animateBy="words"
              direction="top"
              className="max-w-[85%] justify-start text-2xl uppercase leading-tight text-neutral-900 [font-family:var(--font-display)]"
            />

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de fazer um pedido na Central Madeiras.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="mt-5 block transition active:scale-[0.98]"
            >
              <img src={facaSeuPedidoBtn} alt="Faça seu Pedido" className="w-full h-auto" draggable={false} />
            </a>

            <StoreLocationCard className="mt-4" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
