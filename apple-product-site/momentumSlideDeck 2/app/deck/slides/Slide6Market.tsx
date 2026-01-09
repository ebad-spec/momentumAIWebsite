import Image from 'next/image'

export default function Slide6Market() {
  const metrics = [
    {
      category: 'TAM',
      categoryLabel: 'Total Addressable Market',
      value: '$7.2B CAD',
      label: '50M students × $144/year (Global, English-speaking)',
    },
    {
      category: 'SAM',
      categoryLabel: 'Serviceable Available Market',
      value: '$2.9B CAD',
      label: '20M students × $144/year (Canada, US, UK, Australia)',
    },
    {
      category: 'SOM',
      categoryLabel: 'Serviceable Obtainable Market',
      value: '$3–4M CAD',
      label: '~25K students × $144/year (Ontario, 5% penetration)',
    },
  ]

  return (
    <div className="h-full flex flex-col px-12 md:px-20 pt-12 md:pt-16 pb-40 bg-white/0 relative z-10">
      <div className="mb-8 md:mb-10 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-5xl md:text-6xl font-light text-black tracking-tight mb-3">Market Potential</h2>
        <p className="text-xl md:text-2xl text-black/40 font-light leading-snug tracking-tight max-w-3xl">
          Conservative market sizing for English-speaking post-secondary students globally.
        </p>
        <div className="w-16 h-1 bg-black/10 rounded-full mt-4 underline-reveal"></div>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="p-10 md:p-12 rounded-[2.5rem] bg-white border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-black/[0.08] scale-enter transition-transform duration-300 flex flex-col justify-center hover:scale-[1.03]"
            style={{ 
              animationDelay: `${0.2 + index * 0.08}s`, 
              opacity: 0, 
              animationFillMode: 'forwards',
              willChange: 'transform',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Category Badge */}
            <div className="mb-4 md:mb-6">
              <div className="text-3xl md:text-4xl font-medium text-black tracking-tight mb-1">
                {metric.category}
              </div>
              <div className="text-xs md:text-sm text-black/50 font-light uppercase tracking-wider">
                {metric.categoryLabel}
              </div>
            </div>
            {/* Value */}
            <div className="text-6xl md:text-7xl font-light mb-4 md:mb-6 text-black tracking-tighter">
              {metric.value}
            </div>
            {/* Label */}
            <div className="text-lg md:text-xl text-black/40 font-light leading-relaxed tracking-tight">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

