import React from 'react';

const CareersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="pt-32 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-5">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Careers at Momentum AI
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light max-w-3xl mx-auto">
            Join us in revolutionizing education through AI. We're building the future of learning.
          </p>
        </div>
      </div>

      {/* Current Openings Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
            Current Openings
          </h2>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-12 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              No current openings
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We're not actively hiring at the moment, but we're always interested in connecting with 
              talented individuals who share our passion for transforming education through AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white px-8 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition-all">
                Join Our Talent Network
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full text-base font-medium hover:bg-gray-50 transition-all">
                Follow Our Updates
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Have questions about working at Momentum AI? We'd love to hear from you.
          </p>
          <a 
            href="mailto:careers@momentumai.com" 
            className="inline-flex items-center text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            careers@momentumai.com
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
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
  );
};

export default CareersPage; 