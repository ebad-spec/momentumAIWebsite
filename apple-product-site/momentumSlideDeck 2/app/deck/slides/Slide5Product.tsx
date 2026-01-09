'use client'

import Image from 'next/image'

export default function Slide5Product() {
  const features = [
    { 
      title: 'Mass File Upload', 
      description: 'Drag & drop hundreds to thousands of files. Upload syllabi, textbooks, slides, notes—all at once',
      icon: '📁',
    },
    { 
      title: 'AI Study Planner', 
      description: 'Day-by-day, week-by-week planning for the entire semester. Automatically schedules around deadlines',
      icon: '📅',
    },
    { 
      title: 'Flashcards + Spaced Repetition', 
      description: 'AI-generated flashcards paired with spaced repetition algorithm for optimal retention',
      icon: '🔄',
    },
    { 
      title: 'Exam Generator', 
      description: 'Creates course-specific practice exams based on your materials',
      icon: '📝',
    },
    { 
      title: 'Agentic Chatbot', 
      description: 'Answers using full-course context with proactive guidance',
      icon: '💬',
    },
  ]

  return (
    <div className="h-full flex flex-col px-8 md:px-16 pt-10 md:pt-14 pb-24 md:pb-28 bg-white/0 relative z-10">
      {/* Title */}
      <div className="mb-8 md:mb-10 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-3xl md:text-5xl font-light text-black tracking-tight mb-2">The Product: Core Features</h2>
        <p className="text-base md:text-xl text-black/50 font-light leading-snug tracking-tight max-w-3xl">
          Five integrated features that work together as one cohesive system
        </p>
        <div className="w-16 h-1 bg-black/10 rounded-full mt-3 underline-reveal"></div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="md:hidden space-y-4 flex-1 overflow-y-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-black/8 via-black/5 to-black/10 backdrop-blur-sm border-2 border-black/15 rounded-2xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] slide-enter"
            style={{ 
              animationDelay: `${0.1 + index * 0.08}s`, 
              opacity: 0, 
              animationFillMode: 'forwards',
            }}
          >
            <div className="relative mb-3">
              <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl"></div>
              <div className="relative text-3xl flex items-center justify-center w-14 h-14 bg-white/50 rounded-xl border border-black/10">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-lg font-light text-black mb-1.5 tracking-tight">{feature.title}</h3>
            <p className="text-sm text-black/60 font-light leading-relaxed tracking-tight">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Desktop: Clean Grid Layout */}
      <div className="hidden md:flex flex-1 items-center justify-center min-h-0">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-black/8 via-black/5 to-black/10 backdrop-blur-sm border-2 border-black/15 rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] transition-all duration-500 hover:scale-105 group slide-enter flex flex-col"
                style={{ 
                  animationDelay: `${0.15 + index * 0.1}s`, 
                  opacity: 0, 
                  animationFillMode: 'forwards',
                }}
              >
                {/* Icon */}
                <div className="relative mb-5">
                  <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative text-4xl flex items-center justify-center w-16 h-16 bg-white/40 rounded-xl border border-black/10 mx-auto">
                    {feature.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-light text-black mb-3 tracking-tight group-hover:text-black/90 transition-colors text-center">
                  {feature.title}
                </h3>
                <p className="text-sm text-black/60 font-light leading-relaxed tracking-tight text-center flex-1">
                  {feature.description}
                </p>
                
                {/* Decorative accent */}
                <div className="mt-5 h-0.5 bg-gradient-to-r from-black/20 via-black/10 to-transparent rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
        
      {/* Coming Soon Addon */}
      <div className="mt-auto pt-6 md:pt-8 slide-enter" style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}>
        <div className="bg-gradient-to-r from-black/5 via-black/8 to-black/5 border border-black/15 rounded-2xl p-4 md:p-5 text-center max-w-2xl mx-auto backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <p className="text-xs md:text-sm text-black/60 font-light uppercase tracking-wider mb-2">Coming Soon</p>
          <p className="text-base md:text-lg font-light text-black">
            MCAT & LSAT Mode Addons: <span className="font-normal text-black/80">$10.99 CAD</span> on top of Premium
          </p>
        </div>
      </div>
    </div>
  )
}
