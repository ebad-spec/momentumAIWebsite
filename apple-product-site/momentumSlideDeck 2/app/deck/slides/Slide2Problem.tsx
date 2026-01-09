export default function Slide2Problem() {
  return (
    <div className="h-full flex flex-col px-6 sm:px-10 md:px-20 pt-10 sm:pt-12 md:pt-16 pb-12 md:pb-40 bg-white/0 relative z-10">
      {/* Header */}
      <div className="mb-4 md:mb-6 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-black tracking-tight mb-2">The Problem: Students Pay for 3-5 Tools That Don't Talk</h2>
        <p className="text-base sm:text-lg md:text-xl text-black/40 font-light leading-snug tracking-tight max-w-4xl">
          50-60M English-speaking students juggle dense syllabi, deadlines, and exams across disconnected tools. The result is higher spend, more stress, and worse outcomes.
        </p>
        <div className="w-16 h-1 bg-black/10 rounded-full mt-3 underline-reveal"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-start md:justify-center min-h-0">
        {/* Fragmented Subscriptions Visual */}
        <div className="mb-6 md:mb-8">
          <div className="text-center mb-4 md:mb-5 slide-enter" style={{ animationDelay: '0.15s', opacity: 0, animationFillMode: 'forwards' }}>
            <p className="text-xs md:text-sm text-black/40 font-light uppercase tracking-[0.15em] mb-2">3-5 Separate Subscriptions</p>
            <div className="w-24 h-px bg-black/10 mx-auto"></div>
          </div>
          <div className="relative flex flex-wrap justify-center gap-3 md:gap-4">
              {[
                { name: 'ChatGPT', price: '$20', disconnected: true },
                { name: 'Quizlet', price: '$15', disconnected: true },
                { name: 'Planner', price: '$12', disconnected: true },
                { name: 'CourseHero', price: '$18', disconnected: true },
              ].map((tool, index) => (
              <div
                key={index}
                className="relative slide-enter group z-10"
                style={{ 
                  animationDelay: `${0.2 + index * 0.1}s`, 
                  opacity: 0, 
                  animationFillMode: 'forwards',
                }}
              >
                <div className="bg-white border border-black/8 rounded-3xl p-3 sm:p-4 md:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1">
                  <div className="text-sm md:text-base font-light text-black/50 mb-1.5 uppercase tracking-wider">{tool.name}</div>
                  <div className="text-2xl md:text-3xl font-light text-black tracking-tight">{tool.price}</div>
                  <div className="text-xs text-black/30 font-light mt-1">/month</div>
                </div>
                {/* Disconnected indicator - broken connection */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-black/20 flex items-center justify-center z-20">
                  <div className="w-1.5 h-1.5 bg-black/30 rounded-full"></div>
                </div>
                {/* Connecting line between cards - spans the gap */}
                {index < 3 && (
                  <div 
                    className="hidden md:block absolute top-1/2 left-full h-px bg-black/20 z-0 slide-enter w-3 md:w-4" 
                    style={{ 
                      animationDelay: `${0.3 + index * 0.1}s`, 
                      opacity: 0, 
                      animationFillMode: 'forwards'
                    }}
                  >
                    {/* Broken connection indicator in the middle */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white border border-black/10 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cost Accumulation */}
        <div className="mb-6 md:mb-8 text-center slide-enter" style={{ animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards' }}>
          <div className="inline-block relative">
            <div className="absolute -inset-3 bg-black/5 rounded-full blur-xl opacity-50"></div>
            <div className="relative">
              <div className="text-5xl sm:text-6xl md:text-7xl font-light text-black mb-2 tracking-tighter">50-60M</div>
              <div className="text-sm md:text-base text-black/50 font-light uppercase tracking-wider">students facing the same problem</div>
            </div>
          </div>
        </div>

        {/* Failure Loop */}
        <div className="slide-enter" style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}>
          <div className="text-center mb-4 md:mb-5">
            <p className="text-xs md:text-sm text-black/40 font-light uppercase tracking-[0.15em] mb-2">The Failure Loop</p>
            <div className="w-24 h-px bg-black/10 mx-auto"></div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3">
            {[
              { text: 'Poor Planning', color: 'bg-black/5 border-black/10' },
              { text: '→', color: 'text-black/25 text-2xl md:text-3xl font-light' },
              { text: 'Procrastination', color: 'bg-black/5 border-black/10' },
              { text: '→', color: 'text-black/25 text-2xl md:text-3xl font-light' },
              { text: 'Cramming', color: 'bg-black/5 border-black/10' },
              { text: '→', color: 'text-black/25 text-2xl md:text-3xl font-light' },
              { text: 'Lower Grades', color: 'bg-black/10 border-black/20' },
            ].map((item, index) => (
              <div
                key={index}
                className={`${item.color.includes('bg-') ? `${item.color} border rounded-2xl px-4 md:px-6 py-2.5 md:py-3 shadow-[0_4px_12px_rgba(0,0,0,0.04)]` : ''} ${item.color.includes('text-') ? item.color : 'text-black'} font-light text-sm md:text-base transition-all duration-300 hover:scale-105`}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
