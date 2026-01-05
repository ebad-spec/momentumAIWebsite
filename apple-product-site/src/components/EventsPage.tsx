import React, { useCallback, useEffect, useRef, useState } from 'react';

interface Event {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
}

const WORDS = ['innovators.', 'leaders.', 'thinkers.', 'creators.', 'visionaries.', 'builders.'];
const WORD_SEQUENCE = [...WORDS, WORDS[0]];
const WORD_INTERVAL = 3000;
const WORD_ANIMATION_DURATION = 500;
const WORD_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

const EventsPage: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [nextWordIndex, setNextWordIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);

    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      setCurrentWordIndex((prev) => {
        const newCurrent = (prev + 1) % WORDS.length;
        setNextWordIndex((newCurrent + 1) % WORDS.length);
        return newCurrent;
      });
    }, WORD_ANIMATION_DURATION);
  }, []);

  useEffect(() => {
    startAnimation();
    intervalRef.current = setInterval(startAnimation, WORD_INTERVAL);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [startAnimation]);

  // Mindhack recap slider data
  const events: Event[] = [
    {
      id: 1,
      title: "Mindhack 2025",
      description: "Sharpie pledges from every builder hitting the Mindhack floor.",
      image: "/IMG_5610.jpg",
      date: "Mindhack 2025",
      category: "Mindhack"
    },
    {
      id: 2,
      title: "Mindhack 2025",
      description: "Arcade founders breaking down what great agents look like.",
      image: "/IMG_5609.jpg",
      date: "Mindhack 2025",
      category: "Mindhack"
    },
    {
      id: 3,
      title: "Mindhack 2025",
      description: "Students pairing up to ship copilots and ops agents.",
      image: "/IMG_5608.jpg",
      date: "Mindhack 2025",
      category: "Mindhack"
    },
    {
      id: 4,
      title: "Mindhack 2025",
      description: "Teams pressure-testing their agents with founders.",
      image: "/IMG_5607.jpg",
      date: "Mindhack 2025",
      category: "Mindhack"
    },
    {
      id: 5,
      title: "Mindhack 2025",
      description: "Momentum crew keeping snacks, mentors, and energy flowing.",
      image: "/IMG_5606.jpg",
      date: "Mindhack 2025",
      category: "Mindhack"
    },
    {
      id: 6,
      title: "Mindhack 2025",
      description: "100+ student builders cheering on the final demos.",
      image: "/IMG_5605.jpg",
      date: "Mindhack 2025",
      category: "Mindhack"
    },
    {
      id: 7,
      title: "Mindhack 2025",
      description: "Mindhack branding lighting up the theatre entrance.",
      image: "/post-mntm.ai-sep-15-2025-1.jpeg",
      date: "Mindhack 2025",
      category: "Mindhack"
    },
    {
      id: 8,
      title: "Mindhack 2025",
      description: "Teams captured between mentor rounds.",
      image: "/post-mntm.ai-sep-15-2025-2.jpeg",
      date: "Mindhack 2025",
      category: "Mindhack"
    },
    {
      id: 9,
      title: "Mindhack 2025",
      description: "Momentum team documenting every milestone.",
      image: "/post-mntm.ai-sep-15-2025-3.jpeg",
      date: "Mindhack 2025",
      category: "Mindhack"
    },
    {
      id: 10,
      title: "Mindhack 2025",
      description: "Moments after the final announcements hit.",
      image: "/post-mntm.ai-sep-15-2025-4.jpeg",
      date: "Mindhack 2025",
      category: "Mindhack"
    },
    {
      id: 11,
      title: "Mindhack 2025",
      description: "Breakout pods lined the LINC glass corridors.",
      image: "/post-mntm.ai-sep-15-2025.jpeg",
      date: "Mindhack 2025",
      category: "Mindhack"
    },
    {
      id: 12,
      title: "Mindhack 2025",
      description: "Full programming board for the weekend.",
      image: "/Screenshot%202025-11-26%20at%202.30.37%E2%80%AFAM.png",
      date: "Mindhack 2025",
      category: "Mindhack"
    }
  ];

  // Duplicate the array for seamless infinite scroll
  const duplicatedEvents = [...events, ...events];
  const tiltAngles = [3, -2, 4, -3.5, 2.5, -4, 1.5, 3.5, -1.5, 3, -2.5, 2, -3, 3];

  return (
    <div className="relative min-h-screen bg-white">
      <div className="min-h-screen bg-white">
      {/* Hero Section with Animated Text */}
      <div className="pt-32 pb-10 px-5">
        <div className="max-w-5xl mx-auto text-left">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
            Building a community of{' '}
            <br />
            <span className="relative inline-block">
              <span 
                className="text-red-500" 
                style={{ 
                  color: '#ff0040',
                  position: 'relative',
                  top: '0.05em'
                }}
              >
                student{' '}
                <span
                  className="relative inline-flex overflow-hidden align-baseline"
                  style={{ 
                    height: '1.2em',
                    minWidth: '400px',
                    verticalAlign: 'text-bottom',
                    lineHeight: 1
                  }}
                >
                  <span
                    className="absolute inset-x-0 top-0 inline-flex items-center whitespace-nowrap"
                    style={{
                      height: '1.2em',
                      transform: isAnimating ? 'translateY(-100%)' : 'translateY(0)',
                      transition: isAnimating ? `transform ${WORD_ANIMATION_DURATION}ms ${WORD_EASING}` : 'none'
                    }}
                  >
                    {WORDS[currentWordIndex]}
                  </span>
                  <span
                    className="absolute inset-x-0 top-0 inline-flex items-center whitespace-nowrap"
                    style={{
                      height: '1.2em',
                      transform: isAnimating ? 'translateY(0)' : 'translateY(100%)',
                      transition: isAnimating ? `transform ${WORD_ANIMATION_DURATION}ms ${WORD_EASING}` : 'none'
                    }}
                  >
                    {WORDS[nextWordIndex]}
                  </span>
                </span>
              </span>
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light max-w-3xl">
            Join our events to connect, learn, and grow. From workshops to networking sessions, 
            we're here to support your academic journey and career aspirations.
          </p>
          <a
            href="https://www.instagram.com/mntm.ai/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center mt-8 bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
          >
            Stay Connected →
          </a>
        </div>
      </div>

      {/* Events Slider Section */}
      <section className="py-16 bg-white">
        {/* Auto-scrolling slider */}
        <div className="relative overflow-hidden py-8">
          {/* Left fade */}
          <div className="absolute left-0 top-0 w-8 md:w-16 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          
          {/* Right fade */}
          <div className="absolute right-0 top-0 w-8 md:w-16 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex animate-scroll-smooth">
            {duplicatedEvents.map((event, index) => (
              <div
                key={`${event.id}-${Math.floor(index / events.length)}`}
                className="flex-shrink-0 mx-6 transition-all duration-300 ease-out"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div 
                  className={`w-[420px] h-[420px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-out ${
                    hoveredIndex === index ? 'scale-105 rotate-0 shadow-3xl' : ''
                  }`}
                  style={{
                    transform: hoveredIndex === index 
                      ? 'scale(1.05) rotate(0deg)' 
                      : `rotate(${tiltAngles[index % tiltAngles.length]}deg)`
                  }}
                >
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    style={{
                      transform: hoveredIndex === index ? 'scale(1.08)' : 'scale(1)'
                    }}
                  />
                </div>
                
                <div className={`text-left mt-6 transition-all duration-500 ease-out ${
                  hoveredIndex === index ? 'opacity-100 transform translate-y-0' : 'opacity-70 transform -translate-y-2'
                }`}>
                  <p className="text-sm uppercase tracking-[0.25em] text-gray-400 mb-1">{event.category}</p>
                  <h3 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-1 leading-tight">
                    {event.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MindHack Section */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-10 -right-32 w-[420px] h-[420px] bg-[#ffebf2] blur-[160px] rounded-full"></div>
          <div className="absolute bottom-0 -left-10 w-[320px] h-[320px] bg-[#f0e9ff] blur-[150px] rounded-full"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-5 text-gray-900">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-semibold text-[#ff0040] tracking-[0.35em] uppercase">Introducing Mindhack 2025</p>
                <h2 className="text-4xl sm:text-5xl font-semibold leading-tight text-gray-900">
                  Build AI tools students actually need. Ship them in one weekend.
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Mindhack 2025 was run end-to-end by the Momentum AI team to help students prototype agents, copilots, and
                ops automations that solve student-life bottlenecks. Arcade, the San Francisco AI agent company, backed
                the experience so we could bring in 100+ builders, lightning mentors, and a few Silicon Valley eyes—but
                the story stayed Momentum: Canadian students shipping for students.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Attendees', value: '100+ builders' },
                  { label: 'Origin', value: 'Brock University' },
                  { label: 'Focus', value: 'AI that unlocks student momentum' },
                  { label: 'Career Wins', value: 'Direct Arcade interview invites' }
                ].map((item, idx) => (
                  <div key={idx} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.35em] text-gray-400 mb-1">{item.label}</p>
                    <p className="text-base font-semibold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-3xl bg-gray-50 border border-gray-200 p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-gray-500 mb-3">Why it mattered</p>
                <ul className="space-y-3 text-gray-700">
                  {[
                    'Teams shipped production-ready AI agents that solved real student bottlenecks.',
                    'Winning squads booked direct Arcade.dev interviews for experience and exposure.',
                    'Cash prizes and Momentum spotlight amplified the builders behind those launches.'
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-[#ff0040]">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="relative min-h-[660px] p-10 rounded-[40px] bg-gradient-to-b from-[#1b1326] via-[#0c0517] to-[#05010a] border border-white/10 shadow-[0_50px_110px_rgba(4,1,12,0.7)] overflow-hidden flex flex-col">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffffff0f,transparent_60%)]"></div>
                <div 
                  className="absolute inset-x-[-35%] bottom-[-45%] h-[135%] blur-[90px] opacity-95 mix-blend-screen"
                  style={{
                    background: 'linear-gradient(120deg,#ff2bdc 5%,#ff9f5c 35%,#ffd84f 50%,#8c5bff 70%,#2acbff 95%)'
                  }}
                ></div>
                <div 
                  className="absolute inset-x-[-15%] bottom-[-25%] h-[80%] blur-[70px] opacity-80"
                  style={{
                    background: 'linear-gradient(90deg,#ff6be4 0%,#f9ff7a 45%,#3f8fff 100%)'
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05010a]/30 to-[#05010a]"></div>
                <div className="relative flex-1 flex flex-col text-white">
                  <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/10 border border-white/30 text-xs uppercase tracking-[0.35em]">
                    Arcade Sponsor
                  </div>
                  <img 
                    src="/mindhack2025logoà.png" 
                    alt="Mindhack 2025 hero mark" 
                    className="w-full h-[320px] object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.6)]"
                  />
                  <div className="mt-10 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.4em] text-white/80">
                    <span className="px-4 py-2 bg-white/15 rounded-full">Hackathon Recap</span>
                    <span className="px-4 py-2 bg-white/15 rounded-full">Arcade × Momentum</span>
                    <span className="px-4 py-2 bg-white/15 rounded-full">Yearly Flagship</span>
                    <span className="px-4 py-2 bg-white/15 rounded-full">Momentum Ops Crew</span>
                  </div>
                  <div className="mt-8 rounded-3xl bg-black/35 border border-white/20 p-6 space-y-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/70">Inside the room</p>
                    <ul className="space-y-3 text-sm text-white/85">
                      {[
                        'Momentum AI crew ran every check-in, mentor lane, and midnight debugging pit.',
                        'Gradient timeline walls captured every milestone built over the 48-hour sprint.',
                        'Student product leads hosted sponsor drops, Arcade feedback rounds, and finals staging.'
                      ].map((item, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span>✶</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-white/60">
                      Momentum AI is already sketching Mindhack 2026—expect more student-built agents, same energy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Stay Connected
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Don't miss out on upcoming events. Join our community today.
          </p>
          <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg">
            Join Our Community →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">Our Research</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors text-xs">Research Index</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors text-xs">Research Overview</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors text-xs">Research Residency</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">Momentum AI</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors text-xs">Explore Momentum AI</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors text-xs">Team</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors text-xs">Enterprise</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors text-xs">Education</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors text-xs">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">For Business</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors text-xs">Business Overview</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors text-xs">Solutions</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors text-xs">Contact Sales</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">Terms & Policies</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors text-xs">Terms of Use</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors text-xs">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors text-xs">Security</a></li>
                <li><a href="#" className="text-gray-600 hover:text-red-500 transition-colors text-xs">Other Policies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-10 pt-6 text-center">
            <p className="text-gray-600 text-xs">© 2024 Momentum AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </div>
  );
};

export default EventsPage;

