import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import logo from './assets/logo-central-madeiras-mark.webp'

const LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Obras', href: '#obras' },
  { label: 'Contato', action: 'contact' },
]

const spring = { type: 'spring', stiffness: 320, damping: 32, mass: 0.9 }

export default function Navbar({ onContact }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav
        layout
        transition={spring}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,320px)] overflow-hidden rounded-[28px] border border-white/15 bg-black/40 shadow-[0_10px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-2xl backdrop-saturate-150"
      >
        <motion.div layout="position" className="flex h-16 items-center justify-between px-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
            <img
              src={logo}
              alt="Central Madeiras"
              className="h-10 w-10 object-cover select-none"
              draggable={false}
            />
          </span>

          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          >
            <motion.span
              className="absolute block h-[2px] w-5 rounded-full bg-white"
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={spring}
            />
            <motion.span
              className="absolute block h-[2px] w-5 rounded-full bg-white"
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={spring}
            />
          </button>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {open && (
            <motion.ul
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-1 px-3 pb-4"
            >
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0, transition: { ...spring, delay: i * 0.04 } }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.15, delay: (LINKS.length - 1 - i) * 0.03 } }}
                >
                  {link.action === 'contact' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false)
                        onContact?.()
                      }}
                      className="block w-full rounded-2xl px-4 py-3 text-left text-[15px] font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-[15px] font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {link.label}
                    </a>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
