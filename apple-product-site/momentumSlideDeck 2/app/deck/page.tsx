'use client'

import type { TouchEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { slides, totalSlides } from './slideRegistry'

export default function DeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1))
  }, [])

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }, [])

  // Keyboard navigation (desktop)
  // Kept as window listener so it works regardless of focus.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  // Swipe navigation (mobile)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  const onTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return
    const t = e.touches[0]
    touchStartRef.current = { x: t.clientX, y: t.clientY }
  }, [])

  const onTouchEnd = useCallback((e: TouchEvent<HTMLDivElement>) => {
    const touchStart = touchStartRef.current
    if (!touchStart) return
    if (e.changedTouches.length < 1) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touchStart.x
    const dy = t.clientY - touchStart.y

    // Require a fairly clear horizontal swipe so vertical scrolling inside slides still works.
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)
    const isHorizontal = absDx > 55 && absDx > absDy * 1.35

    if (isHorizontal) {
      if (dx < 0) goNext()
      else goPrev()
    }

    touchStartRef.current = null
  }, [goNext, goPrev])

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <div
      className="w-screen overflow-hidden bg-white relative bg-subtle-pattern"
      style={{
        // iOS Safari: 100vh can include browser UI; 100dvh tracks the *visible* viewport.
        height: '100dvh',
        width: '100dvw',
      }}
    >
      {/* Slide Content */}
      <div
        className="h-full w-full relative z-0 overflow-y-auto md:overflow-hidden"
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div 
          key={currentSlide}
          className="w-full min-h-full md:h-full slide-enter"
        >
          <CurrentSlideComponent />
        </div>
      </div>

      {/* Mobile: swipe hint (first slide only) */}
      {currentSlide === 0 && (
        <div className="absolute inset-x-0 top-20 md:hidden pointer-events-none flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 backdrop-blur px-4 py-2 shadow-sm text-[12px] text-black/55 tracking-tight">
            <span className="text-black/35" aria-hidden="true">‹</span>
            <span className="font-light">Swipe</span>
            <span className="text-black/35" aria-hidden="true">›</span>
          </div>
        </div>
      )}
    </div>
  )
}

