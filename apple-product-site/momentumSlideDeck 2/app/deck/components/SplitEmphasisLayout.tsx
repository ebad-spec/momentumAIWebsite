interface SplitEmphasisLayoutProps {
  title: string
  leftItems: Array<{
    title: string
    content: string
  }>
  rightItems: Array<{
    title: string
    content: string
  }>
}

export default function SplitEmphasisLayout({
  title,
  leftItems,
  rightItems,
}: SplitEmphasisLayoutProps) {
  return (
    <div className="h-full flex flex-col px-12 md:px-20 pt-12 md:pt-16 pb-40 bg-white/0 relative z-10">
      <div className="mb-8 md:mb-10 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-5xl md:text-6xl font-light text-black tracking-tight mb-3">{title}</h2>
        <div className="w-16 h-1 bg-black/10 rounded-full reveal-underline"></div>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div className="space-y-8 md:space-y-10">
          {leftItems.map((item, index) => (
            <div
              key={index}
              className="slide-enter"
              style={{ 
                animationDelay: `${0.2 + index * 0.1}s`, 
                opacity: 0, 
                animationFillMode: 'forwards',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
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
              <h3 className="text-3xl md:text-4xl font-light mb-3 text-black tracking-tight">{item.title}</h3>
              <p className="text-xl md:text-2xl text-black/50 font-light leading-relaxed tracking-tight">{item.content}</p>
            </div>
          ))}
        </div>
        <div className="space-y-8 md:space-y-10">
          {rightItems.map((item, index) => (
            <div
              key={index}
              className="slide-enter"
              style={{ 
                animationDelay: `${0.25 + index * 0.1}s`, 
                opacity: 0, 
                animationFillMode: 'forwards',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
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
              <h3 className="text-3xl md:text-4xl font-light mb-3 text-black tracking-tight">{item.title}</h3>
              <p className="text-xl md:text-2xl text-black/50 font-light leading-relaxed tracking-tight">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

