import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Expense() {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // We can fetch username for the sidebar like in Home, or default to 'User'
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
    }
  };

  const handleAdd = async () => {
    if (description && amount) {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('http://localhost:5000/expenses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ description, amount: parseFloat(amount) })
        });
        if (response.ok) {
          const newExpense = await response.json();
          setExpenses([newExpense, ...expenses]);
          setDescription('');
          setAmount('');
        } else {
          setError('Failed to add expense');
        }
      } catch (error) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (expense) => {
    setDescription(expense.description);
    setAmount(expense.amount);
    setEditingId(expense._id);
  };

  const handleUpdate = async () => {
    if (description && amount && editingId) {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`http://localhost:5000/expenses/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ description, amount: parseFloat(amount) })
        });
        if (response.ok) {
          const updatedExpense = await response.json();
          setExpenses(expenses.map(exp => exp._id === editingId ? updatedExpense : exp));
          setDescription('');
          setAmount('');
          setEditingId(null);
        } else {
          setError('Failed to update expense');
        }
      } catch (error) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`http://localhost:5000/expenses/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          setExpenses(expenses.filter(exp => exp._id !== id));
        } else {
          setError('Failed to delete expense');
        }
      } catch (error) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setDescription('');
    setAmount('');
    setEditingId(null);
  };

  // Sidebar Link Helper
  const getLinkClasses = (path) => {
    const isActive = path === '/expense'; // Hardcoded active for this page
    
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
                 <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 00-2-2H7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
             )}
             {path === '/expense' ? 'Your Expenses' : 'Xpense Report'}
        </span>
        {!isActive && <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />}
      </Link>
    );
  };

  return (
    // BACKGROUND: Deep Space Theme
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
                <h2 className="text-4xl font-bold text-white tracking-tight">Manage Expenses</h2>
                {error && (
                    <div className="mt-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold w-fit">
                    {error}
                    </div>
                )}
             </div>

             {/* HOME BUTTON ADDED HERE */}
             <Link to="/home" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all group">
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                <span className="font-bold text-sm">Home</span>
             </Link>
          </div>
          
          {/* GLASS FORM CARD */}
          <div className="mb-8 p-1 rounded-3xl bg-gradient-to-b from-white/10 to-white/0">
            <div className="p-6 rounded-[23px] bg-[#0f172a]/60 backdrop-blur-xl border border-white/5 flex flex-col md:flex-row gap-4 items-end">
              
              <div className="flex-grow w-full">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Description</label>
                <input
                  type="text"
                  placeholder="What did you buy?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-4 rounded-xl bg-[#0f172a]/50 border border-white/10 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-slate-600 text-white font-medium"
                />
              </div>
              
              <div className="w-full md:w-48">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Amount ($)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-4 rounded-xl bg-[#0f172a]/50 border border-white/10 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder-slate-600 text-white font-medium"
                />
              </div>
              
              <div className="flex gap-2 w-full md:w-auto">
                <button
                  onClick={editingId ? handleUpdate : handleAdd}
                  disabled={loading}
                  className="flex-1 md:flex-none py-4 px-8 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.7)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '...' : editingId ? 'Update' : 'Add'}
                </button>
                
                {editingId && (
                  <button
                    onClick={handleCancel}
                    className="py-4 px-6 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-bold hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* IMPROVED FLOATING GLASS TABLE */}
          <div className="w-full">
            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="text-lg font-bold text-white">Transaction History</h3>
              <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full">
                {expenses.length} Items
              </span>
            </div>
            
            {expenses.length === 0 ? (
                <div className="p-16 rounded-3xl bg-white/5 border border-white/10 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-600">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <p className="text-slate-400 font-medium">No expenses found. Start adding to see them glow!</p>
                </div>
            ) : (
                <table className="w-full text-left border-separate border-spacing-y-3">
                    <thead>
                        <tr className="text-slate-500 uppercase text-[10px] font-extrabold tracking-widest">
                            <th className="pb-2 px-6 w-[40%]">Description</th>
                            <th className="pb-2 px-6">Date & Time</th>
                            <th className="pb-2 px-6 text-left">Amount</th>
                            <th className="pb-2 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-medium">
                        {expenses.map((expense) => (
                            <tr 
                                key={expense._id} 
                                className="bg-gradient-to-r from-white/5 to-transparent hover:from-white/10 hover:to-white/5 transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg hover:shadow-cyan-500/5 cursor-default group"
                            >
                                <td className="py-5 px-6 rounded-l-2xl text-slate-200 group-hover:text-white transition-colors">
                                    {expense.description}
                                </td>
                                
                                <td className="py-5 px-6 text-slate-400 text-xs">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-slate-600 group-hover:text-cyan-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        {expense.date ? new Date(expense.date).toLocaleString() : new Date().toLocaleString()}
                                    </div>
                                </td>
                                
                                <td className="py-5 px-6 text-left">
                                    <span className="font-mono text-lg font-bold text-cyan-400 drop-shadow-sm group-hover:text-cyan-300 transition-colors">
                                        ${expense.amount}
                                    </span>
                                </td>

                                <td className="py-5 px-6 text-right rounded-r-2xl">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button
                                            onClick={() => handleEdit(expense)}
                                            className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 hover:text-indigo-300 transition-colors text-xs font-bold"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(expense._id)}
                                            className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:text-red-300 transition-colors text-xs font-bold"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Expense;