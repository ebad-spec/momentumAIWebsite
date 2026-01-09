'use client'

import Image from 'next/image'

const BASE_PATH = '/deck'

const screenshots = [
  { src: `${BASE_PATH}/student-feedback-1.png`, colSpan: 2 },
  { src: `${BASE_PATH}/student-feedback-2.png`, colSpan: 2 },
  { src: `${BASE_PATH}/student-feedback-3.png`, colSpan: 1 },
  { src: `${BASE_PATH}/student-feedback-4.png`, colSpan: 1 },
  { src: `${BASE_PATH}/student-feedback-5.png`, colSpan: 1 },
  { src: `${BASE_PATH}/student-feedback-6.png`, colSpan: 1 },
  { src: `${BASE_PATH}/student-feedback-7.png`, colSpan: 1 },
  { src: `${BASE_PATH}/student-feedback-8.png`, colSpan: 1 },
  { src: `${BASE_PATH}/student-feedback-9.png`, colSpan: 1 },
  { src: `${BASE_PATH}/student-feedback-10.png`, colSpan: 1 },
  { src: `${BASE_PATH}/student-feedback-11.png`, colSpan: 1 },
  { src: `${BASE_PATH}/student-feedback-12.png`, colSpan: 1 },
  { src: `${BASE_PATH}/student-feedback-13.png`, colSpan: 1 },
  { src: `${BASE_PATH}/student-feedback-14.png`, colSpan: 1 },
]

export default function Slide17StudentDemand() {
  return (
    <div className="h-full flex flex-col px-12 md:px-20 pt-12 md:pt-16 pb-8 bg-white/0 relative z-10">
      {/* Header */}
      <div className="mb-3 md:mb-4 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-4xl md:text-5xl font-light text-black tracking-tight mb-2">Students Are Asking for This</h2>
        <p className="text-lg md:text-xl text-black/40 font-light leading-snug tracking-tight max-w-4xl">
          Real feedback from students frustrated with ChatGPT, CourseHero, Quizlet, and other fragmented tools. They want one unified platform that actually works.
        </p>
        <div className="w-16 h-1 bg-black/10 rounded-full mt-3 underline-reveal"></div>
      </div>

      {/* Screenshots Grid - Apple-inspired clean layout */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden items-center justify-center w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 md:gap-1 w-full max-w-6xl">
          {screenshots.map((screenshot, index) => {
            const isTop = index < 2

            return (
            <div
              key={index}
              className={`relative rounded-lg overflow-hidden bg-white/90 backdrop-blur-sm border border-black/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] scale-enter transition-all duration-500 ease-out group flex flex-col ${
                screenshot.colSpan === 2 ? 'col-span-2 md:col-span-2' : ''
              }`}
              style={{ 
                animationDelay: `${0.15 + index * 0.06}s`, 
                opacity: 0, 
                animationFillMode: 'forwards',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                // Keep everything within slide margins: top row is larger, the rest are shorter.
                // Using clamp() makes this responsive across common deck resolutions.
                height: isTop ? 'clamp(165px, 19vh, 230px)' : 'clamp(102px, 12vh, 145px)'
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-white to-white/95 p-0.5 md:p-1">
                <div className="relative w-full h-full rounded-md overflow-hidden bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={screenshot.src}
                    alt={`Student feedback ${index + 1}`}
                    className="object-contain w-full h-full"
                    style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            )
          })}
        </div>
        
        {/* Credibility Footer */}
        <div className="mt-2 md:mt-3 text-center">
          <p className="text-xs md:text-sm text-black/30 font-light tracking-tight">
            Representative examples from r/college, r/GetStudying, r/Anki, r/GradSchool (millions of monthly student users).
          </p>
        </div>
      </div>
    </div>
  )
}
