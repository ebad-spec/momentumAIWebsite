'use client'

export default function Slide10WhyNow() {
  const items = [
    {
      label: '2024',
      content: 'RAG is production-ready → We can build course-specific context',
      highlight: true,
    },
    {
      label: 'Agentic AI',
      content: 'Multi-step workflows, not single prompts',
    },
    {
      label: 'Economic Pressure',
      content: 'Students actively consolidating subscriptions',
    },
    {
      label: 'Assumption',
      content: 'Students will pay for one tool that replaces three',
    },
  ]

  return (
    <div className="h-full flex flex-col px-12 md:px-20 pt-12 md:pt-16 pb-40 bg-white/0 relative z-10">
      {/* Title */}
      <div className="mb-6 md:mb-8 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-4xl md:text-5xl font-light text-black tracking-tight mb-2">Why This Works Now (Not 2 Years Ago)</h2>
        <p className="text-lg md:text-xl text-black/40 font-light leading-snug tracking-tight max-w-3xl mt-2">
          Optional but powerful: Signals defensibility and seriousness. Timing aligns with AI maturity + student behavior shift.
        </p>
        <div className="w-16 h-1 bg-black/10 rounded-full mt-3 underline-reveal"></div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="flex-1 flex flex-col justify-center min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 max-w-7xl mx-auto w-full">
          {/* Left Side - Main Items */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {items.map((item, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-6 md:p-8 border-2 ${
                  item.highlight 
                    ? 'border-black/30 shadow-[0_10px_30px_rgba(0,0,0,0.08)]' 
                    : 'border-black/20 shadow-[0_10px_30px_rgba(0,0,0,0.02)]'
                } bm-entrance`}
                style={{ 
                  animationDelay: `${0.15 + index * 0.1}s`,
                  opacity: 0,
                }}
              >
                {/* Label */}
                <div className={`text-2xl md:text-3xl font-light mb-3 tracking-tight ${
                  item.highlight ? 'text-black' : 'text-black/60'
                }`}>
                  {item.label}
                </div>
                
                {/* Divider */}
                <div className={`h-px mb-4 ${
                  item.highlight ? 'bg-black/20' : 'bg-black/10'
                }`}></div>
                
                {/* Content */}
                <p className="text-lg md:text-xl text-black/50 font-light leading-relaxed tracking-tight">
                  {item.content}
                </p>
              </div>
            ))}
          </div>

          {/* Right Side - Visual Timeline */}
          <div className="md:col-span-1">
            <div className="relative bg-white rounded-2xl p-6 md:p-8 border-2 border-black/20 shadow-[0_10px_30px_rgba(0,0,0,0.02)] h-full bm-entrance" style={{ animationDelay: '0.55s', opacity: 0 }}>
              <div className="text-xl md:text-2xl font-light text-black/60 tracking-tight mb-6 uppercase text-xs">Timeline</div>
              
              {/* Vertical Timeline */}
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-black/10"></div>
                
                {/* 2022 - Not Ready */}
                <div className="relative pl-12 mb-8">
                  <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-white border-2 border-black/20"></div>
                  <div className="text-lg md:text-xl font-light text-black/40 mb-1">2022</div>
                  <div className="text-sm md:text-base text-black/30 font-light">Tech not ready</div>
                  <div className="text-xs text-black/20 font-light mt-1">Single prompts only</div>
                </div>

                {/* 2023 - Building */}
                <div className="relative pl-12 mb-8">
                  <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-white border-2 border-black/20"></div>
                  <div className="text-lg md:text-xl font-light text-black/40 mb-1">2023</div>
                  <div className="text-sm md:text-base text-black/30 font-light">Early RAG experiments</div>
                  <div className="text-xs text-black/20 font-light mt-1">Unreliable in production</div>
                </div>

                {/* 2024 - Ready */}
                <div className="relative pl-12">
                  <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-black border-2 border-black"></div>
                  <div className="text-lg md:text-xl font-light text-black mb-1 font-medium">2024</div>
                  <div className="text-sm md:text-base text-black/60 font-light">Production-ready RAG</div>
                  <div className="text-xs text-black/40 font-light mt-1">Multi-step workflows</div>
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="mt-8 pt-6 border-t border-black/10">
                <div className="space-y-3">
                  <div>
                    <div className="text-2xl md:text-3xl font-light text-black mb-1">3x</div>
                    <div className="text-xs text-black/40 font-light uppercase tracking-wider">Faster AI adoption</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-light text-black mb-1">$30B+</div>
                    <div className="text-xs text-black/40 font-light uppercase tracking-wider">EdTech market size</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

