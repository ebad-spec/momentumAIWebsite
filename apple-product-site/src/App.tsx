import { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import BetaSignup from './components/BetaSignup';
import CareersPage from './components/CareersPage';
import TeamPage from './components/TeamPage';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function HomePage() {
  return (
    <>
      {/* Hero Section - ChatGPT style */}
      <section className="pt-32 pb-20 bg-white min-h-screen flex items-center relative">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <div className="mb-12">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              Study smarter.
              <br />
              <span className="text-red-500" style={{ color: '#ff0040' }}>Never fall behind.</span>
            </h1>
            <div className="max-w-2xl mx-auto mb-10">
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light">
                Your AI-powered study assistant.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/beta">
                <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg">
                  Join our Beta →
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Carousel peeking into hero section */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/3">
          <div className="w-full">
            <div className="overflow-hidden relative">
              <div className="flex animate-scroll hover:pause-animation whitespace-nowrap">
                {/* First set of cards */}
                {[
                  {
                    title: "Quiz me on Chapter 3 of my biology notes",
                    icon: "📚",
                  },
                  {
                    title: "Make a study plan for my finals",
                    icon: "🧪",
                  },
                  {
                    title: "Explain photosynthesis in simple terms",
                    icon: "🎤",
                  },
                  {
                    title: "Add my exam dates to my calendar",
                    icon: "📅",
                  },
                  {
                    title: "Generate practice questions for calculus",
                    icon: "📝",
                  },
                  {
                    title: "Help me review with spaced repetition",
                    icon: "🔁",
                  },
                  {
                    title: "Remind me about my assignment deadlines",
                    icon: "⏰",
                  },
                  {
                    title: "Give me feedback on my practice test",
                    icon: "✅",
                  },
                ].map((card, index) => (
                  <div key={index} className="inline-block mx-2 bg-white hover:bg-gray-50 p-5 rounded-xl transition-all cursor-pointer hover:shadow-xl border border-gray-200 hover:border-gray-300 min-w-[280px] whitespace-normal shadow-lg">
                    <div className="text-xl mb-2">{card.icon}</div>
                    <p className="text-gray-700 font-medium text-sm">{card.title}</p>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {[
                  {
                    title: "Quiz me on Chapter 3 of my biology notes",
                    icon: "📚",
                  },
                  {
                    title: "Make a study plan for my finals",
                    icon: "🧪",
                  },
                  {
                    title: "Explain photosynthesis in simple terms",
                    icon: "🎤",
                  },
                  {
                    title: "Add my exam dates to my calendar",
                    icon: "📅",
                  },
                  {
                    title: "Generate practice questions for calculus",
                    icon: "📝",
                  },
                  {
                    title: "Help me review with spaced repetition",
                    icon: "🔁",
                  },
                  {
                    title: "Remind me about my assignment deadlines",
                    icon: "⏰",
                  },
                  {
                    title: "Give me feedback on my practice test",
                    icon: "✅",
                  },
                ].map((card, index) => (
                  <div key={`duplicate-${index}`} className="inline-block mx-2 bg-white hover:bg-gray-50 p-5 rounded-xl transition-all cursor-pointer hover:shadow-xl border border-gray-200 hover:border-gray-300 min-w-[280px] whitespace-normal shadow-lg">
                    <div className="text-xl mb-2">{card.icon}</div>
                    <p className="text-gray-700 font-medium text-sm">{card.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Feature Cards - Also Scrolling Carousel */}
      <section className="py-8 bg-white mt-10">
        <div className="w-full">
          <div className="overflow-hidden relative">
            <div className="flex animate-scroll hover:pause-animation whitespace-nowrap" style={{animationDirection: 'reverse'}}>
              {/* First set of cards */}
              {[
                {
                  title: "Create flashcards from my organic chemistry textbook",
                  icon: "📄",
                },
                {
                  title: "Set up reminders for my midterm exams next week",
                  icon: "🔔",
                },
                {
                  title: "I want a friendly tutor persona for my math help",
                  icon: "🧑‍🏫",
                },
                {
                  title: "Move my biology study session to Friday",
                  icon: "💬",
                },
                {
                  title: "Find YouTube videos about cellular respiration",
                  icon: "🎥",
                },
                {
                  title: "Show me how I'm doing with my study goals",
                  icon: "📈",
                },
                {
                  title: "Make a practice test for my psychology final",
                  icon: "📝",
                },
                {
                  title: "Quiz me on the flashcards I made yesterday",
                  icon: "🃏",
                },
              ].map((card, index) => (
                <div key={index} className="inline-block mx-2 bg-gray-50 hover:bg-gray-100 p-5 rounded-xl transition-all cursor-pointer hover:shadow-lg border border-gray-200 hover:border-gray-300 min-w-[280px] whitespace-normal">
                  <div className="text-xl mb-2">{card.icon}</div>
                  <p className="text-gray-700 font-medium text-sm">{card.title}</p>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                {
                  title: "Create flashcards from my organic chemistry textbook",
                  icon: "📄",
                },
                {
                  title: "Set up reminders for my midterm exams next week",
                  icon: "🔔",
                },
                {
                  title: "I want a friendly tutor persona for my math help",
                  icon: "🧑‍🏫",
                },
                {
                  title: "Move my biology study session to Friday",
                  icon: "💬",
                },
                {
                  title: "Find YouTube videos about cellular respiration",
                  icon: "🎥",
                },
                {
                  title: "Show me how I'm doing with my study goals",
                  icon: "📈",
                },
                {
                  title: "Make a practice test for my psychology final",
                  icon: "📝",
                },
                {
                  title: "Quiz me on the flashcards I made yesterday",
                  icon: "🃏",
                },
              ].map((card, index) => (
                <div key={`duplicate-${index}`} className="inline-block mx-2 bg-gray-50 hover:bg-gray-100 p-5 rounded-xl transition-all cursor-pointer hover:shadow-lg border border-gray-200 hover:border-gray-300 min-w-[280px] whitespace-normal">
                  <div className="text-xl mb-2">{card.icon}</div>
                  <p className="text-gray-700 font-medium text-sm">{card.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
            All-in-one study app
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Flashcards, exams, and voice tutoring—everything you need to stay ahead.
          </p>
          <div className="mb-12">
            <a href="#" className="text-gray-600 hover:text-red-500 transition-colors font-medium text-sm">
              See how it works →
            </a>
          </div>
          <div className="flex justify-center mb-12">
            <div className="relative max-w-7xl w-full">
              {/* Background image */}
              <img 
                src="/backgroundmomentum.png" 
                alt="Product showcase background" 
                className="w-full h-auto rounded-xl hover-lift border border-gray-200"
              />
              {/* Screenshot image positioned inside */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <img 
                  src="/mainapp.png" 
                  alt="App screenshot" 
                  className="max-w-[95%] max-h-[95%] object-contain rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Capabilities */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Smarter plans. Better results.
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Upload your syllabus and get a personalized, day-by-day study plan.
          </p>
          <div className="flex justify-center mb-12">
            <div className="relative max-w-7xl w-full">
              {/* Background image */}
              <img 
                src="/backgroundmomentum.png" 
                alt="Product showcase background" 
                className="w-full h-auto rounded-xl hover-lift border border-gray-200"
              />
              {/* Screenshot image positioned inside */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <img 
                  src="/Smarter plans.png" 
                  alt="Smarter plans screenshot" 
                  className="max-w-[95%] max-h-[95%] object-contain rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Generation Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Exams. Flashcards. Voice help.
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Practice, review, and get instant feedback—all in one place.
          </p>
          <div className="flex justify-center mb-12">
            <div className="relative max-w-7xl w-full">
              {/* Background image */}
              <img 
                src="/backgroundmomentum.png" 
                alt="Product showcase background" 
                className="w-full h-auto rounded-xl hover-lift border border-gray-200"
              />
              {/* Screenshot image positioned inside */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <img 
                  src="/exam.png" 
                  alt="Exams and flashcards screenshot" 
                  className="max-w-[95%] max-h-[95%] object-contain rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Built for students.
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Designed to help you learn faster and remember more.
          </p>
          <div className="flex justify-center mb-12">
            <div className="relative max-w-7xl w-full">
              {/* Background image */}
              <img 
                src="/backgroundmomentum.png" 
                alt="Product showcase background" 
                className="w-full h-auto rounded-xl hover-lift border border-gray-200"
              />
              {/* Screenshot image positioned inside */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <img 
                  src="/flashies.png" 
                  alt="Built for students screenshot" 
                  className="max-w-[95%] max-h-[95%] object-contain rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Core features
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to stay ahead, built for students.
            </p>
          </div>
          
          <div className="space-y-24">
            {/* Files Upload */}
            <div id="file-upload" className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">File Upload & Processing</h3>
                <p className="text-lg text-gray-600 mb-6">Upload up to 3,000+ pages of PDFs, documents, and study materials. AI instantly processes and organizes your content for optimal learning.</p>
              </div>
              <div className="flex justify-center">
                <div className="relative max-w-lg w-full h-80 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-8 flex items-center justify-center shadow-2xl">
                  <img 
                    src="/Files.png" 
                    alt="File upload and processing interface" 
                    className="max-w-[90%] max-h-[90%] object-contain rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Voice AI Tutor */}
            <div id="voice-ai" className="grid md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Voice AI Tutor</h3>
                <p className="text-lg text-gray-600 mb-6">Talk to your AI tutor for instant, human-like explanations and support.</p>
              </div>
              <div className="flex justify-center md:order-1">
                <div className="relative max-w-lg w-full h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl p-8 flex items-center justify-center shadow-2xl">
                  <img 
                    src="/VoiceAI.png" 
                    alt="Voice AI Tutor interface" 
                    className="max-w-[90%] max-h-[90%] object-contain rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Agentic Chatbot */}
            <div id="agentic-chatbot" className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Agentic Chatbot</h3>
                <p className="text-lg text-gray-600 mb-6">Ask questions, edit your study plan, and get help with any topic—by chat or voice.</p>
              </div>
              <div className="flex justify-center">
                <div className="relative max-w-lg w-full h-80 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-8 flex items-center justify-center shadow-2xl">
                  <img 
                    src="/agentic.png" 
                    alt="Agentic Chatbot interface" 
                    className="max-w-[90%] max-h-[90%] object-contain rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Flashcards & Spaced Repetition */}
            <div id="flashcards" className="grid md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">AI Flashcards & Spaced Repetition</h3>
                <p className="text-lg text-gray-600 mb-6">AI-generated flashcards from your materials, scheduled for maximum retention with smart spaced repetition.</p>
              </div>
              <div className="flex justify-center md:order-1">
                <div className="relative max-w-lg w-full h-80 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-2xl p-8 flex items-center justify-center shadow-2xl">
                  <img 
                    src="/flash.png" 
                    alt="AI Flashcards and Spaced Repetition interface" 
                    className="max-w-[90%] max-h-[90%] object-contain rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* MCAT & LSAT Modes */}
            <div id="exam-modes" className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">MCAT & LSAT Modes</h3>
                <p className="text-lg text-gray-600 mb-6">Access pre-loaded, expert-curated content for high-stakes exam prep with specialized study modes.</p>
              </div>
              <div className="flex justify-center">
                <div className="relative max-w-lg w-full h-80 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-2xl p-8 flex items-center justify-center shadow-2xl">
                  <div className="bg-white rounded-2xl py-8 px-5 w-full max-w-72 shadow-lg">
                    <div className="space-y-6">
                      {/* Header with Drag & Drop - Selected */}
                      <div className="bg-gray-100 rounded-xl px-4 py-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">📋</span>
                            <span className="text-lg font-semibold text-gray-800">Drag & Drop</span>
                          </div>
                          <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* MCAT Mode */}
                      <div className="flex items-center space-x-3 px-4">
                        <span className="text-lg">🩺</span>
                        <span className="text-lg font-medium text-gray-700">MCAT Mode</span>
                      </div>
                      
                      {/* LSAT Mode */}
                      <div className="flex items-center space-x-3 px-4">
                        <span className="text-lg">⚖️</span>
                        <span className="text-lg font-medium text-gray-700">LSAT Mode</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-5 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Plans
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Simple, student-friendly pricing for every need.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                period: "/ month",
                description: "Unlimited chat & flashcards. 50 pages upload.",
                features: [
                  "Chat & flashcards",
                  "50 pages upload",
                  "Study plans",
                  "Voice tutor (basic)"
                ]
              },
              {
                name: "Standard",
                price: "$6.99",
                period: "/ month",
                description: "All tools. 500 pages. Advanced planning.",
                features: [
                  "All Free features",
                  "500 pages upload",
                  "Exam generator",
                  "Voice tutor (advanced)",
                  "Calendar sync"
                ],
                popular: true
              },
              {
                name: "Premium",
                price: "$12",
                period: "/ month",
                description: "MCAT/LSAT prep. 2,000 pages. Priority support.",
                features: [
                  "All Standard features",
                  "MCAT/LSAT prep",
                  "2,000 pages upload",
                  "Priority support"
                ]
              }
            ].map((plan, index) => (
              <div key={index} className={`border rounded-xl p-6 text-left ${plan.popular ? 'border-red-500 shadow-lg bg-gray-50' : 'border-gray-200 bg-white'}`}>
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1 text-sm">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">{plan.description}</p>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-red-500 mr-2 mt-0.5">✓</span>
                      <span className="text-gray-600 text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2 px-5 rounded-full font-medium transition-colors text-sm ${
                  plan.popular 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-red-500'
                }`}>
                  Get started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Try Momentum AI.
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start for free and see the difference.
          </p>
          <div className="flex justify-center">
            <Link to="/beta">
              <button className="bg-black text-white px-8 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition-all transform hover:scale-105">
                Join our Beta →
              </button>
            </Link>
          </div>
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
    </>
  );
}

function Navigation() {
  const location = useLocation();
  const isTeamPage = location.pathname === '/team';
  const isDarkPage = location.pathname === '/team'; // Only team page uses dark styling
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) { // Adjust threshold as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      isDarkPage 
        ? (isScrolled ? 'bg-black/80 border-gray-800' : 'bg-black border-gray-800')
        : 'bg-white/80 border-gray-100'
    }`}>
      <div className="max-w-5xl mx-auto px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <div className="w-8 h-8 rounded-md flex items-center justify-center overflow-hidden">
                <img 
                  src={isDarkPage ? "/momentumDarkmode-removebg-preview.png" : "/medbotlogonew.jpg"} 
                  alt="Momentum AI Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </Link>
            <span className={`text-base font-logo font-semibold tracking-tight ${
              isDarkPage ? 'text-white' : 'text-gray-900'
            }`}>Momentum AI</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <Link to="/" className={`transition-colors text-xs font-medium flex items-center ${
                isDarkPage 
                  ? 'text-gray-300 hover:text-red-400' 
                  : 'text-gray-600 hover:text-red-500'
              }`}>
                Features
                <svg className="w-3 h-3 ml-1 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className={`absolute top-full left-0 mt-2 w-56 rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${
                isDarkPage 
                  ? 'bg-black border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="py-2">
                  <Link to="/#file-upload" className={`block px-4 py-2 text-xs transition-colors ${
                    isDarkPage 
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-red-400' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
                  }`}>
                    File Upload & Processing
                  </Link>
                  <Link to="/#voice-ai" className={`block px-4 py-2 text-xs transition-colors ${
                    isDarkPage 
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-red-400' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
                  }`}>
                    Voice AI Tutor
                  </Link>
                  <Link to="/#agentic-chatbot" className={`block px-4 py-2 text-xs transition-colors ${
                    isDarkPage 
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-red-400' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
                  }`}>
                    Agentic Chatbot
                  </Link>
                  <Link to="/#flashcards" className={`block px-4 py-2 text-xs transition-colors ${
                    isDarkPage 
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-red-400' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
                  }`}>
                    AI Flashcards & Spaced Repetition
                  </Link>
                  <Link to="/#exam-modes" className={`block px-4 py-2 text-xs transition-colors ${
                    isDarkPage 
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-red-400' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
                  }`}>
                    MCAT & LSAT Modes
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/team" className={`transition-colors text-xs font-medium ${
              isDarkPage 
                ? 'text-gray-300 hover:text-red-400' 
                : 'text-gray-600 hover:text-red-500'
            }`}>
              Our Team
            </Link>
            <Link to="/#pricing" className={`transition-colors text-xs font-medium ${
              isDarkPage 
                ? 'text-gray-300 hover:text-red-400' 
                : 'text-gray-600 hover:text-red-500'
            }`}>
              Plans & Pricing
            </Link>
            <Link to="/careers" className={`transition-colors text-xs font-medium ${
              isDarkPage 
                ? 'text-gray-300 hover:text-red-400' 
                : 'text-gray-600 hover:text-red-500'
            }`}>
              Careers
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <button className={`transition-colors text-xs font-medium ${
              isDarkPage 
                ? 'text-gray-300 hover:text-red-400' 
                : 'text-gray-600 hover:text-red-500'
            }`}>
              Log in
            </button>
            <button className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              isDarkPage 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function AppContent() {
  // Initialize smooth scrolling with inertia
  useSmoothScroll();

  const location = useLocation();

  // Handle hash navigation when location changes
  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="App bg-white min-h-screen">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/beta" element={<BetaSignup />} />
        <Route path="/careers" element={<CareersPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
