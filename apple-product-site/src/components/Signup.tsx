import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState<'signup' | 'verify'>('signup');
  const navigate = useNavigate();
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/send-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send verification code');
      }

      setIsLoading(false);
      setStep('verify');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send verification code');
      setIsLoading(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0]; // Only allow single digit
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...verificationCode];
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    setVerificationCode(newCode);
    
    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const code = verificationCode.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/verify-code-and-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid verification code');
      }

      setIsLoading(false);
      // Refresh the page to update navigation
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/send-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend code');
      }

      setIsLoading(false);
      setError(''); // Clear any existing error
      alert('Verification code sent!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend code');
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-white flex flex-col page-transition ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
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
        <div className="w-full max-w-sm">
          {step === 'signup' ? (
            <>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Create your account
                </h1>
                <p className="text-gray-600 text-sm">
                  Start your journey with Momentum AI
                </p>
              </div>

              <form onSubmit={handleSendCode} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-5 py-3.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                    required
                    disabled={isLoading}
                  />
                </div>

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
                    className="w-full px-5 py-3.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full px-5 py-3.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                    required
                    disabled={isLoading}
                    minLength={8}
                  />
                  <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full px-5 py-3.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                    required
                    disabled={isLoading}
                    minLength={8}
                  />
                </div>

                {error && (
                  <div className="text-red-600 text-sm text-center bg-red-50 py-2.5 px-5 rounded-full">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !email || !password || !confirmPassword || !name}
                  className="w-full bg-black text-white px-6 py-3.5 rounded-full text-base font-medium hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending code...
                    </span>
                  ) : (
                    'Continue'
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-black font-medium hover:underline">
                    Log in
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  Check your email
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We sent a verification code to<br />
                  <span className="font-semibold text-gray-900">{email}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyCode} className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                    Enter verification code
                  </label>
                  <div className="flex justify-center gap-3" onPaste={handlePaste}>
                    {verificationCode.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-xl focus:border-black focus:ring-2 focus:ring-black focus:outline-none transition-all duration-200 text-gray-900"
                        disabled={isLoading}
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-gray-500 text-center">
                    Code expires in 10 minutes
                  </p>
                </div>

                {error && (
                  <div className="text-red-600 text-sm text-center bg-red-50 py-3 px-4 rounded-xl border border-red-100">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || verificationCode.join('').length !== 6}
                  className="w-full bg-black text-white px-6 py-3.5 rounded-full text-base font-medium hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    'Continue'
                  )}
                </button>
              </form>

              <div className="mt-8 text-center space-y-3">
                <button
                  onClick={handleResendCode}
                  disabled={isLoading}
                  className="text-sm text-gray-600 hover:text-black font-medium transition-colors disabled:opacity-50"
                >
                  Didn't receive the code? <span className="underline">Resend</span>
                </button>
                <div>
                  <button
                    onClick={() => {
                      setStep('signup');
                      setVerificationCode(['', '', '', '', '', '']);
                      setError('');
                    }}
                    className="text-sm text-gray-600 hover:text-black transition-colors inline-flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Change email address
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{' '}
              <a href="#" className="text-black hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-black hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
