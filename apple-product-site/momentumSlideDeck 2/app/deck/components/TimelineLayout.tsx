interface TimelineLayoutProps {
  title: string
  description?: string
  items: Array<{
    label: string
    content: string
    highlight?: boolean
  }>
}

export default function TimelineLayout({
  title,
  description,
  items,
}: TimelineLayoutProps) {
  return (
    <div className="h-full flex flex-col px-12 md:px-20 pt-12 md:pt-16 pb-40 bg-white/0 relative z-10">
      <div className="mb-8 md:mb-10 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-5xl md:text-6xl font-light text-black tracking-tight mb-3">{title}</h2>
        {description && (
          <p className="text-xl md:text-2xl text-black/40 font-light leading-snug tracking-tight max-w-4xl">{description}</p>
        )}
        <div className="w-16 h-1 bg-black/10 rounded-full mt-4 reveal-underline"></div>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="relative max-w-5xl">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-black/10"></div>
          <div className="space-y-8 md:space-y-10">
            {items.map((item, index) => (
              <div
                key={index}
                className="relative pl-20 slide-enter"
                style={{ 
                  animationDelay: `${0.2 + index * 0.12}s`, 
                  opacity: 0, 
                  animationFillMode: 'forwards',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(8px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
              >
                {/* Timeline dot */}
                <div className={`absolute left-6 top-2 w-5 h-5 rounded-full border-2 ${
                  item.highlight ? 'bg-black border-black' : 'bg-white border-black/20'
                }`}></div>
                <div className={`text-3xl md:text-4xl font-light mb-3 tracking-tight ${
                  item.highlight ? 'text-black' : 'text-black/60'
                }`}>
                  {item.label}
                </div>
                <p className="text-xl md:text-2xl text-black/50 font-light leading-relaxed tracking-tight">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

