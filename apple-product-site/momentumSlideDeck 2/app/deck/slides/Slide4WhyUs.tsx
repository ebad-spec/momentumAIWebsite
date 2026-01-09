'use client'

const competitors = [
  {
    name: 'ChatGPT',
    positioning: 'Answers questions',
    strengths: ['Tutoring & Q&A', 'File uploads', 'Project memory'],
    weaknesses: ['No semester planning', 'No spaced repetition', 'Not course-native'],
    color: 'bg-black/5',
    borderColor: 'border-black/10',
  },
  {
    name: 'YouLearn',
    positioning: 'Helps you learn materials',
    strengths: ['Materials → Notes', 'Quizzes & Exams', 'Multi-format ingestion'],
    weaknesses: ['No semester planning', 'No spaced repetition', 'Usage limits'],
    color: 'bg-black/5',
    borderColor: 'border-black/10',
  },
  {
    name: 'OpenNote',
    positioning: 'Helps you organize knowledge',
    strengths: ['Note workspace', 'Integrations', 'Exports'],
    weaknesses: ['No semester planning', 'No spaced repetition', 'Not execution-focused'],
    color: 'bg-black/5',
    borderColor: 'border-black/10',
  },
  {
    name: 'Momentum',
    positioning: 'Runs the semester',
    strengths: ['Semester-native planning', 'Spaced repetition', 'Course execution system'],
    weaknesses: [],
    color: 'bg-gradient-to-br from-black to-black/90',
    borderColor: 'border-black/30',
    isMomentum: true,
  },
]

export default function Slide4WhyUs() {
  return (
    <div className="h-full flex flex-col px-12 md:px-20 pt-12 md:pt-16 pb-8 bg-white/0 relative z-10">
      {/* Header */}
      <div className="mb-4 md:mb-6 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-4xl md:text-5xl font-light text-black tracking-tight mb-2">Why Momentum Wins</h2>
        <p className="text-lg md:text-xl text-black/40 font-light leading-snug tracking-tight max-w-4xl">
          Other startups are building similar tools—but they answer questions, organize knowledge, or help learn materials. Momentum runs the semester.
        </p>
        <div className="w-16 h-1 bg-black/10 rounded-full mt-3 underline-reveal"></div>
      </div>

      {/* Competitors Grid */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="w-full flex-1 min-h-0 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-5">
            {competitors.map((competitor, index) => (
          <div
                key={index}
                className={`group relative ${competitor.color} backdrop-blur-sm border ${competitor.borderColor} rounded-xl md:rounded-2xl p-4 md:p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out slide-enter flex flex-col ${
                  competitor.isMomentum ? 'border-2 shadow-[0_8px_24px_rgba(0,0,0,0.15)]' : ''
                }`}
            style={{ 
                  animationDelay: `${0.15 + index * 0.08}s`, 
              opacity: 0,
              animationFillMode: 'forwards',
            }}
          >
                {/* Name */}
                <div className={`mb-2 md:mb-3 ${competitor.isMomentum ? 'text-white' : 'text-black'} text-lg md:text-xl font-light tracking-tight`}>
                  {competitor.name}
                </div>

                {/* Positioning */}
                <div className={`mb-3 md:mb-4 text-xs md:text-sm font-light uppercase tracking-wider ${competitor.isMomentum ? 'text-white/70' : 'text-black/40'}`}>
                  {competitor.positioning}
                </div>

                {/* Strengths */}
                <div className="flex-1">
                  <div className={`text-xs font-light uppercase tracking-wider mb-2 ${competitor.isMomentum ? 'text-white/60' : 'text-black/40'}`}>
                    Strengths
                  </div>
                  <ul className={`space-y-1.5 ${competitor.isMomentum ? 'text-white/90' : 'text-black/70'} text-xs md:text-sm font-light`}>
                    {competitor.strengths.map((strength, i) => (
                      <li key={i} className="flex items-start">
                        <span className={`mr-2 ${competitor.isMomentum ? 'text-white/60' : 'text-black/40'}`}>•</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses (only for competitors) */}
                {competitor.weaknesses.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-black/10">
                    <div className="text-xs font-light uppercase tracking-wider mb-2 text-black/40">
                      Missing
                    </div>
                    <ul className="space-y-1.5 text-black/50 text-xs md:text-sm font-light">
                      {competitor.weaknesses.map((weakness, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-black/30">—</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Momentum badge */}
                {competitor.isMomentum && (
                  <div className="absolute top-4 right-4">
                    <div className="w-2 h-2 rounded-full bg-white/80"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Key Differentiator */}
          <div className="mt-4 md:mt-5 slide-enter" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
            <div className="bg-gradient-to-br from-black/5 to-black/10 border border-black/10 rounded-xl md:rounded-2xl p-4 md:p-5 text-center">
              <p className="text-base md:text-lg font-light text-black mb-1">
                <span className="font-normal">The Fundamental Difference:</span> Similar tools, different architecture
            </p>
              <p className="text-sm md:text-base text-black/60 font-light">
                They optimize for features. Momentum is built around the semester as the core object—planning, pacing, and practice tied to deadlines.
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
