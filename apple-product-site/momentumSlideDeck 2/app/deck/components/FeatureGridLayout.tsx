interface FeatureGridLayoutProps {
  title: string
  description?: string
  features: Array<{
    icon?: string
    title: string
    description: string
  }>
}

export default function FeatureGridLayout({
  title,
  description,
  features,
}: FeatureGridLayoutProps) {
  return (
    <div className="h-full flex flex-col px-12 md:px-20 pt-12 md:pt-16 pb-40 bg-white/0 relative z-10">
      <div className="mb-8 md:mb-10 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-5xl md:text-6xl font-light text-black tracking-tight mb-3">{title}</h2>
        {description && (
          <p className="text-xl md:text-2xl text-black/40 font-light leading-snug tracking-tight max-w-4xl">{description}</p>
        )}
        <div className="w-16 h-1 bg-black/10 rounded-full mt-4 reveal-underline"></div>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-8 md:p-10 rounded-2xl bg-white/50 border border-black/[0.03] scale-enter flex flex-col"
            style={{ 
              animationDelay: `${0.2 + index * 0.08}s`, 
              opacity: 0, 
              animationFillMode: 'forwards',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform',
              backfaceVisibility: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale3d(1.05, 1.05, 1) translateY(-6px)'
              e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale3d(1, 1, 1) translateY(0)'
              e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.03)'
            }}
          >
            {feature.icon && (
              <div className="text-5xl mb-4 font-light">{feature.icon}</div>
            )}
            <h3 className="text-xl md:text-2xl font-light mb-3 text-black tracking-tight">{feature.title}</h3>
            <p className="text-lg md:text-xl text-black/50 font-light leading-relaxed tracking-tight flex-1">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

