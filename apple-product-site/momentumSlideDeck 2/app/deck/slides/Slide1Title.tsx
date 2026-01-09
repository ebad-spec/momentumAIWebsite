import TitleSlideLayout from '../components/TitleSlideLayout'
import TypewriterTitle from '../components/TypewriterTitle'
import Image from 'next/image'

export default function Slide1Title() {
  return (
    <TitleSlideLayout
      title={
        <TypewriterTitle
          text="Momentum AI"
          duration={2200}
          className="font-poppins font-semibold"
        />
      }
      subtitle="Your agentic AI platform that turns chaotic semesters into a guided system, helping students plan, study, and succeed from day one instead of scrambling after they fall behind."
      logo={
        <div className="mb-12">
          <Image
            src="/logo.png"
            alt="Momentum Logo"
            width={200}
            height={200}
            className="object-contain"
            priority
          />
        </div>
      }
    >
      <div className="text-base text-black/50 space-y-2 font-light">
        <p>Ebad Khan | Co-founder & CEO</p>
        <p>ebad@mntm.ca</p>
      </div>
    </TitleSlideLayout>
  )
}
