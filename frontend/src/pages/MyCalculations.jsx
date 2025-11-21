import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MyCalculations() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sidebar Data
  const username = localStorage.getItem('username') || 'User';
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login'); 
  };

  const fetchExpenses = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/expenses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      } else {
        setError('Failed to fetch expenses');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  // --- EXPORT TO CSV FUNCTIONALITY ---
  const handleExportCSV = () => {
    if (expenses.length === 0) return;

    const headers = ["Description", "Date", "Amount"];
    const rows = expenses.map(expense => [
      `"${expense.description.replace(/"/g, '""')}"`, 
      `"${expense.date ? new Date(expense.date).toLocaleString() : new Date().toLocaleString()}"`,
      expense.amount.toFixed(2)
    ]);

    const csvContent = [
      headers.join(','), 
      ...rows.map(e => e.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `xpense_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  // Sidebar Link Helper
  const getLinkClasses = (path) => {
    const isActive = path === '/list'; 
    
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
    // BACKGROUND
    <div className="h-screen w-full bg-[#0f172a] text-slate-200 font-sans overflow-hidden relative selection:bg-cyan-500 selection:text-white">
      
      {/* AMBIENT BLOBS */}
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
        
        {/* MAIN DASHBOARD AREA */}
        <div className="flex-1 p-10 overflow-y-auto">
          
          {/* HEADER WITH HOME BUTTON */}
          <div className="flex justify-between items-end mb-8">
             <div>
                 <h2 className="text-4xl font-bold text-white tracking-tight mb-2">Xpense Report</h2>
                 <p className="text-slate-400">A detailed breakdown of your spending.</p>
                 {error && (
                    <div className="mt-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold w-fit">
                      {error}
                    </div>
                  )}
             </div>
             
             {/* HOME BUTTON */}
             <Link to="/home" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all group">
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                <span className="font-bold text-sm">Home</span>
             </Link>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-cyan-400 text-sm font-bold animate-pulse">Syncing Data...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
                
              {/* HERO TOTAL CARD */}
              <div className="relative p-[1px] rounded-3xl bg-gradient-to-r from-cyan-500/50 to-violet-500/50">
                  <div className="rounded-[23px] bg-[#0f172a]/80 backdrop-blur-xl p-8 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Expenses</h3>
                        <div className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-violet-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                            ${totalExpenses.toFixed(2)}
                        </div>
                    </div>
                    <div className="hidden md:flex w-16 h-16 rounded-full bg-white/5 items-center justify-center text-white/20">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                  </div>
              </div>

              {/* UNIFIED GLASS TABLE */}
              <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                  <h3 className="text-lg font-bold text-white">Transaction History</h3>
                  <div className="flex gap-2 items-center">
                      {/* EXPORT BUTTON */}
                      <button 
                        onClick={handleExportCSV} 
                        className="flex items-center gap-2 text-[10px] font-bold text-slate-300 hover:text-white px-4 py-1.5 rounded-full border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Download
                      </button>
                      <span className="text-xs font-bold text-violet-400 bg-violet-400/10 border border-violet-400/20 px-3 py-1.5 rounded-full">
                        {expenses.length} Records
                      </span>
                  </div>
                </div>
                
                {expenses.length === 0 ? (
                  <div className="p-16 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-600">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <p className="text-slate-400 font-medium">No data found.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="text-slate-500 uppercase text-[10px] font-extrabold tracking-widest border-b border-white/5 bg-white/5">
                          <th className="py-5 px-6 w-[40%]">Description</th>
                          <th className="py-5 px-6">Date & Time</th>
                          <th className="py-5 px-6 text-left">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm font-medium">
                        {expenses.map((expense) => (
                          <tr 
                            key={expense._id} 
                            className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200 last:border-b-0"
                          >
                            <td className="py-5 px-6 text-lg font-bold text-white">
                              {expense.description}
                            </td>
                            <td className="py-5 px-6 text-slate-400 text-sm">
                              <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                  {expense.date ? new Date(expense.date).toLocaleString() : new Date().toLocaleString()}
                              </div>
                            </td>
                            <td className="py-5 px-6 text-left">
                              <span className="font-mono text-xl font-bold text-cyan-400 drop-shadow-sm">
                                  ${expense.amount.toFixed(2)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCalculations;