import Image from 'next/image'

interface TeamMember {
  name: string
  role: string
  image: string
}

const foundingTeam: TeamMember[] = [
  { name: 'Ebad Khan', role: 'Co-founder & CEO', image: '/Ebad.jpeg' },
  { name: 'Subquat Siddiqui', role: 'Co-founder & CTO', image: '/subquat.jpeg' },
  { name: 'Arhum Mahmood', role: 'Product Manager', image: '/arhum.jpeg' },
  { name: 'Tulika Basu', role: 'Internal Operations Intern', image: '/tulika.jpeg' },
]

export default function Slide12FoundingTeam() {
  return (
    <div className="h-full flex flex-col px-12 md:px-20 pt-12 md:pt-16 pb-40 bg-white/0 relative z-10">
      <div className="mb-8 md:mb-10 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-5xl md:text-6xl font-light text-black tracking-tight mb-3">Founding Team</h2>
        <p className="text-xl md:text-2xl text-black/40 font-light leading-snug tracking-tight max-w-4xl">
          Why investors care: Pre-seed = bet on founders. Execution &gt; credentials.
        </p>
        <div className="w-16 h-1 bg-black/10 rounded-full mt-4 underline-reveal"></div>
      </div>
      
      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-start justify-items-center">
        {foundingTeam.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center slide-enter max-w-xs"
            style={{ 
              animationDelay: `${0.2 + index * 0.1}s`, 
              opacity: 0, 
              animationFillMode: 'forwards',
              willChange: 'transform',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="relative mb-5 w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:scale-105">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 160px, 192px"
              />
            </div>
            <h3 className="text-xl md:text-2xl font-light text-black tracking-tight mb-2">{member.name}</h3>
            <p className="text-base md:text-lg text-black/50 font-light leading-relaxed tracking-tight">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

