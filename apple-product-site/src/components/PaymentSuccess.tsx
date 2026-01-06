import React, { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  const circleRef = useRef<SVGCircleElement>(null);
  const checkRef = useRef<SVGPathElement>(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    
    // Force animation to play on mount using Web Animations API
    if (circleRef.current && checkRef.current) {
      // Reset and animate circle
      circleRef.current.style.strokeDashoffset = '144.5';
      circleRef.current.animate([
        { strokeDashoffset: '144.5' },
        { strokeDashoffset: '0' }
      ], {
        duration: 600,
        easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
        fill: 'forwards'
      });

      // Reset and animate checkmark after circle
      checkRef.current.style.strokeDashoffset = '48';
      setTimeout(() => {
        if (checkRef.current) {
          checkRef.current.animate([
            { strokeDashoffset: '48' },
            { strokeDashoffset: '0' }
          ], {
            duration: 300,
            easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
            fill: 'forwards'
          });
        }
      }, 600);
    }
  }, []);

  return (
    <div className={`min-h-screen bg-white flex flex-col transition-opacity duration-700 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Header */}
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-2 w-fit">
          <div className="w-10 h-10 rounded-md flex items-center justify-center overflow-hidden">
            <img 
              src="/momentumaiLargeLogo-Photoroom.png" 
              alt="Momentum AI Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          <span className="text-base font-logo font-semibold tracking-tight text-gray-900">
            Momentum AI
          </span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-5 pb-16">
        <div className="w-full max-w-md">
          {/* Apple Pay-style Checkmark Animation */}
          <div className="relative mb-12 flex items-center justify-center">
            <svg 
              className="w-24 h-24" 
              viewBox="0 0 52 52" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Circle animation */}
              <circle
                ref={circleRef}
                cx="26"
                cy="26"
                r="23"
                stroke="#000000"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: '144.5',
                  strokeDashoffset: '144.5',
                  transform: 'rotate(-90deg)',
                  transformOrigin: 'center'
                }}
              />
              {/* Checkmark animation */}
              <path 
                ref={checkRef}
                d="M14.5 26L21.5 33.5L37.5 16.5" 
                stroke="#000000" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="none"
                style={{
                  strokeDasharray: '48',
                  strokeDashoffset: '48'
                }}
              />
              </svg>
          </div>

          {/* Success Message */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
              Welcome to<br />Momentum AI
            </h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed font-normal">
              Your subscription is now active.
            </p>
          </div>

          {/* Action Buttons - Circular/Pill Style */}
          <div className="space-y-3">
            <a 
              href="http://ec2-18-119-10-247.us-east-2.compute.amazonaws.com"
              className="block w-full bg-black text-white px-8 py-4 rounded-full text-base font-medium hover:bg-gray-800 transition-all duration-200 text-center"
            >
              Launch Platform
            </a>
            <Link 
              to="/"
              className="block w-full bg-white border border-gray-300 text-gray-900 px-8 py-4 rounded-full text-base font-medium hover:bg-gray-50 transition-all duration-200 text-center"
            >
              Back to Home
            </Link>
          </div>

          {/* Session ID - Hidden by default, only for debugging */}
          {sessionId && process.env.NODE_ENV === 'development' && (
            <div className="mt-8 text-center">
              <details className="text-xs text-gray-400 cursor-pointer">
                <summary className="hover:text-gray-600">Debug Info</summary>
                <p className="mt-2 font-mono text-[10px] break-all">{sessionId}</p>
              </details>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
