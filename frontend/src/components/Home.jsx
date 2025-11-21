import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  
  // STATE
  const [username, setUsername] = useState('User');
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  // New State for Time
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // 1. Load Username
    const storedName = localStorage.getItem('username');
    if (storedName) {
      setUsername(storedName);
    }

    // 2. Fetch Expenses Data
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return; 

      try {
        const response = await fetch('http://localhost:5000/expenses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setExpenses(data);
        }
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // 3. Timer for Clock
    const timer = setInterval(() => {
        setCurrentTime(new Date());
    }, 1000);

    // Cleanup timer
    return () => clearInterval(timer);

  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); 
    navigate('/login'); 
  };

  // CALCULATIONS
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const latestTransaction = expenses.length > 0 ? expenses[0] : null;

  // Helper for Sidebar Links
  const getLinkClasses = (path) => {
    const isActive = location.pathname === path;
    const baseClasses = "flex items-center p-4 rounded-2xl transition-all duration-500 group font-medium text-sm relative overflow-hidden isolate";
    const activeClasses = "text-white shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)]";
    const inactiveClasses = "text-slate-400 hover:text-white hover:bg-white/5";

    return (
      <Link to={path} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
        {isActive && (
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 -z-10 opacity-100" />
        )}
        <span className="flex items-center relative z-10">
             {path === '/expense' && (
                 <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
             )}
             {path === '/list' && (
                 <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
             )}
             {path === '/expense' ? 'Your Expenses' : 'Xpense Report'}
        </span>
        {!isActive && <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />}
      </Link>
    );
  };

  return (
    <div className="h-screen w-full bg-[#0f172a] text-slate-200 font-sans overflow-hidden relative selection:bg-cyan-500 selection:text-white">
      
      {/* AMBIENT BACKGROUND */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{animationDuration: '10s'}}></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{animationDuration: '15s'}}></div>

      <div className="flex h-full relative z-10">
        
        {/* SIDEBAR */}
        <aside className="w-80 h-full border-r border-white/10 bg-white/5 backdrop-blur-2xl flex flex-col justify-between p-6 shadow-2xl">
            <div className="flex items-center gap-3 px-2 py-2 mb-8">
                <div className="relative w-10 h-10 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative bg-[#0f172a] w-full h-full rounded-xl flex items-center justify-center border border-white/10">
                        <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
                  Xpense
                </span>
            </div>

            <div className="flex-1 space-y-3">
                 <div className="px-2 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Menu</div>
                 {getLinkClasses('/expense')}
                 {getLinkClasses('/list')}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
                <div className="group flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 p-[2px]">
                            <div className="w-full h-full bg-[#0f172a] rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white uppercase">{username.slice(0, 2)}</span>
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors truncate w-32">{username}</p>
                            <p className="text-xs text-slate-500">Pro Account</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="text-slate-500 hover:text-red-400 transition-colors" title="Logout">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    </button>
                </div>
            </div>
        </aside>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-10">
            <header className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                </div>
                
                {/* DATE & TIME CONTAINER */}
                <div className="flex flex-col items-end">
                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm text-slate-300 mb-1">
                        {currentTime.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                    {/* TINY TIME DISPLAY */}
                    <div className="text-[10px] font-mono text-slate-500 tracking-wider pr-2">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* CARD 1: QUICK STATS */}
                <div className="group relative p-[1px] rounded-3xl bg-gradient-to-b from-white/20 to-white/0 hover:from-cyan-500/50 hover:to-blue-500/50 transition-all duration-500">
                    <div className="h-64 rounded-[23px] bg-[#0f172a]/80 backdrop-blur-xl p-8 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                            </div>
                            {loading && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-cyan-500"></div>}
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">Total Spend</h3>
                            <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-white">
                                ${totalSpent.toFixed(2)}
                            </div>
                            <p className="text-slate-400 text-sm mt-2">Lifetime expenses recorded.</p>
                        </div>
                    </div>
                </div>

                {/* CARD 2: SINGLE RECENT TRANSACTION */}
                <div className="group relative p-[1px] rounded-3xl bg-gradient-to-b from-white/20 to-white/0 hover:from-violet-500/50 hover:to-purple-500/50 transition-all duration-500">
                    <div className="h-64 rounded-[23px] bg-[#0f172a]/80 backdrop-blur-xl p-8 flex flex-col relative overflow-hidden justify-between">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                         
                         <div className="flex justify-between items-start">
                             <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
                                Latest Activity
                             </h3>
                             <Link to="/list" className="text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors">
                                View All &rarr;
                             </Link>
                         </div>

                         {loading ? (
                            <div className="flex-1 flex items-center justify-center">
                                <p className="text-slate-500 text-sm animate-pulse">Loading...</p>
                            </div>
                         ) : latestTransaction ? (
                            <div className="flex-1 flex flex-col justify-center mt-2">
                                <p className="text-sm text-slate-400 mb-1 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    {latestTransaction.date ? new Date(latestTransaction.date).toLocaleDateString() : 'Recent'}
                                </p>
                                <h2 className="text-3xl font-bold text-white mb-2 truncate" title={latestTransaction.description}>
                                    {latestTransaction.description}
                                </h2>
                                <div className="text-5xl font-black font-mono text-violet-400 drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]">
                                    ${latestTransaction.amount.toFixed(2)}
                                </div>
                            </div>
                         ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 mb-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 00-2-2H7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                                </div>
                                <p className="text-slate-400 text-sm">No transactions yet.</p>
                            </div>
                         )}
                    </div>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
};

export default Home;