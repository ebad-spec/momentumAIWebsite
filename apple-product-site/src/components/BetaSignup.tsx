import emailjs from '@emailjs/browser';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emailConfig } from '../config/emailConfig';

const BetaSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(emailConfig.publicKey);
    
    // Fade in animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const sendUserConfirmationEmail = async (userEmail: string) => {
    const templateParams = {
      user_email: userEmail,
      user_name: userEmail.split('@')[0], // Use email prefix as name
      name: userEmail.split('@')[0], // For "From Name" field
      email: userEmail, // For "Reply To" field
    };

    return emailjs.send(
      emailConfig.serviceId,
      emailConfig.userTemplateId,
      templateParams
    );
  };

  const sendAdminNotificationEmail = async (userEmail: string) => {
    const templateParams = {
      user_email: userEmail,
      user_name: userEmail.split('@')[0], // Use email prefix as name
      name: userEmail.split('@')[0], // For "From Name" field
      email: userEmail, // For "Reply To" field
    };

    return emailjs.send(
      emailConfig.serviceId,
      emailConfig.adminTemplateId,
      templateParams
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Send confirmation email to user
      await sendUserConfirmationEmail(email);
      
      // Send notification email to admin
      await sendAdminNotificationEmail(email);
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Redirect after showing success
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => navigate('/'), 400);
      }, 2000);
      
    } catch (error) {
      console.error('Email sending failed:', error);
      setError('Failed to send confirmation email. Please try again.');
      setIsSubmitting(false);
    }
  };

  const LoadingIcon = () => (
    <svg 
      className="w-5 h-5 text-white animate-spin" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
        strokeDasharray="60"
        strokeDashoffset="60"
        className="opacity-25"
      />
      <path 
        d="M12 2a10 10 0 0 1 10 10" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  );

  const CheckIcon = () => (
    <svg 
      className="w-5 h-5 text-white animate-fade-in" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2.5} 
        d="M5 13l4 4L19 7" 
      />
    </svg>
  );

  return (
    <div className={`min-h-screen bg-white flex items-center justify-center px-5 page-transition ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center overflow-hidden bg-white">
            <img 
              src="/momentumaiLargeLogo-Photoroom.png" 
              alt="Momentum AI Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Join the Beta
          </h1>
          <p className="text-gray-600 text-sm">
            Be among the first to experience the future of AI-powered learning.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
              required
              disabled={isSubmitting || isSuccess}
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isSuccess || !email}
            className={`w-full py-4 px-6 rounded-full font-medium smooth-button flex items-center justify-center transition-all duration-300 ${
              isSubmitting || isSuccess
                ? 'bg-black text-white cursor-not-allowed' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isSuccess ? (
              <CheckIcon />
            ) : isSubmitting ? (
              <LoadingIcon />
            ) : (
              <span className="text-lg">Join Beta</span>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-500">
            By signing up, you agree to our{' '}
            <a href="#" className="text-black hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-black hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BetaSignup; 