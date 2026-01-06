import React, { useEffect, useState } from 'react';

interface SubscriptionSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SubscriptionData {
  hasSubscription: boolean;
  plan: string | null;
  status: string | null;
  trialEndDate: string | null;
  subscriptionEndDate: string | null;
  daysRemaining: number | null;
}

const SubscriptionSettingsModal: React.FC<SubscriptionSettingsModalProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNewPlan, setSelectedNewPlan] = useState<'standard' | 'premium' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(false);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      // Fetch subscription data
      fetchSubscriptionData();
      // Trigger animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
      }, 400);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const fetchSubscriptionData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/subscription-status', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setSubscription(data);
      }
    } catch (error) {
      console.error('Failed to fetch subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePlan = async () => {
    if (!selectedNewPlan || !subscription) return;
    
    setIsProcessing(true);
    try {
      const response = await fetch('/api/change-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ newPlan: selectedNewPlan }),
      });

      if (response.ok) {
        alert('Subscription plan changed successfully!');
        fetchSubscriptionData();
        setSelectedNewPlan(null);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to change subscription');
      }
    } catch (error) {
      console.error('Error changing subscription:', error);
      alert('Failed to change subscription');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelSubscription = async () => {
    const isInTrial = subscription?.status === 'trialing';
    const message = isInTrial 
      ? 'Are you sure you want to cancel? You will lose access at the end of your free trial period.'
      : 'Are you sure you want to cancel your subscription? You will lose access at the end of your billing period.';
    
    if (!window.confirm(message)) {
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        alert('Subscription cancelled successfully. You will have access until the end of your billing period.');
        fetchSubscriptionData();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to cancel subscription');
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      alert('Failed to cancel subscription');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0"
        style={{
          backdropFilter: isAnimating ? 'blur(12px)' : 'blur(0px)',
          WebkitBackdropFilter: isAnimating ? 'blur(12px)' : 'blur(0px)',
          backgroundColor: isAnimating ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0)',
          transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
      
      {/* Modal Card */}
      <div 
        className="relative bg-white rounded-[28px] max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden"
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
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              Subscription Settings
            </h2>
            <p className="text-gray-600 text-sm">
              Manage your subscription plan
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          ) : subscription && subscription.hasSubscription ? (
            <>
              {/* Current Plan */}
              <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Current Plan</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    subscription.status === 'active' || subscription.status === 'trialing'
                      ? 'bg-green-100 text-green-700'
                      : subscription.status === 'cancelled'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {subscription.status === 'trialing' ? 'Trial' : subscription.status}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 capitalize mb-2">
                  {subscription.plan}
                </div>
                
                {/* Show days remaining */}
                {subscription.daysRemaining && subscription.daysRemaining > 0 && (
                  <div className="text-sm text-gray-600">
                    {subscription.status === 'trialing' ? (
                      <span>✨ {subscription.daysRemaining} days left in trial</span>
                    ) : subscription.status === 'cancelled' ? (
                      <span>⏰ Access ends in {subscription.daysRemaining} days</span>
                    ) : null}
                  </div>
                )}
                
                {subscription.status === 'cancelled' && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
                    Your subscription will end on {new Date(subscription.subscriptionEndDate || subscription.trialEndDate || '').toLocaleDateString()}. You'll keep access until then.
                  </div>
                )}
              </div>

              {/* Change Plan */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Plan</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedNewPlan('standard')}
                    disabled={subscription.plan === 'standard'}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedNewPlan === 'standard'
                        ? 'border-black bg-gray-50'
                        : subscription.plan === 'standard'
                        ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">Standard</div>
                        <div className="text-sm text-gray-600">$8.99 CAD/month</div>
                      </div>
                      {subscription.plan === 'standard' && (
                        <span className="text-xs text-gray-500">Current</span>
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedNewPlan('premium')}
                    disabled={subscription.plan === 'premium'}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedNewPlan === 'premium'
                        ? 'border-black bg-gray-50'
                        : subscription.plan === 'premium'
                        ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">Premium</div>
                        <div className="text-sm text-gray-600">$12.99 CAD/month</div>
                      </div>
                      {subscription.plan === 'premium' && (
                        <span className="text-xs text-gray-500">Current</span>
                      )}
                    </div>
                  </button>
                </div>

                {selectedNewPlan && selectedNewPlan !== subscription.plan && (
                  <button
                    onClick={handleChangePlan}
                    disabled={isProcessing}
                    className="w-full mt-4 bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all duration-200 disabled:opacity-40"
                  >
                    {isProcessing ? 'Processing...' : `Switch to ${selectedNewPlan}`}
                  </button>
                )}
              </div>

              {/* Cancel/Reactivate Subscription */}
              {subscription.status !== 'cancelled' && (
                <div className="pt-6 border-t border-gray-200">
                  <button
                    onClick={handleCancelSubscription}
                    disabled={isProcessing}
                    className="w-full text-red-600 hover:text-red-700 py-3 text-sm font-medium transition-colors disabled:opacity-40"
                  >
                    Cancel Subscription
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">You don't have an active subscription</p>
              <button
                onClick={onClose}
                className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all duration-200"
              >
                Browse Plans
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSettingsModal;

