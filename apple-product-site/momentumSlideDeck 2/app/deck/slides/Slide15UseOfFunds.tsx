'use client'

import { useState, useEffect } from 'react'

export default function Slide15UseOfFunds() {
  const [progress, setProgress] = useState(0)

  const data = [
    { 
      label: 'Product & Engineering', 
      value: 50000, 
      color: 'rgba(0, 0, 0, 0.85)',
      gradient: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)',
      description: '5 core engineers @ $10K each for 4 months of full-time development. Focused on high-velocity feature deployment, AI reliability improvements, and platform scalability. This investment ensures we can rapidly iterate on user feedback and maintain competitive product velocity.',
    },
    { 
      label: 'Marketing & Content', 
      value: 35000, 
      color: 'rgba(0, 0, 0, 0.70)',
      gradient: 'linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 100%)',
      description: '$15K for 3 part-time content specialists creating high-impact social media reels, video campaigns, and educational content. $20K allocated for ambitious content creation: UGC campaigns, billboard advertising, innovative promotional videos unseen from tech startups, hiring professional camera crews, and creative marketing initiatives. This budget spans 8-12 months for maximum impact across TikTok, Instagram, and YouTube.',
    },
    { 
      label: 'Business Development', 
      value: 15000, 
      color: 'rgba(0, 0, 0, 0.55)',
      gradient: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
      description: 'Hosting 10-15 campus and community events over 8 months to drive organic growth. Each event budgeted at $1K for venue, refreshments, and materials. Strategic sponsorships ($200-$1K per event) at student conferences and study groups to build brand awareness and trust within our target demographic.',
    },
    { 
      label: 'Office Space', 
      value: 35000, 
      color: 'rgba(0, 0, 0, 0.50)',
      gradient: 'linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 100%)',
      description: 'Renting a clean, aesthetic office space for 8-12 months to centralize the team. Having everyone in one place creates highly effective collaboration and accelerates AI platform development. The space serves dual purpose: a productive work environment for engineering and business development, and a professional backdrop for high-quality marketing content creation.',
    },
    { 
      label: 'Operations & Misc', 
      value: 15000, 
      color: 'rgba(0, 0, 0, 0.40)',
      gradient: 'linear-gradient(135deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 100%)',
      description: 'Operational overhead including cloud infrastructure, development tools, and essential software licenses. Equipment purchases for team productivity. Contingency reserve for unexpected opportunities and market shifts, ensuring we can pivot quickly when needed.',
    },
  ]

  const total = 150000
  const radius = 42

  useEffect(() => {
    const duration = 2200 // ms - longer for smoother, more momentum feel
    const startTime = Date.now()
    let animationFrame: number

    // Smooth momentum easing with natural deceleration
    // Starts with energy, smoothly decelerates with momentum
    const easeOutMomentum = (t: number): number => {
      if (t === 0) return 0
      if (t === 1) return 1
      
      // Custom curve: fast start, smooth deceleration with slight momentum
      // Combines ease-out-cubic with a subtle exponential feel
      const cubic = 1 - Math.pow(1 - t, 3)
      const expo = t === 1 ? 1 : 1 - Math.pow(2, -8 * t)
      
      // Blend for smooth momentum feel
      return cubic * 0.7 + expo * 0.3
    }

    const animate = () => {
      const elapsed = Date.now() - startTime
      const rawProgress = Math.min(elapsed / duration, 1)
      
      const easedProgress = easeOutMomentum(rawProgress)
      setProgress(easedProgress)

      if (rawProgress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    // Small delay for entrance effect
    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate)
    }, 150)

    return () => {
      clearTimeout(timeout)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <div className="min-h-full md:h-full flex flex-col px-6 md:px-12 lg:px-16 pt-10 sm:pt-12 md:pt-16 pb-16 md:pb-40 bg-white/0 relative z-10 overflow-visible md:overflow-hidden">
      <div className="mb-4 md:mb-6 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-3xl md:text-4xl font-light text-black tracking-tight mb-1.5">Use of Funds</h2>
        <p className="text-base md:text-lg text-black/40 font-light leading-snug tracking-tight max-w-3xl">
          Allocating $150,000 for high-velocity execution and scale.
        </p>
        <div className="w-16 h-1 bg-black/10 rounded-full mt-2 underline-reveal"></div>
      </div>

      <div className="flex-1 flex flex-col items-stretch md:items-center justify-start md:justify-center gap-3 lg:gap-4 xl:gap-5 max-w-6xl mx-auto w-full mt-2 md:mt-3 lg:mt-4">
        {/* Top Row - 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-4 lg:gap-6 xl:gap-8 w-full">
          {/* Left Column - First 2 Cards */}
          <div className="flex flex-col gap-2.5 md:gap-3 justify-center items-stretch">
            {data.slice(0, 2).map((item, index) => {
            const animatedPercentage = (item.value / total) * 100 * progress

            return (
              <div
                key={index}
                className="p-3 md:p-4 rounded-[1.5rem] bg-white border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.05)] scale-[1.02] scale-enter transition-all duration-300 group h-full flex flex-col"
                style={{ 
                  animationDelay: `${0.3 + index * 0.1}s`, 
                  opacity: 0, 
                  animationFillMode: 'forwards',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden'
                }}
              >
                <div className="flex items-start gap-2.5 mb-1.5 flex-1">
                  <div 
                    className="w-2 h-2 rounded-full shrink-0 transition-all duration-300 scale-125 mt-0.5"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                      <h3 className="text-base md:text-lg font-light text-black tracking-tight">{item.label}</h3>
                      <span className="text-sm md:text-base text-black/20 font-light tracking-tighter">
                        ${(item.value / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="flex-1 h-1.5 bg-black/[0.03] rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000 ease-out-expo"
                          style={{ 
                            width: `${animatedPercentage}%`,
                            background: item.gradient
                          }}
                        />
                      </div>
                      <span className="text-xs text-black/40 font-light tracking-tight min-w-[2.5rem] text-right">
                        {animatedPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-black/50 font-light leading-relaxed tracking-tight flex-1 break-words">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

          {/* Center Column - Donut Chart */}
          <div className="flex items-center justify-center order-first lg:order-none">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 scale-enter" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full transform -rotate-90" 
              style={{ 
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.04))',
                shapeRendering: 'geometricPrecision'
              }}
            >
              {(() => {
                let angle = -90
                return data.map((item, index) => {
                  const startAngle = angle
                  const animatedValue = item.value * progress
                  const sweepAngle = (animatedValue / total) * 360
                  const endAngle = startAngle + sweepAngle
                  angle = endAngle

                const x1 = 50 + radius * Math.cos((startAngle * Math.PI) / 180)
                const y1 = 50 + radius * Math.sin((startAngle * Math.PI) / 180)
                const x2 = 50 + radius * Math.cos((endAngle * Math.PI) / 180)
                const y2 = 50 + radius * Math.sin((endAngle * Math.PI) / 180)

                const largeArcFlag = sweepAngle > 180 ? 1 : 0
                const isFirst = index === 0
                const isLast = index === data.length - 1

                return (
                  <g key={index}>
                    <path
                      d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
                      fill="none"
                      stroke={item.color}
                      strokeWidth="10"
                      strokeLinecap="butt"
                      style={{ 
                        opacity: sweepAngle > 0.1 ? 1 : 0,
                        transition: 'opacity 0.1s ease-out'
                      }}
                    />
                    {/* Rounded cap at the very start of the first segment */}
                    {isFirst && sweepAngle > 0.1 && (
                      <circle
                        cx={x1}
                        cy={y1}
                        r="5"
                        fill={item.color}
                        style={{ opacity: 1 }}
                      />
                    )}
                    {/* Rounded cap at the very end of the last segment when animation completes */}
                    {isLast && progress >= 0.99 && sweepAngle > 0.1 && (
                      <circle
                        cx={x2}
                        cy={y2}
                        r="5"
                        fill={item.color}
                        style={{ opacity: 1 }}
                      />
                    )}
                  </g>
                )
              })})()}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center fade-enter" style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}>
              <span className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter text-black mb-1">$150K</span>
              <span className="text-xs md:text-sm text-black/30 font-light tracking-wider uppercase">Total Funding</span>
            </div>
          </div>
          </div>

          {/* Right Column - Last 2 Cards */}
          <div className="flex flex-col gap-2.5 md:gap-3 justify-center items-stretch">
            {data.slice(2, 4).map((item, index) => {
            const actualIndex = index + 2
            const animatedPercentage = (item.value / total) * 100 * progress

            return (
              <div
                key={actualIndex}
                className="p-3 md:p-4 rounded-[1.5rem] bg-white border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.05)] scale-[1.02] scale-enter transition-all duration-300 group h-full flex flex-col"
                style={{ 
                  animationDelay: `${0.3 + actualIndex * 0.1}s`, 
                  opacity: 0, 
                  animationFillMode: 'forwards',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden'
                }}
              >
                <div className="flex items-start gap-2.5 mb-1.5 flex-1">
                  <div 
                    className="w-2 h-2 rounded-full shrink-0 transition-all duration-300 scale-125 mt-0.5"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                      <h3 className="text-base md:text-lg font-light text-black tracking-tight">{item.label}</h3>
                      <span className="text-sm md:text-base text-black/20 font-light tracking-tighter">
                        ${(item.value / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="flex-1 h-1.5 bg-black/[0.03] rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000 ease-out-expo"
                          style={{ 
                            width: `${animatedPercentage}%`,
                            background: item.gradient
                          }}
                        />
                      </div>
                      <span className="text-xs text-black/40 font-light tracking-tight min-w-[2.5rem] text-right">
                        {animatedPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-black/50 font-light leading-relaxed tracking-tight flex-1 break-words">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
          </div>
        </div>

        {/* Bottom Row - Centered Wide Card */}
        <div className="w-full">
          <div className="w-full">
            {(() => {
              const item = data[4] // Operations & Misc
              const animatedPercentage = (item.value / total) * 100 * progress
              
              return (
                <div
                  className="p-3 md:p-4 rounded-[1.5rem] bg-white border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.05)] scale-[1.02] scale-enter transition-all duration-300 group"
                  style={{ 
                    animationDelay: `${0.3 + 4 * 0.1}s`, 
                    opacity: 0, 
                    animationFillMode: 'forwards',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center items-start gap-2.5 md:gap-3">
                    <div 
                      className="w-2 h-2 rounded-full shrink-0 transition-all duration-300 scale-125"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-0.5 flex-wrap">
                        <h3 className="text-base md:text-lg font-light text-black tracking-tight">{item.label}</h3>
                        <span className="text-sm md:text-base text-black/20 font-light tracking-tighter">
                          ${(item.value / 1000).toFixed(0)}K
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <div className="flex-1 h-1.5 bg-black/[0.03] rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-1000 ease-out-expo"
                            style={{ 
                              width: `${animatedPercentage}%`,
                              background: item.gradient
                            }}
                          />
                        </div>
                        <span className="text-xs text-black/40 font-light tracking-tight min-w-[2.5rem] text-right">
                          {animatedPercentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-black/50 font-light leading-relaxed tracking-tight w-full md:max-w-md md:ml-auto mt-1 md:mt-0 break-words">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}

