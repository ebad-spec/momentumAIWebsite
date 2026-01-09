'use client'

interface TypewriterTitleProps {
  text: string
  className?: string
  /** Animation duration in ms */
  duration?: number
}

export default function TypewriterTitle({
  text,
  className,
  duration = 2200,
}: TypewriterTitleProps) {
  return (
    <span className={['tw-smooth', className].filter(Boolean).join(' ')}>
      <span 
        className="tw-smooth__text"
        style={{ 
          '--tw-duration': `${duration}ms`
        } as React.CSSProperties}
      >
        {text}
      </span>
    </span>
  )
}
