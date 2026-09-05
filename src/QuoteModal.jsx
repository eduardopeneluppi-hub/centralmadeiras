import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BlurText from './BlurText'
import { WHATSAPP_NUMBER } from './theme'

const ROOMS = [
  'Tábuas e Ripas',
  'Vigas e Caibros',
  'Telhas',
  'Chapas de Maderite',
  'Forro',
  'Arame e Prego',
  'Móveis Rústicos',
  'Mesa e Cadeiras',
]

const spring = { type: 'spring', stiffness: 320, damping: 30, mass: 0.9 }

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 32 32" {...props}>
    <path
      fill="currentColor"
      d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.22.6 4.3 1.65 6.09L3 29l8.1-2.6a12.9 12.9 0 004.92.98h.01c6.62 0 12.02-5.4 12.02-12.02C28.05 8.4 22.65 3 16.02 3zm0 21.9h-.01a10.8 10.8 0 01-5.5-1.5l-.4-.24-4.8 1.55 1.57-4.68-.26-.42a10.83 10.83 0 01-1.66-5.6C5 9.53 9.53 5 16.02 5c5.4 0 10.03 4.4 10.03 10.02 0 5.53-4.63 9.88-10.03 9.88zm5.87-7.4c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.51-.16-.73.16-.21.32-.84 1.04-1.03 1.25-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.6-1.6-.96-.86-1.6-1.92-1.79-2.24-.19-.32-.02-.5.14-.66.14-.14.32-.38.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.42-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.68 0 1.58 1.15 3.1 1.3 3.31.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.68.76.24 1.46.2 2 .12.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.6-.37z"
    />
  </svg>
)

export default function QuoteModal() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState([])
  const [text, setText] = useState('')

  const toggleRoom = (room) => {
    setSelected((prev) => (prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room]))
  }

  const canSend = selected.length > 0 || text.trim().length > 0

  const handleSend = () => {
    if (!canSend) return
    const parts = []
    if (selected.length) parts.push(`Produto(s) de interesse: ${selected.join(', ')}.`)
    if (text.trim()) parts.push(text.trim())
    const message = `Olá! Gostaria de solicitar um orçamento.\n\n${parts.join('\n')}`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    setOpen(false)
    setSelected([])
    setText('')
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[#2e7d32] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(46,125,50,0.6)]"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Solicitar orçamento
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition hover:bg-neutral-200"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2e7d32]">
                Vamos conversar
              </p>
              <BlurText
                text="Solicitar orçamento"
                delay={120}
                stepDuration={0.6}
                animateBy="words"
                direction="top"
                className="mt-1 max-w-[85%] text-2xl uppercase leading-tight text-neutral-900 [font-family:var(--font-display)]"
              />
              <p className="mt-3 text-sm text-neutral-500">
                Selecione o produto que você precisa. Pode marcar mais de um.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {ROOMS.map((room) => {
                  const isSelected = selected.includes(room)
                  return (
                    <button
                      key={room}
                      type="button"
                      onClick={() => toggleRoom(room)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        isSelected
                          ? 'border-[#2e7d32] bg-[#2e7d32] text-white shadow-sm'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-[#2e7d32]/40 hover:text-[#2e7d32]'
                      }`}
                    >
                      {room}
                    </button>
                  )
                })}
              </div>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Não encontrou o produto? Descreva aqui o que você precisa..."
                rows={3}
                className="mt-5 w-full resize-none rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 outline-none placeholder:text-neutral-400 focus:border-[#2e7d32]/40 focus:bg-white"
              />

              <button
                type="button"
                onClick={handleSend}
                disabled={!canSend}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_-8px_rgba(37,211,102,0.6)] transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Enviar no WhatsApp
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
