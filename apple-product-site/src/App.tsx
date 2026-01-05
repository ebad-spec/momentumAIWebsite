import { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import BetaSignup from './components/BetaSignup';
import CareersPage from './components/CareersPage';
import EventsPage from './components/EventsPage';
import Login from './components/Login';
import Signup from './components/Signup';
import TeamPage from './components/TeamPage';
import { PRELOAD_IMAGE_URLS } from './config/preloadManifest';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { preloadImages } from './utils/preloadImages';

function HomePage() {
  return (
    <>
      {/* Hero Section - ChatGPT style */}
      <section className="pt-32 pb-20 bg-white min-h-screen flex items-center relative">
        {/* Backed by Brock LINC Badge */}
        <div className="absolute top-44 sm:top-48 md:top-48 lg:top-44 left-1/2 transform -translate-x-1/2 z-10">
          <div className="inline-flex items-center px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full">
            <img 
              src="/brock_linc_logo.jpeg" 
              alt="Brock LINC Logo" 
              className="w-4 h-4 mr-2 rounded-sm"
            />
            <span className="text-xs font-medium text-gray-700">Backed by Brock LINC</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-5 text-center">
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
            <a href="http://ec2-18-119-10-247.us-east-2.compute.amazonaws.com">
              <button className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg">
                Access our Beta →
              </button>
            </a>
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
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
                <img 
                  src="/mainapp.png" 
                  alt="App screenshot" 
                  className="max-w-[98%] max-h-[98%] sm:max-w-[96%] sm:max-h-[96%] md:max-w-[95%] md:max-h-[95%] object-contain rounded-xl shadow-lg"
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
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
                <img 
                  src="/Smarter plans.png" 
                  alt="Smarter plans screenshot" 
                  className="max-w-[98%] max-h-[98%] sm:max-w-[96%] sm:max-h-[96%] md:max-w-[95%] md:max-h-[95%] object-contain rounded-xl shadow-lg"
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
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
                <img 
                  src="/exam.png" 
                  alt="Exams and flashcards screenshot" 
                  className="max-w-[98%] max-h-[98%] sm:max-w-[96%] sm:max-h-[96%] md:max-w-[95%] md:max-h-[95%] object-contain rounded-xl shadow-lg"
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
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
                <img 
                  src="/flashies.png" 
                  alt="Built for students screenshot" 
                  className="max-w-[98%] max-h-[98%] sm:max-w-[96%] sm:max-h-[96%] md:max-w-[95%] md:max-h-[95%] object-contain rounded-xl shadow-lg"
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
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Standard",
                price: "$12.99",
                period: "/ month",
                description: "All core tools. 500 pages. Advanced LLMs.",
                features: {
                  "Agentic AI Chatbot": true,
                  "AI Flashcards": true,
                  "AI study plans": true,
                  "Exam generator": true,
                  "Voice tutor": true,
                  "50 pages upload": true,
                  "Gemini LLM access": true,
                  "Basic analytics": true,
                  "500+ pages upload": true,
                  "Advanced LLMs": true,
                  "MCAT & LSAT mode add-ons": true,
                  "Limited lecture recording": true,
                  "3000+ pages upload": false,
                  "Unlimited lecture recording": false
                },
                popular: true
              },
              {
                name: "Premium",
                price: "$29.99",
                period: "/ month",
                description: "Maximum power. 3,000 pages. All LLMs.",
                trial: "Includes 7-day free trial",
                features: {
                  "Agentic AI Chatbot": true,
                  "AI Flashcards": true,
                  "AI study plans": true,
                  "Exam generator": true,
                  "Voice tutor": true,
                  "50 pages upload": true,
                  "Gemini LLM access": true,
                  "Basic analytics": true,
                  "3000+ pages upload": true,
                  "Advanced LLMs": true,
                  "MCAT & LSAT mode add-ons": true,
                  "Limited lecture recording": true,
                  "Unlimited lecture recording": true
                }
              }
            ].map((plan, index) => (
              <div key={index} className={`border rounded-xl p-5 text-left h-full flex flex-col ${plan.popular ? 'border-red-500 shadow-lg bg-gray-50' : 'border-gray-200 bg-white'}`}>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1 text-xs">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mt-1.5 text-xs">{plan.description}</p>
                  {plan.trial && (
                    <p className="text-gray-500 mt-1 text-xs font-medium">{plan.trial}</p>
                  )}
                </div>
                <ul className="space-y-1.5 mb-5 flex-grow">
                  {Object.entries(plan.features).map(([feature, included], featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className={`mr-1.5 text-xs ${included ? 'text-red-500' : 'text-gray-400'}`}>
                        {included ? '✓' : '✗'}
                      </span>
                      <span className={`text-xs ${included ? 'text-gray-600' : 'text-gray-400'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="http://ec2-18-119-10-247.us-east-2.compute.amazonaws.com">
                  <button className={`w-full py-1.5 px-4 rounded-full font-medium transition-colors text-xs ${
                    plan.popular 
                      ? 'bg-black text-white hover:bg-gray-800' 
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-red-500'
                  }`}>
                    Access our Beta
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Add-ons
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Specialized modes for high-stakes exam preparation.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* MCAT Mode Add-on */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-left hover:shadow-lg transition-all hover:bg-white hover:border-red-500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🩺</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">MCAT Mode</h3>
                  <p className="text-sm text-gray-600">Medical school prep</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">+$10.99</span>
                  <span className="text-gray-600 ml-1 text-sm">/ month</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2">✓</span>
                  <span className="text-gray-600 text-sm">Pre-loaded MCAT content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2">✓</span>
                  <span className="text-gray-600 text-sm">Medical terminology focus</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2">✓</span>
                  <span className="text-gray-600 text-sm">Practice questions & simulations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2">✓</span>
                  <span className="text-gray-600 text-sm">Score tracking & analytics</span>
                </li>
              </ul>
              <button className="w-full py-2 px-5 rounded-full font-medium transition-colors text-sm border border-gray-300 text-gray-700 hover:bg-black hover:text-white hover:border-black">
                Add to plan
              </button>
            </div>

            {/* LSAT Mode Add-on */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-left hover:shadow-lg transition-all hover:bg-white hover:border-red-500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">LSAT Mode</h3>
                  <p className="text-sm text-gray-600">Law school prep</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">+$10.99</span>
                  <span className="text-gray-600 ml-1 text-sm">/ month</span>
                </div>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2">✓</span>
                  <span className="text-gray-600 text-sm">Pre-loaded LSAT content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2">✓</span>
                  <span className="text-gray-600 text-sm">Logic games & reasoning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2">✓</span>
                  <span className="text-gray-600 text-sm">Reading comprehension focus</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-900 mr-2">✓</span>
                  <span className="text-gray-600 text-sm">Timed practice sections</span>
                </li>
              </ul>
              <button className="w-full py-2 px-5 rounded-full font-medium transition-colors text-sm border border-gray-300 text-gray-700 hover:bg-black hover:text-white hover:border-black">
                Add to plan
              </button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Add-ons can be combined with any plan. Requires Standard or Premium subscription.
            </p>
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
            <a href="http://ec2-18-119-10-247.us-east-2.compute.amazonaws.com">
              <button className="bg-black text-white px-8 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition-all transform hover:scale-105">
                Access our Beta →
              </button>
            </a>
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);

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

  // Close mobile menu when clicking outside or on links
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        isDarkPage 
          ? (isScrolled ? 'bg-black/80 border-gray-800' : 'bg-black border-gray-800')
          : 'bg-white/80 border-gray-100'
      }`}>
        <div className="max-w-5xl mx-auto px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link to="/">
                <div className="w-10 h-10 rounded-md flex items-center justify-center overflow-hidden">
                  <img 
                    src="/momentumaiLargeLogo-Photoroom.png" 
                    alt="Momentum AI Logo" 
                    className="w-full h-full object-contain" 
                  />
                </div>
              </Link>
              <span className={`text-base font-logo font-semibold tracking-tight ${
                isDarkPage ? 'text-white' : 'text-gray-900'
              }`}>Momentum AI</span>
            </div>
            
            {/* Desktop Navigation */}
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
              <Link to="/events" className={`transition-colors text-xs font-medium ${
                isDarkPage 
                  ? 'text-gray-300 hover:text-red-400' 
                  : 'text-gray-600 hover:text-red-500'
              }`}>
                Events
              </Link>
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
            
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/login" className={`transition-colors text-xs font-medium ${
                isDarkPage 
                  ? 'text-gray-300 hover:text-red-400' 
                  : 'text-gray-600 hover:text-red-500'
              }`}>
                Log in
              </Link>
              <Link to="/signup" className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                isDarkPage 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}>
                Sign up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden mobile-menu-button p-2 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center relative">
                <span className={`block w-5 h-0.5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] absolute ${
                  isDarkPage ? 'bg-white' : 'bg-gray-900'
                } ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-1'}`}></span>
                <span className={`block w-5 h-0.5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] absolute ${
                  isDarkPage ? 'bg-white' : 'bg-gray-900'
                } ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] absolute ${
                  isDarkPage ? 'bg-white' : 'bg-gray-900'
                } ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeMobileMenu}
          ></div>
        </div>
      )}

      {/* Mobile Menu Panel */}
      <div className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden mobile-menu ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className={`h-full backdrop-blur-xl border-r ${
          isDarkPage 
            ? 'bg-black/90 border-gray-800' 
            : 'bg-white/90 border-gray-200'
        }`}>
          {/* Menu Header - Same height as nav bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200/20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-md flex items-center justify-center overflow-hidden">
                <img 
                  src="/momentumaiLargeLogo-Photoroom.png" 
                  alt="Momentum AI Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className={`text-base font-logo font-semibold tracking-tight ${
                isDarkPage ? 'text-white' : 'text-gray-900'
              }`}>Momentum AI</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-5 space-y-1">
            {/* Features Section */}
            <div className="space-y-1">
              <button
                onClick={() => setIsMobileFeaturesOpen(!isMobileFeaturesOpen)}
                className={`w-full flex items-center justify-between py-3 px-3 text-sm font-medium transition-colors rounded-lg ${
                  isDarkPage ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>Features</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${isMobileFeaturesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
               
               <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                 isMobileFeaturesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
               }`}>
                 <div className="space-y-1">
                   <Link 
                     to="/#file-upload" 
                     onClick={closeMobileMenu}
                     className={`block py-3 px-6 text-sm transition-colors rounded-lg ${
                       isDarkPage 
                         ? 'text-gray-300 hover:bg-gray-800 hover:text-red-400' 
                         : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
                     }`}
                   >
                     File Upload & Processing
                   </Link>
                   <Link 
                     to="/#voice-ai" 
                     onClick={closeMobileMenu}
                     className={`block py-3 px-6 text-sm transition-colors rounded-lg ${
                       isDarkPage 
                         ? 'text-gray-300 hover:bg-gray-800 hover:text-red-400' 
                         : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
                     }`}
                   >
                     Voice AI Tutor
                   </Link>
                   <Link 
                     to="/#agentic-chatbot" 
                     onClick={closeMobileMenu}
                     className={`block py-3 px-6 text-sm transition-colors rounded-lg ${
                       isDarkPage 
                         ? 'text-gray-300 hover:bg-gray-800 hover:text-red-400' 
                         : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
                     }`}
                   >
                     Agentic Chatbot
                   </Link>
                   <Link 
                     to="/#flashcards" 
                     onClick={closeMobileMenu}
                     className={`block py-3 px-6 text-sm transition-colors rounded-lg ${
                       isDarkPage 
                         ? 'text-gray-300 hover:bg-gray-800 hover:text-red-400' 
                         : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
                     }`}
                   >
                     AI Flashcards & Spaced Repetition
                   </Link>
                   <Link 
                     to="/#exam-modes" 
                     onClick={closeMobileMenu}
                     className={`block py-3 px-6 text-sm transition-colors rounded-lg ${
                       isDarkPage 
                         ? 'text-gray-300 hover:bg-gray-800 hover:text-red-400' 
                         : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
                     }`}
                   >
                     MCAT & LSAT Modes
                   </Link>
                 </div>
               </div>
             </div>

            {/* Divider */}
            <div className="h-px bg-gray-200/20 my-4"></div>

            {/* Main Navigation */}
            <Link 
              to="/events" 
              onClick={closeMobileMenu}
              className={`block py-3 px-3 text-sm font-medium transition-colors rounded-lg ${
                isDarkPage 
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-red-400' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
              }`}
            >
              Events
            </Link>
            <Link 
              to="/team" 
              onClick={closeMobileMenu}
              className={`block py-3 px-3 text-sm font-medium transition-colors rounded-lg ${
                isDarkPage 
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-red-400' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
              }`}
            >
              Our Team
            </Link>
            <Link 
              to="/#pricing" 
              onClick={closeMobileMenu}
              className={`block py-3 px-3 text-sm font-medium transition-colors rounded-lg ${
                isDarkPage 
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-red-400' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
              }`}
            >
              Plans & Pricing
            </Link>
            <Link 
              to="/careers" 
              onClick={closeMobileMenu}
              className={`block py-3 px-3 text-sm font-medium transition-colors rounded-lg ${
                isDarkPage 
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-red-400' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
              }`}
            >
              Careers
            </Link>

            {/* Divider */}
            <div className="h-px bg-gray-200/20 my-4"></div>

            {/* Auth Buttons */}
            <div className="space-y-2 pt-2">
              <Link 
                to="/login" 
                onClick={closeMobileMenu}
                className={`block w-full py-3 px-3 text-sm font-medium transition-colors rounded-lg text-left ${
                  isDarkPage 
                    ? 'text-gray-300 hover:bg-gray-800 hover:text-red-400' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
                }`}
              >
                Log in
              </Link>
              <Link 
                to="/signup" 
                onClick={closeMobileMenu}
                className={`block w-full py-3 px-3 text-sm font-medium transition-colors rounded-lg ${
                  isDarkPage 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AppContent() {
  // Initialize smooth scrolling with inertia
  useSmoothScroll();

  const location = useLocation();
  const [areAssetsReady, setAssetsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isIntroDone, setIntroDone] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    preloadImages(PRELOAD_IMAGE_URLS).finally(() => {
      if (!isCancelled) {
        setAssetsReady(true);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let completionTimeout: NodeJS.Timeout | null = null;
    let safetyTimeout: NodeJS.Timeout | null = null;

    if (!areAssetsReady) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1.5, 94));
      }, 100);
    } else {
      completionTimeout = setTimeout(() => {
        setProgress(100);
      }, 800);
    }

    safetyTimeout = setTimeout(() => {
      setProgress(100);
    }, 4500);

    return () => {
      if (interval) clearInterval(interval);
      if (completionTimeout) clearTimeout(completionTimeout);
      if (safetyTimeout) clearTimeout(safetyTimeout);
    };
  }, [areAssetsReady]);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setIntroDone(true), 600);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  // Update theme color based on current page
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const appleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    
    if (location.pathname === '/team') {
      // Set to black for team page
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#000000');
      }
      // Add or update Apple-specific meta tag
      if (appleStatusBar) {
        appleStatusBar.setAttribute('content', 'black');
      } else {
        const newAppleStatusBar = document.createElement('meta');
        newAppleStatusBar.name = 'apple-mobile-web-app-status-bar-style';
        newAppleStatusBar.content = 'black';
        document.head.appendChild(newAppleStatusBar);
      }
    } else {
      // Set to white for all other pages
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#ffffff');
      }
      // Update Apple-specific meta tag
      if (appleStatusBar) {
        appleStatusBar.setAttribute('content', 'light-content');
      } else {
        const newAppleStatusBar = document.createElement('meta');
        newAppleStatusBar.name = 'apple-mobile-web-app-status-bar-style';
        newAppleStatusBar.content = 'light-content';
        document.head.appendChild(newAppleStatusBar);
      }
    }
  }, [location.pathname]);

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

  const isLoadingVisible = !isIntroDone;

  return (
    <div className="App bg-white min-h-screen relative overflow-hidden">
      <div
        className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-white transition-opacity duration-700 ease-out ${isLoadingVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <img
          src="/momentumaiLargeLogo-Photoroom.png"
          alt="Momentum AI logo"
          className="w-24 h-24 object-contain mb-10 drop-shadow-xl transition-transform duration-500"
          style={{ transform: isLoadingVisible ? 'translateY(0)' : 'translateY(-10px)' }}
        />
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/beta" element={<BetaSignup />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
