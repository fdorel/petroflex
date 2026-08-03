/* 
 * Project: PetroFlex
 * File: client/components/PricingBoard.jsx
 * Setup: Live pricing board with regional filter & Recharts trend visualization.
 */
'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../lib/api';

export default function PricingBoard() {
  const [prices, setPrices] = useState([]);
  const [region, setRegion] = useState('all');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchPrices();
  }, [region]);

  const fetchPrices = async () => {
    try {
      const res = await api.get('/prices', { params: { region } });
      setPrices(res.data);
      // Mock chart data from latest prices
      setChartData(res.data.map(p => ({ type: p.fuelType, price: p.pricePerLiter })));
    } catch (err) {
      console.error('Failed to fetch prices', err);
    }
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700 p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
        Live Fuel Pricing
      </h2>
      
      <div className="flex gap-3 mb-6">
        {['all', 'North', 'South', 'East', 'West'].map(r => (
          <button key={r} onClick={() => setRegion(r)} 
            className={`px-4 py-1 rounded-lg text-sm transition ${region === r ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50' : 'bg-slate-800 hover:bg-slate-700'}`}>
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {prices.map((p, i) => (
          <div key={i} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
            <div className="text-xs text-slate-400">{p.fuelType}</div>
            <div className="text-xl font-bold text-white">${p.pricePerLiter.toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="type" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
            <Line type="monotone" dataKey="price" stroke="#06b6d4" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
