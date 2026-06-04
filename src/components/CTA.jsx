import React from "react";

export default function CTA() {
  return (
    <section id="roi" className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] aspect-[8/5] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
          Ready for a Structural <br /> <span className="text-gradient">Business Upgrade?</span>
        </h2>
        
        <p className="text-xl text-gray-400 mb-12 leading-relaxed">
          Don't settle for a static site that bleeds potential revenue. Experience an immediate upgrade 
          in brand perception and conversion rates. Let's engineer a digital asset that works for you 24/7.
        </p>

        <div className="glass-card p-8 md:p-12 rounded-3xl relative glow-border inline-block w-full max-w-2xl">
          <h3 className="text-2xl font-bold text-white mb-4">Claim Your Zero-Risk Evaluation</h3>
          <p className="text-gray-400 mb-8">
            Book a strategy call today, and we'll provide a <strong>Free Custom Hero Section Overhaul</strong> mockup 
            specifically tailored to your brand. See the difference before you commit.
          </p>
          
          <form className="flex flex-col gap-4 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              />
              <input 
                type="email" 
                placeholder="Work Email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <input 
              type="text" 
              placeholder="Company Website" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            />
            <button 
              type="button" 
              className="mt-4 w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(99,102,241,0.3)]"
            >
              Request Free Mockup & Strategy Call
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
