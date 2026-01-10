'use client'

export default function Slide6ProductVideo() {
  return (
    <div className="h-full flex flex-col px-10 md:px-16 pt-12 md:pt-16 pb-28 bg-white/0 relative z-10">
      {/* Title */}
      <div className="mb-6 md:mb-8 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-4xl md:text-5xl font-light text-black tracking-tight mb-2">Product Demo</h2>
        <p className="text-lg md:text-xl text-black/40 font-light leading-snug tracking-tight max-w-3xl">
          A quick replay of Momentum turning full course content into a guided system.
        </p>
        <div className="w-16 h-1 bg-black/10 rounded-full mt-3 underline-reveal"></div>
      </div>

      {/* Video */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-5xl">
          <div className="relative rounded-[2rem] border border-black/10 bg-white/70 shadow-[0_24px_60px_rgba(0,0,0,0.08)] overflow-hidden">
            <video
              // Next.js basePath is `/deck`, so public assets must be referenced with the basePath prefix in production.
              src="/deck/Momentum.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              controls
            />
          </div>
        </div>
      </div>
    </div>
  )
}
