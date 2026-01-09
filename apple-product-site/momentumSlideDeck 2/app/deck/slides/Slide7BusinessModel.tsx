'use client'

export default function Slide7BusinessModel() {
  return (
    <div className="h-full flex flex-col px-12 md:px-20 pt-12 md:pt-16 pb-16 bg-white/0 relative z-10 overflow-hidden">
      {/* Title */}
      <div className="mb-4 md:mb-6 slide-enter" style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}>
        <h2 className="text-4xl md:text-5xl font-light text-black tracking-tight mb-2">Business Model</h2>
        <p className="text-lg md:text-xl text-black/40 font-light leading-snug tracking-tight max-w-2xl">
          How we make money, get customers, and convert them to paying users
        </p>
        <div className="w-16 h-1 bg-black/10 rounded-full mt-3 underline-reveal"></div>
      </div>

      {/* Main Content - Creative Black & White Design with Animations */}
      <div className="flex-1 flex flex-col justify-center min-h-0 py-2 -mt-4 md:-mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-7xl mx-auto w-full">
          {/* Pricing & Revenue Model */}
          <div
            className="relative bg-white rounded-xl p-5 md:p-6 border-2 border-black/20 shadow-[0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden bm-entrance h-full flex flex-col"
            style={{ 
              animationDelay: '0.1s',
              opacity: 0,
            }}
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-black/5 rounded-bl-full"></div>
            <div className="relative flex-1 flex flex-col">
              <h3 className="text-base md:text-lg font-light text-black/60 tracking-tight mb-3 uppercase text-xs">Pricing</h3>
              <div className="space-y-3 mb-4 flex-1">
                <div>
                  <div className="flex items-baseline justify-between mb-0.5">
                    <span className="text-base md:text-lg font-light text-black">Standard</span>
                    <span className="text-xl md:text-2xl font-light text-black">$12.99/mo</span>
                  </div>
                  <p className="text-xs text-black/40 font-light">Beta: $8.99/mo</p>
                </div>
                <div className="h-px bg-black/10"></div>
                <div>
                  <div className="flex items-baseline justify-between mb-0.5">
                    <span className="text-base md:text-lg font-light text-black">Premium</span>
                    <span className="text-xl md:text-2xl font-light text-black">$29.99/mo</span>
                  </div>
                  <p className="text-xs text-black/40 font-light">Beta: $12.99/mo</p>
                </div>
              </div>
              <div className="h-px bg-black/10 my-2"></div>
              <div className="space-y-1.5">
                <p className="text-xs md:text-sm text-black font-light"><span className="font-medium">Revenue Model:</span> Monthly recurring subscription (MRR)</p>
                <p className="text-xs text-black/40 font-light">7-day free trial. Conversion peaks during midterms & finals</p>
                <p className="text-xs text-black/40 font-light">MCAT/LSAT addons: +$10.99/mo (Premium only)</p>
              </div>
            </div>
          </div>

          {/* Customer Acquisition */}
          <div
            className="relative bg-white rounded-xl p-5 md:p-6 border-2 border-black/20 shadow-[0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden bm-entrance h-full flex flex-col"
            style={{ 
              animationDelay: '0.2s',
              opacity: 0,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-black/20"></div>
            <div className="relative flex-1 flex flex-col">
              <h3 className="text-base md:text-lg font-light text-black/60 tracking-tight mb-3 uppercase text-xs">Customer Acquisition</h3>
              <div className="space-y-2.5 mb-4 flex-1">
                <p className="text-sm md:text-base text-black font-light">• Organic social content & UGC</p>
                <p className="text-sm md:text-base text-black font-light">• Campus presence & ambassadors</p>
                <p className="text-sm md:text-base text-black font-light">• Hosting & sponsoring student events</p>
                <p className="text-sm md:text-base text-black font-light">• Gen Z–native brand & community</p>
              </div>
              <div className="h-px bg-black/10 my-2"></div>
              <p className="text-xs md:text-sm text-black/50 font-light"><span className="font-medium">CAC:</span> ~$5–8 CAD per user (capital-efficient, community-driven)</p>
            </div>
          </div>

          {/* Unit Economics */}
          <div
            className="relative bg-white rounded-xl p-5 md:p-6 border-2 border-black/20 shadow-[0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden bm-entrance h-full flex flex-col"
            style={{ 
              animationDelay: '0.3s',
              opacity: 0,
            }}
          >
            <div className="absolute top-0 left-0 w-16 h-16 bg-black/5 rounded-br-full"></div>
            <div className="relative flex-1 flex flex-col">
              <h3 className="text-base md:text-lg font-light text-black/60 tracking-tight mb-3 uppercase text-xs">Unit Economics</h3>
              <div className="space-y-3 mb-4 flex-1">
                <div>
                  <p className="text-sm md:text-base text-black font-light mb-1"><span className="font-medium">Infrastructure:</span> ~$4–6 CAD/user/mo</p>
                  <p className="text-xs text-black/40 font-light">Hosting & AI infrastructure (scales with usage)</p>
                </div>
                <div className="h-px bg-black/10"></div>
                <div>
                  <p className="text-sm md:text-base text-black font-light mb-1"><span className="font-medium">People:</span> ~$10k–15k CAD/mo</p>
                  <p className="text-xs text-black/40 font-light">Fixed early team costs</p>
                </div>
                <div className="h-px bg-black/10"></div>
                <div>
                  <p className="text-sm md:text-base text-black font-light mb-1"><span className="font-medium">Retention:</span> Academic-term usage</p>
                  <p className="text-xs text-black/40 font-light">Students stick with one system across the semester</p>
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Funnel */}
          <div
            className="md:col-span-2 lg:col-span-1 relative bg-white rounded-xl p-5 md:p-6 border-2 border-black/20 shadow-[0_4px_12px_rgba(0,0,0,0.04)] overflow-hidden bm-entrance"
            style={{ 
              animationDelay: '0.4s',
              opacity: 0,
            }}
          >
            <div className="relative">
              <h3 className="text-base md:text-lg font-light text-black/60 tracking-tight mb-3 uppercase text-xs">Conversion Funnel</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-2.5 md:gap-4">
                <div className="flex-1 text-center relative">
                  <div className="inline-block px-4 py-1.5 border-2 border-black/30 rounded-full mb-1.5">
                    <div className="text-lg md:text-xl font-light text-black">7-Day Free Trial</div>
                  </div>
                  <div className="text-xs md:text-sm text-black/50 font-light">Low-friction entry</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-px bg-black/30"></div>
                  <div className="text-lg md:text-xl text-black/40">&rarr;</div>
                  <div className="w-4 h-px bg-black/30"></div>
                </div>
                <div className="flex-1 text-center relative">
                  <div className="inline-block px-4 py-1.5 bg-black text-white rounded-full mb-1.5">
                    <div className="text-lg md:text-xl font-light">Paid Subscription</div>
                  </div>
                  <div className="text-xs md:text-sm text-black/50 font-light">Converts during midterms & finals</div>
                </div>
              </div>
            </div>
          </div>

          {/* Retention & Scalability */}
          <div
            className="md:col-span-2 relative bg-black text-white rounded-xl p-5 md:p-6 border-2 border-black shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden bm-entrance"
            style={{ 
              animationDelay: '0.5s',
              opacity: 0,
            }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full"></div>
            <div className="relative">
              <h3 className="text-base md:text-lg font-light text-white/80 tracking-tight mb-3 uppercase text-xs">Retention & Scalability</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm md:text-base text-white font-light mb-2"><span className="font-medium">High Retention:</span></p>
                  <p className="text-xs md:text-sm text-white/70 font-light">• Usage persists across academic terms</p>
                  <p className="text-xs md:text-sm text-white/70 font-light">• Course data creates switching friction</p>
                  <p className="text-xs md:text-sm text-white/70 font-light">• Becomes the semester hub</p>
                </div>
                <div>
                  <p className="text-sm md:text-base text-white font-light mb-2"><span className="font-medium">Scalable:</span></p>
                  <p className="text-xs md:text-sm text-white/70 font-light">• Infrastructure scales per active user</p>
                  <p className="text-xs md:text-sm text-white/70 font-light">• Community-led CAC stays low</p>
                  <p className="text-xs md:text-sm text-white/70 font-light">• Distribution driven by content + campus events</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
