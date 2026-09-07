export default function StoreLocationCard({ className = '' }) {
  return (
    <a
      href="https://maps.app.goo.gl/2zSjpoMrESXPcXMT9"
      target="_blank"
      rel="noopener noreferrer"
      className={`group mx-auto flex w-full max-w-[380px] items-center gap-3 rounded-[26px] border border-black/5 bg-white/90 p-4 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] backdrop-blur-xl transition active:scale-[0.98] ${className}`}
    >
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-[#ff453a]/15" />
        <span className="absolute inset-[3px] rounded-full bg-gradient-to-b from-[#ff6961] to-[#ff453a] shadow-[0_4px_10px_-2px_rgba(255,69,58,0.6)]" />
        <svg viewBox="0 0 24 24" className="relative h-6 w-6 fill-white">
          <path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.5 6.14 11.54 7 12.5.86-.96 7-6.65 7-12.5C18.5 5.36 15.14 2 12 2zm0 10.25a2.75 2.75 0 110-5.5 2.75 2.75 0 010 5.5z" />
        </svg>
      </span>

      <span className="min-w-0 flex-1 text-left">
        <span className="block text-[15px] font-semibold text-neutral-900">Nossa Loja</span>
        <span className="block truncate text-[13px] text-neutral-500">
          Av. Dr. Lauro Correa da Silva, 2225 — Jardim Roseira
        </span>
        <span className="block text-[13px] text-neutral-500">Limeira, SP — 13480-625</span>
      </span>

      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-none stroke-neutral-300 stroke-[2.5] transition group-hover:stroke-neutral-400">
        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}
