/* 
 * Project: PetroFlex
 * File: client/components/FuelCardManager.jsx
 * Setup: Corporate card balance, transaction history mock, & freeze functionality.
 */
'use client';
import { useState } from 'react';
import api from '../lib/api';

export default function FuelCardManager() {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCard = async () => {
    setLoading(true);
    try {
      // Mock ID for demo (replace with auth context)
      const res = await api.get('/cards/60d5ec49e1b8c02f3c3e1a1b'); 
      setCard(res.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const freezeCard = async () => {
    try {
      await api.post(`/cards/freeze/${card._id}`);
      fetchCard();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700 p-6 shadow-lg lg:col-span-2">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
        Corporate Fuel Card Management
      </h2>

      {!card ? (
        <button onClick={fetchCard} disabled={loading} 
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-lg font-medium transition shadow-lg shadow-cyan-500/20">
          {loading ? 'Loading...' : 'Load Corporate Card'}
        </button>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
            <div className="text-sm text-slate-400">Card Status</div>
            <div className={`text-lg font-bold ${card.status === 'active' ? 'text-emerald-400' : 'text-red-400'}`}>{card.status.toUpperCase()}</div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
            <div className="text-sm text-slate-400">Available Balance</div>
            <div className="text-xl font-bold text-white">${card.decryptedBalance || '0.00'}</div>
          </div>
          <button onClick={freezeCard} 
            className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 rounded-lg transition">
            Freeze Card
          </button>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-slate-700/50">
        <h3 className="text-sm font-medium text-slate-400 mb-2">Recent Transactions</h3>
        <div className="space-y-2">
          {[1,2,3].map(i => (
            <div key={i} className="flex justify-between items-center p-2 bg-slate-800/30 rounded text-sm">
              <span className="text-slate-300">Ref: TXN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              <span className="text-emerald-400">-${(Math.random() * 150 + 20).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
