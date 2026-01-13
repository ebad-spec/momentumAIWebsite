'use client'

export default function Slide4Solution() {
  return (
    <div className="h-full flex flex-col px-12 md:px-20 pt-10 md:pt-12 pb-40 bg-white/0 relative z-10">
      {/* Title */}
      <div className="mb-4 md:mb-6 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-4xl md:text-5xl font-light text-black tracking-tight mb-2">The Solution: A Semester-Native System, Not Another Study App</h2>
        <p className="text-lg md:text-xl text-black/40 font-light leading-snug tracking-tight max-w-3xl mt-2">
          A single, guided system that manages the workload. Not reactive AI—proactive, structured, and adaptive.
        </p>
        <div className="mt-3 md:mt-4 mb-2 px-4 py-2 bg-black/5 border border-black/10 rounded-xl inline-block">
          <p className="text-base md:text-lg font-light text-black italic">
            Momentum is built around the semester as the core object, not notes, chats, or flashcards.
          </p>
        </div>
        <div className="w-16 h-1 bg-black/10 rounded-full mt-2 md:mt-3 underline-reveal"></div>
      </div>

      {/* Main Content - Visual Flow */}
      <div className="flex-1 flex flex-col justify-center min-h-0 -mt-2 md:mt-0">
        {/* Before: Three Separate Services */}
        <div className="mb-3 md:mb-4">
          <div className="text-center mb-2 md:mb-3 slide-enter" style={{ animationDelay: '0.15s', opacity: 0, animationFillMode: 'forwards' }}>
            <p className="text-sm md:text-base text-black/40 font-light uppercase tracking-wider">Before: Fragmented Stack</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
            {[
              { title: 'ChatGPT', price: '$20/mo', color: 'bg-black/5' },
              { title: 'Quizlet/CourseHero', price: '$15/mo', color: 'bg-black/5' },
              { title: 'Planner', price: '$12/mo', color: 'bg-black/5' },
            ].map((service, index) => (
              <div
                key={index}
                className={`${service.color} rounded-xl md:rounded-2xl p-4 md:p-6 border border-black/10 scale-enter`}
                style={{ 
                  animationDelay: `${0.2 + index * 0.1}s`, 
                  opacity: 0, 
                  animationFillMode: 'forwards',
                }}
              >
                <div className="text-xl md:text-2xl font-light text-black/60 mb-1">{service.title}</div>
                <div className="text-lg md:text-xl font-light text-black/40">{service.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow/Transformation */}
        <div className="flex items-center justify-center mb-2 md:mb-3 -mt-2 fade-enter" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
          <div className="text-3xl md:text-4xl text-black/20">↓</div>
        </div>

        {/* After: One Platform */}
        <div className="-mt-1">
          <div className="text-center mb-3 md:mb-4 slide-enter" style={{ animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards' }}>
            <p className="text-sm md:text-base text-black/40 font-light uppercase tracking-wider">After: Unified System</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div
              className="relative bg-gradient-to-br from-black to-black/80 rounded-2xl md:rounded-[2rem] p-6 md:p-10 border border-black/20 shadow-[0_30px_80px_rgba(0,0,0,0.15)] scale-enter"
              style={{ 
                animationDelay: '0.7s', 
                opacity: 0, 
                animationFillMode: 'forwards',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div className="flex justify-end md:absolute md:right-6 md:top-6 md:block">
                <div className="rounded-full border border-white/30 bg-white/10 px-3 md:px-4 py-1 text-[11px] md:text-sm text-white/80 max-w-[10rem] text-center mb-3 md:mb-0">
                  From $12.99/mo
                </div>
              </div>
              <div className="text-white mb-4 md:mb-6">
                <div className="text-3xl md:text-4xl font-light mb-1">Momentum AI</div>
                <div className="text-xl md:text-2xl font-light text-white/80">All-in-One Platform</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-6">
                {[
                  { title: 'Course Ingestion', desc: 'Upload syllabi and files. Momentum maps the course' },
                  { title: 'Agentic Planning', desc: 'Auto builds a semester roadmap and daily tasks' },
                  { title: 'Active Mastery', desc: 'Practice exams + flashcards built from your notes' },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 border border-white/20 slide-enter"
                    style={{ 
                      animationDelay: `${0.8 + index * 0.1}s`, 
                      opacity: 0, 
                      animationFillMode: 'forwards',
                    }}
                  >
                    <div className="text-white text-base md:text-lg font-light mb-1">{feature.title}</div>
                    <div className="text-white/70 text-xs md:text-sm font-light">{feature.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
