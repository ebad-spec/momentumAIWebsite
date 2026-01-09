export default function Slide3ExistingSolutions() {
  const tools = [
    {
      name: 'ChatGPT',
      issue: 'Great for quick answers, but it does not understand your actual syllabus or deadlines.',
      coverage: 3,
    },
    {
      name: 'Quizlet/CourseHero',
      issue: 'Good for memorizing, but not for planning, practice, or progress tracking.',
      coverage: 3,
    },
    {
      name: 'Planners',
      issue: 'You do the work. They do not adapt when life or deadlines change.',
      coverage: 4,
    },
  ]

  return (
    <div className="h-full flex flex-col px-6 sm:px-10 md:px-20 pt-10 sm:pt-12 md:pt-16 pb-12 md:pb-40 bg-white/0 relative z-10">
      {/* Header */}
      <div className="mb-4 md:mb-6 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-black tracking-tight mb-2">Students Stitch Together Tools That Don’t Coordinate</h2>
        <p className="text-base sm:text-lg md:text-xl text-black/40 font-light leading-snug tracking-tight max-w-4xl">
          Each tool helps a little, but none run the semester end to end.
        </p>
        <div className="w-16 h-1 bg-black/10 rounded-full mt-3 underline-reveal"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-start md:justify-center min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-stretch lg:items-center">
          {/* Left: Tools with Limitations */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4 md:space-y-5">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="relative bg-white border-2 border-black/15 rounded-2xl p-4 sm:p-5 md:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] slide-enter"
                style={{ 
                  animationDelay: `${0.15 + index * 0.1}s`, 
                  opacity: 0, 
                  animationFillMode: 'forwards',
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-lg md:text-xl font-light text-black uppercase tracking-wider">{tool.name}</div>
                  <div className="text-2xl md:text-3xl font-light text-black/20">{tool.coverage * 10}%</div>
                </div>
                <div className="h-px bg-black/15 mb-4"></div>
                <p className="text-sm md:text-base text-black/60 font-light leading-relaxed mb-4">{tool.issue}</p>
                {/* Coverage indicator */}
                <div className="relative h-2 bg-black/10 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-black/30 rounded-full transition-all duration-500"
                    style={{ width: `${tool.coverage * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Coverage Visual & Gap */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5 md:space-y-6">
            {/* Overall Coverage Visual */}
            <div className="slide-enter" style={{ animationDelay: '0.45s', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="bg-black border-2 border-black rounded-3xl p-4 sm:p-5 md:p-7 text-center">
                <div className="text-xs md:text-sm text-white/60 font-light uppercase tracking-[0.2em] mb-3">Total Coverage</div>
                <div className="text-5xl sm:text-6xl md:text-7xl font-light text-white mb-3 tracking-tighter">10%</div>
                <div className="relative h-3 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '10%' }}></div>
                </div>
                <div className="mt-4 flex justify-between text-xs text-white/50 font-light">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* The Gap */}
            <div className="slide-enter" style={{ animationDelay: '0.55s', opacity: 0, animationFillMode: 'forwards' }}>
              <div className="bg-white border-2 border-black/20 rounded-3xl p-4 sm:p-5 md:p-7 text-center shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                <div className="text-xs md:text-sm text-black/50 font-light uppercase tracking-wider mb-3">The Core Issue</div>
                <p className="text-base sm:text-lg md:text-xl text-black font-light leading-relaxed">
                  The issue isn’t effort.<br />
                  <span className="font-normal text-black">It’s the lack of one guided system</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
