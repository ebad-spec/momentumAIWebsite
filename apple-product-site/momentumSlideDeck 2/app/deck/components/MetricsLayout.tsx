interface Metric {
  value: string
  label: string
  highlight?: boolean
}

interface MetricsLayoutProps {
  title: string
  metrics: Metric[]
  description?: string
  valueClassName?: string
  gridClassName?: string
}

export default function MetricsLayout({
  title,
  metrics,
  description,
  valueClassName,
  gridClassName,
}: MetricsLayoutProps) {
  return (
    <div className="min-h-full md:h-full flex flex-col px-6 sm:px-10 md:px-20 pt-10 sm:pt-12 md:pt-16 pb-12 md:pb-40 bg-white/0 relative z-10">
      <div className="mb-5 sm:mb-8 md:mb-10 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-light text-black tracking-tight mb-3">{title}</h2>
        {description && (
          <p className="text-base sm:text-lg md:text-2xl text-black/40 font-light leading-snug tracking-tight max-w-3xl">{description}</p>
        )}
        <div className="w-16 h-1 bg-black/10 rounded-full mt-3 sm:mt-4 underline-reveal"></div>
      </div>
      <div className={`flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-stretch ${gridClassName ?? ''}`}>
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`p-6 sm:p-8 md:p-12 rounded-[2.5rem] bg-white border border-black/[0.03] scale-enter transition-transform duration-300 flex flex-col justify-center ${
              metric.highlight
                ? 'shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-black/[0.08]'
                : 'shadow-[0_10px_30px_rgba(0,0,0,0.02)]'
            } hover:scale-[1.03]`}
            style={{ 
              animationDelay: `${0.2 + index * 0.08}s`, 
              opacity: 0, 
              animationFillMode: 'forwards',
              willChange: 'transform',
              backfaceVisibility: 'hidden'
            }}
          >
            <div
              className={`${
                valueClassName ?? 'text-6xl sm:text-7xl md:text-8xl'
              } font-light mb-4 md:mb-6 text-black tracking-tighter`}
            >
              {metric.value}
            </div>
            <div className="text-base sm:text-lg md:text-xl text-black/40 font-light leading-relaxed tracking-tight">{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
