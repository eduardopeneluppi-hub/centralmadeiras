import { useEffect, useState } from 'react'
import logo from './assets/logo-central-madeiras.webp'

export default function Intro({ onFinish }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), 2600)
    const finishTimer = setTimeout(() => onFinish?.(), 3300)
    return () => {
      clearTimeout(leaveTimer)
      clearTimeout(finishTimer)
    }
  }, [onFinish])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-white transition-opacity duration-700 ease-out ${
        leaving ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <img
        src={logo}
        alt="Central Madeiras"
        className="w-[420px] sm:w-[620px] max-w-[85vw] drop-shadow-[0_8px_30px_rgba(0,0,0,0.15)] animate-[introLogo_1s_ease-out]"
      />

      <span className="h-9 w-9 rounded-full border-[3px] border-green-600/30 border-t-green-600 animate-spin" />

      <style>{`
        @keyframes introLogo {
          0% { opacity: 0; transform: translateY(14px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
