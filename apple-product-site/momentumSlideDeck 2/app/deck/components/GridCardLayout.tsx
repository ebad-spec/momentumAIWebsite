interface GridCardLayoutProps {
  title: string
  description?: string
  cards: Array<{
    title: string
    content: string
    highlight?: boolean
  }>
}

export default function GridCardLayout({
  title,
  description,
  cards,
}: GridCardLayoutProps) {
  return (
    <div className="h-full flex flex-col px-12 md:px-20 pt-12 md:pt-16 pb-40 bg-white/0 relative z-10">
      <div className="mb-8 md:mb-10 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-5xl md:text-6xl font-light text-black tracking-tight mb-3">{title}</h2>
        {description && (
          <p className="text-xl md:text-2xl text-black/40 font-light leading-snug tracking-tight max-w-4xl">{description}</p>
        )}
        <div className="w-16 h-1 bg-black/10 rounded-full mt-4 reveal-underline"></div>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-10 md:p-12 rounded-[2rem] bg-white border border-black/[0.04] scale-enter flex flex-col justify-center ${
              card.highlight
                ? 'shadow-[0_20px_50px_rgba(0,0,0,0.06)] border-black/[0.1] md:col-span-2'
                : 'shadow-[0_10px_30px_rgba(0,0,0,0.02)]'
            }`}
            style={{ 
              animationDelay: `${0.2 + index * 0.1}s`, 
              opacity: 0, 
              animationFillMode: 'forwards',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform, box-shadow',
              backfaceVisibility: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale3d(1.02, 1.02, 1) translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale3d(1, 1, 1) translateY(0)'
              e.currentTarget.style.boxShadow = card.highlight ? '0 20px 50px rgba(0,0,0,0.06)' : '0 10px 30px rgba(0,0,0,0.02)'
            }}
          >
            <h3 className="text-3xl md:text-4xl font-light mb-4 text-black tracking-tight">{card.title}</h3>
            <p className="text-xl md:text-2xl text-black/50 font-light leading-relaxed tracking-tight">{card.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

