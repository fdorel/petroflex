/* 
 * Project: PetroFlex
 * File: client/app/page.jsx
 * Setup: Main dashboard layout integrating all functional modules.
 */
'use client';
import PricingBoard from '../components/PricingBoard';
import TankMonitor from '../components/TankMonitor';
import FuelCardManager from '../components/FuelCardManager';

export default function Dashboard() {
  return (
    <div className="min-h-screen p-6 space-y-8">
      <header className="flex justify-between items-center border-b border-slate-700 pb-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          PetroFlex
        </h1>
        <div className="flex gap-4">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">● Live</span>
          <span className="px-3 py-1 rounded-full bg-slate-700 text-xs">v2.4.0</span>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <PricingBoard />
        <TankMonitor />
        <FuelCardManager />
      </main>
    </div>
  );
}
