import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (selectedPlan: 'standard' | 'premium', addons: string[]) => void;
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '');

const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose, onContinue }) => {
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'premium' | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(false);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      // Use requestAnimationFrame for smoother animation start
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Re-enable body scroll when modal closes
        document.body.style.overflow = '';
      }, 400);
      return () => {
        clearTimeout(timer);
        // Cleanup: re-enable body scroll
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const handleAddonToggle = (addon: string) => {
    setSelectedAddons(prev => 
      prev.includes(addon) 
        ? prev.filter(a => a !== addon)
        : [...prev, addon]
    );
  };

  const handleContinue = async () => {
    if (!selectedPlan) return;
    
    setIsLoading(true);
    
    try {
      // Check if user is logged in first
      const authCheck = await fetch('/api/user', {
        credentials: 'include',
      });
      
      if (!authCheck.ok) {
        throw new Error('Please log in first to purchase a subscription');
      }
      
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          plan: selectedPlan,
          addons: selectedAddons,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to create checkout session`);
      }

      const data = await response.json();
      
      if (!data.url && !data.sessionId) {
        throw new Error('No checkout URL or session ID received from server');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        // Use the checkout URL directly from Stripe
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to start checkout. Please try again.';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Frost blur background */}
      <div 
        className="absolute inset-0"
        style={{
          backdropFilter: isAnimating ? 'blur(12px)' : 'blur(0px)',
          WebkitBackdropFilter: isAnimating ? 'blur(12px)' : 'blur(0px)',
          backgroundColor: isAnimating ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0)',
          transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div 
        className="relative bg-white rounded-[28px] max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        style={{
          transform: isAnimating ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(8px)',
          opacity: isAnimating ? 1 : 0,
          transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isAnimating 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)' 
            : '0 10px 20px -5px rgba(0, 0, 0, 0.1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200 flex items-center justify-center transition-all duration-200 z-10 hover:scale-110"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

        {/* Scrollable content */}
        <div 
          className="overflow-y-auto flex-1 p-8 sm:p-10 pb-4 overscroll-contain" 
          style={{ minHeight: 0 }}
          onTouchMove={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                Choose Your Plan
              </h2>
              <p className="text-gray-600 text-base">
                Select a plan to access Momentum AI Beta
              </p>
            </div>

            {/* Plans */}
            <div className="grid md:grid-cols-2 gap-5 mb-8">
              {/* Standard Plan */}
              <div
                onClick={() => setSelectedPlan('standard')}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedPlan === 'standard'
                    ? 'border-black bg-gray-50 shadow-lg scale-[1.02]'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Standard</h3>
                {selectedPlan === 'standard' && (
                  <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-gray-400 text-lg line-through font-medium">$12.99</span>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Beta Discount</span>
                </div>
                <div>
                  <span className="text-3xl font-bold text-gray-900">$8.99</span>
                  <span className="text-gray-600 text-sm ml-1">CAD/month</span>
                </div>
                <p className="text-green-600 text-xs font-medium mt-1">✨ Includes 7-day free trial</p>
              </div>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>AI chatbot (unlimited)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>500 pages upload limit</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>10 flashcard decks per day</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Exam generator (4x/semester)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Study planner (1x/semester)</span>
                </li>
              </ul>
            </div>

              {/* Premium Plan */}
              <div
                onClick={() => setSelectedPlan('premium')}
                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedPlan === 'premium'
                    ? 'border-black bg-gray-50 shadow-lg scale-[1.02]'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Premium</h3>
                {selectedPlan === 'premium' && (
                  <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-gray-400 text-lg line-through font-medium">$29.99</span>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Beta Discount</span>
                </div>
                <div>
                  <span className="text-3xl font-bold text-gray-900">$12.99</span>
                  <span className="text-gray-600 text-sm ml-1">CAD/month</span>
                </div>
                <p className="text-green-600 text-xs font-medium mt-1">✨ Includes 7-day free trial</p>
              </div>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span><strong>3000+ pages</strong> upload limit</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Unlimited</strong> flashcard decks</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Unlimited</strong> exam generator</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Unlimited</strong> study planner</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Voice AI tutor</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Exam mode addons (MCAT/LSAT)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Priority support</span>
                </li>
              </ul>
              </div>
            </div>

            {/* Addons (only show if Premium is selected) */}
            {selectedPlan === 'premium' && (
              <div className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-5">
                  Exam Mode Addons
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center p-4 rounded-xl border-2 bg-white/50 border-gray-200 opacity-60 cursor-not-allowed">
                    <input
                      type="checkbox"
                      disabled
                      className="w-5 h-5 rounded border-gray-300 text-black opacity-50"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-gray-900">MCAT Mode</div>
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">Coming Soon</span>
                      </div>
                      <div className="text-sm text-gray-600">Specialized practice for MCAT exam</div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 rounded-xl border-2 bg-white/50 border-gray-200 opacity-60 cursor-not-allowed">
                    <input
                      type="checkbox"
                      disabled
                      className="w-5 h-5 rounded border-gray-300 text-black opacity-50"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-gray-900">LSAT Mode</div>
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">Coming Soon</span>
                      </div>
                      <div className="text-sm text-gray-600">Specialized practice for LSAT exam</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* Sticky Continue Button at bottom */}
        <div className="border-t border-gray-200 p-6 bg-white rounded-b-[28px]">
            <button
              onClick={handleContinue}
              disabled={!selectedPlan || isLoading}
              className="w-full bg-black text-white px-6 py-4 rounded-full text-base font-semibold hover:bg-gray-800 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Continue to Payment'
              )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal;

