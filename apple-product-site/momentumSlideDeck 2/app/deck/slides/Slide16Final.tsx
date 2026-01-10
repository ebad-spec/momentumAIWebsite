import TitleSlideLayout from '../components/TitleSlideLayout'
import Image from 'next/image'

export default function Slide16Final() {
  return (
    <TitleSlideLayout
      title="We're Building the Future"
      subtitle="The market is massive. The product works. The team executes. The question isn't if we'll succeed—it's whether you'll be part of it."
      logo={
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-black/5 rounded-full blur-xl"></div>
            <Image
              src="/logo.png"
              alt="Momentum Logo"
              width={120}
              height={120}
              className="relative object-contain opacity-90"
              priority
            />
          </div>
        </div>
      }
    >
      <div className="text-base md:text-lg text-black/60 space-y-6 font-light">
        <a 
          href="https://mntm.ca" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-3xl md:text-4xl text-black hover:text-black/70 transition-colors duration-300 underline-offset-4 hover:underline font-light"
        >
          mntm.ca
        </a>
        <div className="text-base text-black/50 space-y-2">
          <p className="font-light">Ebad Khan | Co-founder & CEO</p>
          <p className="font-light">ebad@mntm.ca</p>
        </div>
      </div>
    </TitleSlideLayout>
  )
}

