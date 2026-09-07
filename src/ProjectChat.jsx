import { useRef, useState } from 'react'
import logoMark from './assets/logo-central-madeiras-mark.webp'
import BlurText from './BlurText'
import PatternBackground from './PatternBackground'
import StoreLocationCard from './StoreLocationCard'
import { WHATSAPP_NUMBER } from './theme'

export default function ProjectChat() {
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const textareaRef = useRef(null)

  const handleInput = (e) => {
    setMessage(e.target.value)
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${Math.min(el.scrollHeight, 96)}px`
    }
  }

  const handleSend = () => {
    const text = message.trim()
    if (!text) return
    setSent(true)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="relative z-10 -mt-10 overflow-hidden rounded-t-[40px] bg-white pb-24 pt-16 shadow-[0_-25px_60px_-20px_rgba(0,0,0,0.25)] sm:pb-28 sm:pt-20">
      <PatternBackground />

      <section className="relative mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#2e7d32]">
            Fale com a gente
          </p>
          <BlurText
            text="Descreva seu projeto"
            delay={150}
            stepDuration={0.7}
            animateBy="words"
            direction="top"
            className="max-w-2xl justify-center text-3xl uppercase leading-[1.15] text-neutral-900 [font-family:var(--font-display)] sm:text-4xl"
          />
          <p className="mt-4 max-w-md text-sm text-neutral-500">
            Conte o que você precisa para sua obra ou reforma. Sua mensagem vai direto para o nosso WhatsApp.
          </p>
        </div>

        <div className="mx-auto mt-14 w-full max-w-[380px]">
          {/* moldura estilo iPhone */}
          <div className="rounded-[46px] bg-neutral-900 p-3 shadow-[0_35px_70px_-25px_rgba(0,0,0,0.5)]">
            <div className="relative overflow-hidden rounded-[34px] bg-[#f2f2f5]">
              {/* dynamic island */}
              <div className="absolute left-1/2 top-3 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

              {/* status bar */}
              <div className="flex items-center justify-between px-7 pb-1 pt-4 text-[13px] font-semibold text-neutral-900">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <svg viewBox="0 0 18 12" className="h-[10px] w-[15px] fill-neutral-900">
                    <rect x="0" y="8" width="3" height="4" rx="0.5" />
                    <rect x="5" y="5.5" width="3" height="6.5" rx="0.5" />
                    <rect x="10" y="3" width="3" height="9" rx="0.5" />
                    <rect x="15" y="0" width="3" height="12" rx="0.5" />
                  </svg>
                  <svg viewBox="0 0 16 12" className="h-[11px] w-[14px] fill-neutral-900">
                    <path d="M8 10.2a1.15 1.15 0 110 2.3 1.15 1.15 0 010-2.3z" />
                    <path d="M8 6.6c1.5 0 2.87.55 3.94 1.46a.5.5 0 01-.66.75A5.44 5.44 0 008 7.6c-1.24 0-2.38.42-3.28 1.2a.5.5 0 11-.66-.75A6.94 6.94 0 018 6.6z" />
                    <path d="M8 3c2.6 0 4.98 1 6.76 2.63a.5.5 0 11-.68.74A9.44 9.44 0 008 4c-2.32 0-4.44.87-6.08 2.37a.5.5 0 11-.68-.74A10.44 10.44 0 018 3z" />
                  </svg>
                  <svg viewBox="0 0 25 12" className="h-[11px] w-[23px]">
                    <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="currentColor" strokeOpacity="0.4" fill="none" className="text-neutral-900" />
                    <rect x="2" y="2" width="15" height="8" rx="1.5" className="fill-neutral-900" />
                    <rect x="21.5" y="4" width="1.8" height="4" rx="0.8" className="fill-neutral-900" fillOpacity="0.4" />
                  </svg>
                </div>
              </div>

              {/* cabeçalho do chat */}
              <div className="flex items-center gap-3 border-b border-black/5 bg-white/80 px-5 py-3 backdrop-blur">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                  <img src={logoMark} alt="Central Madeiras" className="h-full w-full object-cover" draggable={false} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-neutral-900">Central Madeiras</p>
                  <p className="flex items-center gap-1 text-[11px] text-neutral-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    online
                  </p>
                </div>
              </div>

              {/* corpo do chat */}
              <div className="flex min-h-[230px] flex-col gap-3 px-4 py-5">
                <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 text-left text-[14px] leading-snug text-neutral-800 shadow-sm">
                  Oi! 👋 Conte pra gente o que você precisa para sua obra ou reforma.
                </div>

                {sent && message && (
                  <div className="ml-auto max-w-[82%] rounded-2xl rounded-tr-sm bg-[#2e7d32] px-4 py-2.5 text-left text-[14px] leading-snug text-white shadow-sm">
                    {message}
                  </div>
                )}
              </div>

              {/* barra de digitação */}
              <div className="flex items-end gap-2 border-t border-black/5 bg-white/90 px-3 py-3 backdrop-blur">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={message}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setSent(false)}
                  placeholder="Escreva sua mensagem..."
                  className="max-h-24 flex-1 resize-none rounded-full bg-neutral-100 px-4 py-2.5 text-[14px] text-neutral-800 outline-none placeholder:text-neutral-400 focus:bg-neutral-200/70"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  aria-label="Enviar mensagem"
                  disabled={!message.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2e7d32] text-white shadow-md transition active:scale-95 disabled:opacity-30"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2.2]">
                    <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* home indicator */}
              <div className="flex justify-center rounded-b-[34px] bg-white/90 pb-2 pt-1 backdrop-blur">
                <span className="h-1 w-28 rounded-full bg-neutral-900/70" />
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-neutral-400">
            Pressione enter ou toque em enviar — abrimos o WhatsApp com sua mensagem pronta.
          </p>

          <StoreLocationCard className="mt-8" />
        </div>
      </section>
    </div>
  )
}
