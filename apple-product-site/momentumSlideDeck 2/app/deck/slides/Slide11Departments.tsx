'use client'

import type React from 'react'

export default function Slide11Departments() {
  const departments = [
    {
      name: 'Engineering',
      position: 'top',
      description: 'Builds and maintains the product',
      details: [
        'AI systems & reliability',
        'Feature development',
        'User feedback iteration',
        'Platform scalability',
      ],
    },
    {
      name: 'Marketing',
      position: 'bottom-left',
      description: 'Brand presence & user acquisition',
      details: [
        'Gen Z–focused content',
        'Social media & UGC',
        'Funnel students to product',
        'Awareness & interest',
      ],
    },
    {
      name: 'Business Development',
      position: 'bottom-right',
      description: 'Real-world presence & differentiation',
      details: [
        'Events & partnerships',
        'Campus presence',
        'Community impact',
        'Trust & brand image',
      ],
    },
  ]

  return (
    <div className="min-h-full md:h-full flex flex-col px-6 sm:px-10 md:px-20 pt-10 sm:pt-12 md:pt-16 pb-16 md:pb-24 bg-white/0 relative z-10 overflow-visible md:overflow-hidden">
      {/* Title */}
      <div className="mb-3 md:mb-4 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-3xl md:text-4xl font-light text-black tracking-tight mb-1">How We Operate</h2>
        <p className="text-base md:text-lg text-black/40 font-light leading-snug tracking-tight max-w-3xl">
          Three core departments working in harmony to create momentum
        </p>
        <div className="w-16 h-1 bg-black/10 rounded-full mt-2 underline-reveal"></div>
      </div>

      {/* Mobile: stacked layout (avoids orbit overlap) */}
      <div className="md:hidden flex flex-col gap-3 mt-5">
        {departments.map((dept) => (
          <div
            key={dept.name}
            className="bg-white rounded-2xl p-4 border border-black/10 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-lg font-light text-black tracking-tight">{dept.name}</h3>
                <p className="text-xs text-black/60 font-light leading-relaxed mt-0.5">{dept.description}</p>
              </div>
            </div>
            <ul className="mt-3 grid grid-cols-1 gap-1.5">
              {dept.details.map((detail) => (
                <li key={detail} className="text-xs text-black/55 font-light flex items-start">
                  <span className="text-black/30 mr-2 mt-0.5 flex-shrink-0">•</span>
                  <span className="break-words">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Desktop: Circular/Wheel Layout */}
      <div className="hidden md:flex flex-1 items-center justify-center min-h-0 py-2">
        <div className="relative w-full max-w-3xl aspect-square" style={{ transform: 'translateY(-2%)' }}>
          {/* Orbiting container for cards */}
          <div 
            className="absolute inset-0 w-full h-full dept-orbit-container" 
            style={{ 
              zIndex: 15
            }}
          >
            {/* Department Cards positioned in circle */}
            {departments.map((dept, index) => {
              // Calculate angle: 120 degrees apart (360/3), starting at top
              const angle = (index * 120) - 90 // -90 to start at top
              // Circle radius: slightly smaller than before (32% of container)
              const radiusPercent = 32
              
              // Calculate position using trigonometry
              // SVG circle: cx=500, cy=500, r=380 in viewBox 0 0 1000 1000
              // This means radius is 38% of the viewBox/container size
              const radian = (angle * Math.PI) / 180
              const xOffset = Math.cos(radian) * radiusPercent
              const yOffset = Math.sin(radian) * radiusPercent
              
              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    top: `calc(50% + ${yOffset}%)`,
                    left: `calc(50% + ${xOffset}%)`,
                    transform: 'translate(-50%, -50%)',
                  } as React.CSSProperties}
                >
                  <div 
                    className="w-72 md:w-80 lg:w-72 dept-orbit-upright" 
                    style={{
                      opacity: 1,
                    } as React.CSSProperties}
                  >
                    <div className="bg-white rounded-xl p-4 md:p-5 border-2 border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] hover:border-black/20 transition-all duration-300" style={{
                      transformOrigin: 'center center',
                    }}>
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h3 className="text-lg md:text-xl font-light text-black mb-1 tracking-tight">
                            {dept.name}
                          </h3>
                          <p className="text-xs text-black/60 font-light mb-2 leading-relaxed">
                            {dept.description}
                          </p>
                        </div>
                      </div>
                      <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
                        {dept.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="text-[10px] md:text-xs text-black/50 font-light flex items-start">
                            <span className="text-black/30 mr-1.5 mt-0.5 flex-shrink-0">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Central Momentum Circle */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-28 md:h-28 rounded-full bg-white border-2 border-black/20 flex items-center justify-center z-20 dept-center-enter shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
            style={{ 
              animationDelay: '0.3s',
              opacity: 0,
              animationFillMode: 'forwards'
            }}
          >
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-black/10" />
          </div>

          {/* Connection Circle - SVG overlay (static, no rotation) */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
            <svg 
              className="absolute top-0 left-0 w-full h-full line-container"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="xMidYMid meet"
              style={{ 
                animationDelay: '0.7s',
                opacity: 0,
                animationFillMode: 'forwards'
              }}
            >
              {/* Circular connection between departments (match 32% radius) */}
              <circle
                cx="500"
                cy="500"
                r="320"
                fill="none"
                stroke="rgba(0,0,0,0.12)"
                strokeWidth="2"
                strokeDasharray="8,8"
              />
            </svg>
          </div>
        </div>
      </div>

    </div>
  )
}


