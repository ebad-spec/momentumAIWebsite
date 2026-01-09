interface TitleSlideLayoutProps {
  title: string | React.ReactNode
  subtitle?: string
  children?: React.ReactNode
  logo?: React.ReactNode
}

export default function TitleSlideLayout({
  title,
  subtitle,
  children,
  logo,
}: TitleSlideLayoutProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-8 md:px-16 py-8 bg-white/0 relative z-10">
      {logo && (
        <div className="scale-enter mb-8" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
          {logo}
        </div>
      )}
      <h1 
        className="text-6xl md:text-8xl font-light mb-6 text-black tracking-tighter slide-enter"
        style={{ animationDelay: '0.15s', opacity: 0, animationFillMode: 'forwards' }}
      >
        {title}
      </h1>
      {subtitle && (
        <p 
          className="text-xl md:text-2xl text-black/40 mb-12 max-w-2xl font-light leading-snug slide-enter tracking-tight"
          style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}
        >
          {subtitle}
        </p>
      )}
      {children && (
        <div 
          className="mt-4 text-black/30 text-sm font-light fade-enter tracking-wide uppercase"
          style={{ animationDelay: '0.45s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <div className="w-12 h-px bg-black/10 mx-auto mb-6 underline-reveal"></div>
          {children}
        </div>
      )}
    </div>
  )
}
