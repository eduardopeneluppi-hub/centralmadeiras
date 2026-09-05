import { useEffect, useState } from 'react'

export default function BannerRotator({ images, active, interval = 5000 }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!active) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, interval)
    return () => clearInterval(id)
  }, [active, images.length, interval])

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[24px] shadow-[0_20px_45px_-20px_rgba(0,0,0,0.35)]">
      {images.map((item, i) => {
        const src = typeof item === 'string' ? item : item.src
        const position = typeof item === 'string' ? '50% 50%' : item.position || '50% 50%'
        return (
          <img
            key={src}
            src={src}
            alt=""
            style={{ objectPosition: position }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
            draggable={false}
          />
        )
      })}
    </div>
  )
}
