import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        if (data.username) localStorage.setItem('username', data.username); 
        navigate('/home'); 
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // BACKGROUND: Deep Space Theme
    <div className="min-h-screen bg-[#0f172a] flex flex-col font-sans text-slate-200 overflow-hidden relative selection:bg-cyan-500 selection:text-white">
      
      {/* AMBIENT BACKGROUND BLOBS */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{animationDuration: '10s'}}></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{animationDuration: '15s'}}></div>

      {/* MINIMAL GLASS HEADER - Register Link Removed */}
      <nav className="w-full z-50 p-6 flex items-center relative">
         <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-50"></div>
                <svg className="w-8 h-8 text-cyan-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
                Xpense
            </span>
         </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex-grow flex items-center justify-center p-6 relative z-10">
        
        {/* GLASS CARD CONTAINER */}
        <div className="w-full max-w-md relative">
            
            {/* Glow behind the card */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur-2xl opacity-20 transform scale-95"></div>

            <div className="relative p-8 rounded-3xl bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 shadow-2xl">
              
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome Back</h2>
                <p className="text-slate-400 text-sm">Enter your credentials to access your expenses.</p>
              </div>

              {message && (
                <div className={`mb-6 p-4 rounded-xl text-sm font-bold text-center backdrop-blur-md border ${
                  message.includes('successful') 
                    ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                }`}>
                  {message}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
                
                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="new-email" 
                    className="w-full p-4 rounded-xl bg-[#0f172a]/50 border border-white/10 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-slate-600 text-white font-medium"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className="w-full p-4 rounded-xl bg-[#0f172a]/50 border border-white/10 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-slate-600 text-white font-medium"
                    required
                  />
                </div>

                {/* Neon Gradient Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-lg shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.7)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Authenticating...
                    </span>
                  ) : 'Sign In'}
                </button>
              </form>

              <div className="mt-8 text-center border-t border-white/5 pt-6">
                <p className="text-slate-500 text-sm">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors">
                    Create one now
                  </Link>
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Login;