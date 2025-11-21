import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    // BACKGROUND: Deep Space Theme
    <div className="min-h-screen bg-[#0f172a] flex flex-col font-sans text-slate-200 overflow-hidden relative selection:bg-cyan-500 selection:text-white">
      
      {/* AMBIENT BACKGROUND BLOBS */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{animationDuration: '10s'}}></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{animationDuration: '15s'}}></div>

      {/* MAIN CONTENT */}
      <div className="flex-grow flex items-center justify-center p-6 relative z-10">
        
        {/* GLASS HERO CARD */}
        <div className="relative p-12 rounded-[3rem] bg-[#0f172a]/60 backdrop-blur-2xl border border-white/10 shadow-2xl text-center max-w-4xl mx-auto">
          
          {/* Inner Glow behind the card content */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-[3rem] pointer-events-none"></div>

          {/* Logo Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-40 animate-pulse"></div>
                <svg className="w-20 h-20 text-cyan-400 relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-400 mb-6 drop-shadow-sm">
            Xpense
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl font-bold text-cyan-400 mb-8 tracking-widest uppercase">
            Your Financial Universe
          </h2>
          
          {/* SHORT & SWEET TEXT */}
          <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-lg mx-auto font-medium">
            Master your money. Track, budget, and visualize your financial growth in style.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
            
            {/* Get Started - SOLID CYAN */}
            <Link 
              to="/register" 
              className="px-10 py-4 rounded-2xl bg-cyan-500 text-white font-bold text-lg shadow-[0_0_20px_rgba(6,182,212,0.7)] hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.9)] hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              Get Started
            </Link>
            
            {/* Login - SOLID VIOLET */}
            <Link 
              to="/login" 
              className="px-10 py-4 rounded-2xl bg-violet-600 text-white font-bold text-lg shadow-[0_0_20px_rgba(139,92,246,0.7)] hover:bg-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.9)] hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              Login
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Welcome;