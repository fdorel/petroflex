/* 
 * Project: PetroFlex
 * File: client/components/TankMonitor.jsx
 * Setup: Real-time tank level monitoring with <20% visual alerts & Recharts.
 */
'use client';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import api from '../lib/api';

export default function TankMonitor() {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    fetchInventory();
    // Poll every 10s for demo (replace with Socket.io in production)
    const interval = setInterval(fetchInventory, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await api.get('/inventory');
      setInventories(res.data);
    } catch (err) { console.error(err); }
  };

  const getBarColor = (level) => level < 20 ? '#ef4444' : level < 50 ? '#f59e0b' : '#10b981';

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700 p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
        Tank Level Monitoring
      </h2>

      {inventories.length === 0 ? (
        <div className="text-slate-500 text-center py-8">Loading inventory data...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 mb-6">
            {inventories.map((inv) => (
              <div key={inv._id} className={`p-3 rounded-lg border ${inv.tankLevel < 20 ? 'border-red-500/50 bg-red-500/10' : 'border-slate-700/50 bg-slate-800/50'} flex justify-between items-center`}>
                <div>
                  <div className="font-medium">{inv.stationId?.name || 'Unknown Station'}</div>
                  <div className="text-xs text-slate-400">{inv.tankLevel}% capacity</div>
                </div>
                {inv.tankLevel < 20 && <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded animate-pulse">LOW STOCK</span>}
              </div>
            ))}
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventories.map(i => ({ name: i.stationId?.name || 'S', level: i.tankLevel }))}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                <Bar dataKey="level" radius={[4, 4, 0, 0]}>
                  {inventories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.tankLevel)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
