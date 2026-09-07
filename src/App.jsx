import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Intro from './Intro'
import PatternBackground from './PatternBackground'
import Navbar from './Navbar'
import BlurText from './BlurText'
import BannerRotator from './BannerRotator'
import FloatingProducts from './FloatingProducts'
import Catalog from './Catalog'
import Obras from './Obras'
import Origin from './Origin'
import Testimonials from './Testimonials'
import ProjectChat from './ProjectChat'
import QuoteModal from './QuoteModal'
import { brandGreenGradient, WHATSAPP_NUMBER } from './theme'

import fachadaImg from './assets/fachada-central-madeiras.jpg'
import banner1 from './assets/banners/banner-1.jpg'
import banner2 from './assets/banners/banner-2.jpg'
import banner3 from './assets/banners/banner-3.jpg'
import nossosProdutosBtn from './assets/buttons/nossos-produtos.webp'
import facaSeuPedidoBtn from './assets/buttons/faca-seu-pedido.webp'

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [showCatalog, setShowCatalog] = useState(false)
  const [showFloating, setShowFloating] = useState(false)

  useEffect(() => {
    if (showIntro) return
    // hero title finishes blurring in ~2.6s after it becomes active
    const t = setTimeout(() => setShowFloating(true), 2700)
    return () => clearTimeout(t)
  }, [showIntro])

  return (
    <>
      {showIntro && <Intro onFinish={() => setShowIntro(false)} />}
      {!showIntro && <Navbar />}
      <main className="relative min-h-svh w-full overflow-hidden bg-white">
        <PatternBackground />

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

        <div className="relative z-10 mx-auto min-h-[300px] w-full max-w-4xl px-6 pt-36 text-center sm:min-h-[420px] sm:pt-40">
          <div
            className={`absolute inset-x-6 top-36 transition-opacity duration-700 sm:top-40 ${
              showFloating ? 'pointer-events-none opacity-0' : 'opacity-100'
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
            className={`pointer-events-none absolute inset-x-0 top-36 -translate-y-[4%] transition-opacity duration-700 sm:top-40 sm:translate-y-0 ${
              showFloating ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="flex flex-col items-center overflow-visible whitespace-nowrap leading-none tracking-tight text-white opacity-50 [font-family:var(--font-display)]"
              style={{
                maskImage: 'linear-gradient(to bottom, black 0%, black 25%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 25%, transparent 100%)',
              }}
            >
              <span className="text-6xl uppercase sm:text-9xl">Qualidade</span>
              <span className="text-6xl uppercase sm:text-9xl">Qualidade</span>
              <span className="text-6xl uppercase sm:text-9xl">Qualidade</span>
              <span className="text-6xl uppercase sm:text-9xl">Qualidade</span>
              <span className="text-6xl uppercase sm:hidden">Qualidade</span>
            </div>
          </div>

          <div
            className={`absolute inset-x-6 top-36 -translate-y-[10%] transition-opacity duration-700 sm:top-40 sm:translate-y-0 ${
              showFloating ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <FloatingProducts active={showFloating} />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-1.5 px-8 pb-6 pt-16 sm:px-6 sm:pt-20">
          <button
            type="button"
            onClick={() => setShowCatalog((v) => !v)}
            aria-expanded={showCatalog}
            className="relative z-10 -mx-[10%] block w-[120%] translate-y-[15%] transition active:scale-[0.98] sm:-mx-[5%] sm:w-[110%]"
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
                className="overflow-x-visible overflow-y-hidden"
              >
                <Catalog />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="aspect-[16/9] w-full py-2">
            <BannerRotator
              images={[{ src: banner1, position: '5% 50%' }, banner2, banner3]}
              active
              interval={5000}
            />
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de fazer um pedido na Central Madeiras.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition active:scale-[0.98]"
          >
            <img src={facaSeuPedidoBtn} alt="Faça seu Pedido" className="w-full h-auto" draggable={false} />
          </a>
        </div>

        <Obras />

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
