import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white bg-subtle-pattern">
      <div className="text-center relative z-10 scale-enter">
        <h1 className="text-7xl md:text-[10rem] font-light mb-8 text-black tracking-tighter leading-none">Momentum</h1>
        <p className="text-xl md:text-2xl text-black/40 mb-16 font-light tracking-tight max-w-2xl mx-auto">
          The AI operating system for student success.
        </p>
        <Link
          href="/deck"
          className="inline-block px-12 py-5 bg-black hover:bg-black/90 rounded-full text-lg font-light text-white transition-all shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95"
        >
          View Pitch Deck →
        </Link>
      </div>
    </main>
  )
}

