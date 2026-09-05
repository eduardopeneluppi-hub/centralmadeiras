import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Intro from './Intro'
import Navbar from './Navbar'
import BlurText from './BlurText'
import BannerRotator from './BannerRotator'
import Catalog from './Catalog'
import Origin from './Origin'
import Testimonials from './Testimonials'
import ProjectChat from './ProjectChat'
import QuoteModal from './QuoteModal'
import { brandGreenGradient, WHATSAPP_NUMBER } from './theme'

import fachadaImg from './assets/fachada-central-madeiras.jpg'
import banner1 from './assets/banners/banner-1.jpg'
import banner2 from './assets/banners/banner-2.jpg'
import nossosProdutosBtn from './assets/buttons/nossos-produtos.webp'
import facaSeuPedidoBtn from './assets/buttons/faca-seu-pedido.webp'

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [heroTitleDone, setHeroTitleDone] = useState(false)
  const [showCatalog, setShowCatalog] = useState(false)

  useEffect(() => {
    if (showIntro) return
    // title finishes blurring in ~2.6s after it starts, then holds for 3s
    const t = setTimeout(() => setHeroTitleDone(true), 5600)
    return () => clearTimeout(t)
  }, [showIntro])

  return (
    <>
      {showIntro && <Intro onFinish={() => setShowIntro(false)} />}
      {!showIntro && <Navbar />}
      <main className="relative min-h-svh w-full overflow-hidden bg-white">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, black 25%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 25%, transparent 100%)',
          }}
        >
          <div className="absolute inset-0" style={{ background: brandGreenGradient }} />
          <img
            src={fachadaImg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-20 sm:object-[50%_38%]"
          />
        </div>

        <div className="relative z-10 mx-auto min-h-[340px] w-full max-w-4xl px-6 pt-36 text-center sm:min-h-[560px] sm:pt-40">
          <div
            className={`absolute inset-x-6 top-36 translate-y-[7%] transition-opacity duration-700 sm:top-40 ${
              heroTitleDone ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          >
            <BlurText
              text="Referência em madeira legalizada park"
              delay={250}
              stepDuration={0.8}
              animateBy="words"
              direction="top"
              active={!showIntro}
              className="hero-headline mx-auto max-w-3xl justify-center text-3xl uppercase leading-[1.15] text-white [font-family:var(--font-display)] sm:text-5xl"
            />
          </div>

          <div
            className={`absolute inset-x-6 top-36 bottom-0 transition-opacity duration-700 sm:top-20 sm:translate-y-[3%] ${
              heroTitleDone ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <BannerRotator
              images={[{ src: banner1, position: '5% 50%' }, banner2]}
              active={heroTitleDone}
              interval={5000}
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-1.5 px-8 pb-6 pt-16 sm:px-6 sm:pt-20">
          <button
            type="button"
            onClick={() => setShowCatalog((v) => !v)}
            aria-expanded={showCatalog}
            className="relative z-10 -mx-[5%] block w-[110%] transition active:scale-[0.98]"
          >
            <img src={nossosProdutosBtn} alt="Nossos Produtos" className="w-full h-auto" draggable={false} />
          </button>

          <AnimatePresence initial={false}>
            {showCatalog && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
                className="overflow-hidden"
              >
                <Catalog />
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de fazer um pedido na Central Madeiras.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition active:scale-[0.98]"
          >
            <img src={facaSeuPedidoBtn} alt="Faça seu Pedido" className="w-full h-auto" draggable={false} />
          </a>
        </div>

        <Origin />

        <div className="relative -mt-[14vh] sm:mt-0">
          <div className="absolute inset-x-0 bottom-0 -top-52" style={{ background: brandGreenGradient }} />
          <div
            className="pointer-events-none absolute inset-x-0 -top-52 h-52"
            style={{ background: 'linear-gradient(to bottom, #ffffff 0%, transparent 100%)' }}
          />
          <Testimonials />
        </div>

        <ProjectChat />
      </main>

      <QuoteModal />
    </>
  )
}

export default App
