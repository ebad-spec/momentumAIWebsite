'use client'

const solutions = [
  {
    concern: 'ChatGPT makes up fake quotes and is unreliable',
    solution: 'Course-specific RAG ensures accurate, verifiable answers from your actual materials',
    icon: '✓',
  },
  {
    concern: 'Need all-in-one tool: flashcards, quizzes, planning, notes',
    solution: 'Five integrated features work together—no more juggling multiple subscriptions',
    icon: '✓',
  },
  {
    concern: 'Quizlet is cluttered with ads, lag, and premium paywalls',
    solution: 'Clean, fast interface with spaced repetition built-in—no distractions, fair pricing',
    icon: '✓',
  },
  {
    concern: 'No semester planning software that adapts to deadlines',
    solution: 'AI Study Planner auto-builds your roadmap and adjusts when life changes',
    icon: '✓',
  },
  {
    concern: 'Need active recall and spaced repetition tools',
    solution: 'AI-generated flashcards with scientifically-backed spaced repetition algorithm',
    icon: '✓',
  },
  {
    concern: 'Tools don\'t understand my course context or syllabus',
    solution: 'Upload your syllabus—Momentum maps your entire course and builds context-aware plans',
    icon: '✓',
  },
]

export default function Slide18WhyMomentum() {
  return (
    <div className="h-full flex flex-col px-12 md:px-20 pt-12 md:pt-16 pb-8 bg-white/0 relative z-10">
      {/* Header */}
      <div className="mb-4 md:mb-6 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-4xl md:text-5xl font-light text-black tracking-tight mb-2">Why Momentum Is Built for You</h2>
        <p className="text-lg md:text-xl text-black/40 font-light leading-snug tracking-tight max-w-4xl">
          Every concern students raised—we've solved it. One platform that actually works.
        </p>
        <div className="w-16 h-1 bg-black/10 rounded-full mt-3 underline-reveal"></div>
      </div>

      {/* Solutions Grid */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="w-full flex-1 min-h-0 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full">
            {solutions.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm border border-black/[0.08] rounded-xl md:rounded-2xl p-4 md:p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out slide-enter flex flex-col"
                style={{ 
                  animationDelay: `${0.15 + index * 0.08}s`, 
                  opacity: 0, 
                  animationFillMode: 'forwards',
                }}
              >
                {/* Checkmark Icon */}
                <div className="absolute top-4 right-4 md:top-5 md:right-5">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-black/5 border border-black/10 flex items-center justify-center group-hover:bg-black/10 transition-colors duration-300">
                    <span className="text-black/60 text-base md:text-lg font-light">{item.icon}</span>
                  </div>
                </div>

                {/* Concern */}
                <div className="mb-2.5 md:mb-3 pr-10 md:pr-12">
                  <div className="text-xs text-black/40 font-light uppercase tracking-wider mb-1.5">
                    The Problem
                  </div>
                  <p className="text-sm md:text-base font-light text-black/70 leading-snug">
                    {item.concern}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-black/10 via-black/5 to-transparent mb-2.5 md:mb-3"></div>

                {/* Solution */}
                <div>
                  <div className="text-xs text-black/40 font-light uppercase tracking-wider mb-1.5">
                    Momentum's Solution
                  </div>
                  <p className="text-sm md:text-base font-light text-black leading-snug">
                    {item.solution}
                  </p>
                </div>

                {/* Hover effect accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/20 rounded-b-xl md:rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-2 md:mt-3 text-center slide-enter" style={{ animationDelay: '0.65s', opacity: 0, animationFillMode: 'forwards' }}>
          <div className="inline-block bg-gradient-to-br from-black to-black/90 rounded-xl md:rounded-2xl px-6 md:px-10 py-3 md:py-4 shadow-[0_12px_32px_rgba(0,0,0,0.15)] border border-black/20">
            <p className="text-base md:text-lg font-light text-white mb-0.5">One Platform. All Your Needs.</p>
            <p className="text-xs md:text-sm font-light text-white/70">From $12.99 CAD/month</p>
          </div>
        </div>
      </div>
    </div>
  )
}
