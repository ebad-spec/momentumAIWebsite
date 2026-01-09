'use client'

import Image from 'next/image'

export default function Slide10Future() {
  const milestones = [
    {
      title: 'Marketing at Scale',
      description: 'Aggressive content + UGC engine to drive awareness',
      icon: '🚀',
    },
    {
      title: '10+ Large Events',
      description: 'Host and sponsor campus events in 4–8 months',
      icon: '🎤',
    },
    {
      title: 'Engagement Growth',
      description: 'Exponentially grow active usage and retention',
      icon: '⚡',
    },
    {
      title: 'Paying Users',
      description: 'Reach 3.5K–10K monthly paying users',
      icon: '👥',
    },
    {
      title: 'Revenue Target',
      description: '$105K–$300K MRR projected from user growth',
      icon: '💰',
    },
  ]

  return (
    <div className="h-full flex flex-col px-12 md:px-20 pt-12 md:pt-16 pb-36 bg-white/0 relative z-10 overflow-hidden">
      {/* Ambient backdrop */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-black/[0.04] blur-3xl"></div>
      <div className="absolute -bottom-48 -left-40 h-96 w-96 rounded-full bg-black/[0.03] blur-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.04),_transparent_55%)]"></div>
      {/* Logo watermark removed */}
      <div className="mb-7 md:mb-9 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h2 className="text-5xl md:text-6xl font-light text-black tracking-tight mb-3">
              The Future & Milestones (Post-Raise)
            </h2>
            <p className="text-xl md:text-2xl text-black/40 font-light leading-snug tracking-tight max-w-4xl">
              4–8 month plan to scale distribution and revenue with the raise.
            </p>
          </div>
          <div className="relative w-full lg:w-auto mt-4 md:mt-6 lg:mt-10">
            <div className="absolute -inset-2 rounded-3xl bg-black/[0.04] blur-xl"></div>
            <div className="relative rounded-3xl border border-black/15 bg-white/70 px-5 py-4 backdrop-blur-sm">
              <div className="text-xs uppercase tracking-[0.2em] text-black/40">Projected Leverage</div>
              <div className="text-3xl md:text-4xl font-light text-black tracking-tight mt-1">7.4x–26x</div>
              <div className="text-xs text-black/40 mt-1">ARR-to-capital in year one</div>
            </div>
          </div>
        </div>
        <p className="text-base md:text-lg text-black/35 font-light leading-snug tracking-tight max-w-4xl mt-3">
          Projected revenue leverage: ~$1.26M–$3.6M ARR vs a $100K–150K raise.
        </p>
        <div className="w-20 h-1 bg-black/10 rounded-full mt-4 reveal-underline"></div>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-6 items-stretch">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className="group relative p-7 md:p-9 rounded-[1.75rem] bg-white/70 border border-black/10 scale-enter flex flex-col shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
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
              e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.18)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale3d(1, 1, 1) translateY(0)'
              e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="text-5xl mb-4 font-light">{milestone.icon}</div>
            <h3 className="text-xl md:text-2xl font-light mb-3 text-black tracking-tight">{milestone.title}</h3>
            <p className="text-lg md:text-xl text-black/50 font-light leading-relaxed tracking-tight flex-1">{milestone.description}</p>
            <div className="mt-5 h-px bg-gradient-to-r from-black/25 via-black/10 to-transparent"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
