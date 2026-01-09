interface BulletLayoutProps {
  title: string
  items: string[]
  description?: string
  highlightFirst?: boolean
}

export default function BulletLayout({
  title,
  items,
  description,
  highlightFirst,
}: BulletLayoutProps) {
  return (
    <div className="h-full flex flex-col px-12 md:px-20 pt-12 md:pt-16 pb-40 bg-white/0 relative z-10">
      <div className="mb-10 md:mb-12 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-5xl md:text-6xl font-light text-black tracking-tight mb-3">{title}</h2>
        {description && (
          <p className="text-xl md:text-2xl text-black/40 font-light leading-snug tracking-tight max-w-4xl">{description}</p>
        )}
        <div className="w-16 h-1 bg-black/10 rounded-full mt-4 underline-reveal"></div>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <ul className="space-y-6 md:space-y-8 max-w-5xl">
          {items.map((item, index) => (
            <li
              key={index}
              className={`flex items-start text-2xl md:text-4xl font-light leading-tight slide-enter tracking-tight transition-transform duration-300 hover:translate-x-3 ${
                index === 0 && highlightFirst
                  ? 'text-black font-normal'
                  : 'text-black/60'
              } hover:text-black`}
              style={{ 
                animationDelay: `${0.2 + index * 0.08}s`, 
                opacity: 0, 
                animationFillMode: 'forwards',
                willChange: 'transform',
                backfaceVisibility: 'hidden'
              }}
            >
              <span className="text-black/20 mr-6 mt-1 text-5xl font-light leading-none flex-shrink-0">•</span>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

