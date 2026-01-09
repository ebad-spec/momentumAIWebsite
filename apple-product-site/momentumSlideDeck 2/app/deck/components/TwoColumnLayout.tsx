interface TwoColumnLayoutProps {
  left: React.ReactNode
  right: React.ReactNode
  title?: string
}

export default function TwoColumnLayout({
  left,
  right,
  title,
}: TwoColumnLayoutProps) {
  return (
    <div className="h-full flex flex-col px-12 md:px-20 pt-12 md:pt-16 pb-40 bg-white/0 relative z-10">
      {title && (
        <div className="mb-8 md:mb-10 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
          <h2 className="text-5xl md:text-6xl font-light text-black tracking-tight mb-3">{title}</h2>
          <div className="w-16 h-1 bg-black/10 rounded-full underline-reveal"></div>
        </div>
      )}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div 
          className="flex flex-col justify-center text-black/70 text-xl md:text-2xl font-light leading-relaxed slide-enter"
          style={{ animationDelay: '0.15s', opacity: 0, animationFillMode: 'forwards' }}
        >
          {left}
        </div>
        <div 
          className="flex flex-col justify-center text-black/70 text-xl md:text-2xl font-light leading-relaxed slide-enter"
          style={{ animationDelay: '0.25s', opacity: 0, animationFillMode: 'forwards' }}
        >
          {right}
        </div>
      </div>
    </div>
  )
}

