import React, { useState } from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
}

const TeamPage: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Sample team data - reduced to 7 members
  const teamMembers: TeamMember[] = [
    {
      id: 2,
      name: "Subquat Siddiqui",
      role: "Co-Founder & CTO",
      image: "/subquat.jpeg",
      bio: "Technical architect building scalable AI systems",
      linkedin: "https://www.linkedin.com/in/subquat-siddiqui/"
    },
    {
      id: 1,
      name: "Ebad Khan",
      role: "Co-Founder & CEO",
      image: "/Ebad.jpg",
      bio: "Visionary leader driving AI innovation in education",
      linkedin: "https://www.linkedin.com/in/ebadkhxn/"
    },
    {
      id: 3,
      name: "Arhum Mahmood",
      role: "Project Manager Intern",
      image: "/arhum.jpeg",
      bio: "Leading development of core AI learning platform",
      linkedin: "https://www.linkedin.com/in/arhum-mahmood-082282258/"
    },
    {
      id: 5,
      name: "Momina Hassan",
      role: "Software Engineer Intern",
      image: "/momina.jpeg",
      bio: "Shaping the future of AI-powered education",
      linkedin: "https://www.linkedin.com/in/mominahassan/"
    },
    {
      id: 7,
      name: "Tulika Basu",
      role: "Internal Operations Intern",
      image: "/tulika.jpeg",
      bio: "Creating intuitive user experiences for learning",
      linkedin: "#" // No LinkedIn provided for Tulika
    },
    {
      id: 6,
      name: "Syed Kaab Surkhi",
      role: "Full Stack Engineer Intern",
      image: "/syed.jpeg",
      bio: "Developing cutting-edge machine learning algorithms",
      linkedin: "https://www.linkedin.com/in/syed-kaab-surkhi/"
    },
    {
      id: 4,
      name: "Abakar Kosso",
      role: "Full Stack Engineer Intern",
      image: "/abaker.jpeg",
      bio: "Analyzing learning patterns to optimize student outcomes",
      linkedin: "https://www.linkedin.com/in/abakarkosso/"
    }
  ];

  // Duplicate the array for seamless infinite scroll
  const duplicatedMembers = [...teamMembers, ...teamMembers];

  // Array of random tilt angles for each card - made more subtle
  const tiltAngles = [3, -2, 4, -3.5, 2.5, -4, 1.5, 3.5, -1.5, 3, -2.5, 2, -3, 3];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="pt-24 pb-10 text-center">
        <h1 className="text-3xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
          Meet the Team
        </h1>
        <p className="text-base text-gray-300 max-w-2xl mx-auto px-5">
          The brilliant minds behind Momentum AI, working together to revolutionize how students learn.
        </p>
      </div>

      {/* Auto-scrolling slider */}
      <div className="relative overflow-hidden py-8">
        {/* Left fade */}
        <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        
        {/* Right fade */}
        <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex animate-scroll-smooth">
          {duplicatedMembers.map((member, index) => (
            <div
              key={`${member.id}-${Math.floor(index / teamMembers.length)}`}
              className="flex-shrink-0 mx-6 transition-all duration-300 ease-out"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <a 
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative cursor-pointer block"
              >
                <div 
                  className={`w-[420px] h-[420px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-out group-hover:shadow-3xl group-hover:scale-110 ${
                    hoveredIndex === index ? 'rotate-0' : ''
                  }`}
                  style={{
                    transform: hoveredIndex === index 
                      ? 'rotate(0deg) scale(1.1)' 
                      : `rotate(${tiltAngles[index % tiltAngles.length]}deg)`
                  }}
                >
                  {/* Team member image */}
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Name appears at the bottom left on hover */}
                <div className={`text-left mt-6 transition-all duration-500 ease-out ${
                  hoveredIndex === index ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
                }`}>
                  <h3 className="text-3xl lg:text-4xl font-semibold text-white mb-1 tracking-tight leading-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif', fontWeight: 600 }}>
                    {member.name}
                  </h3>
                  <p className="text-white text-base font-medium tracking-wide opacity-90" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif' }}>
                    {member.role}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Our Research</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-xs">Research Index</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-xs">Research Overview</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-xs">Research Residency</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Momentum AI</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-xs">Explore Momentum AI</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-xs">Team</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-xs">Enterprise</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-xs">Education</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-xs">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">For Business</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-xs">Business Overview</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-xs">Solutions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-xs">Contact Sales</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Terms & Policies</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-xs">Terms of Use</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-xs">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-xs">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors text-xs">Other Policies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 text-center">
            <p className="text-gray-400 text-xs">© 2024 Momentum AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TeamPage; 