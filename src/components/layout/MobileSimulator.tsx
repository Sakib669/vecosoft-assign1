import React, { useState } from 'react';
import { 
  Smartphone, 
  Monitor, 
  Wifi, 
  Battery, 
  Signal, 
  ArrowLeft, 
  HelpCircle,
  Truck,
  AlertTriangle,
  PackageCheck,
  Clock,
  RotateCcw
} from 'lucide-react';
import { OrderScenario } from '../../types/order';

interface MobileSimulatorProps {
  children: React.ReactNode;
  activeScenario: OrderScenario;
  onScenarioChange: (scenario: OrderScenario) => void;
  isLoading: boolean;
  onToggleLoading: () => void;
  onOpenSupport: () => void;
}

export const MobileSimulator: React.FC<MobileSimulatorProps> = ({
  children,
  activeScenario,
  onScenarioChange,
  isLoading,
  onToggleLoading,
  onOpenSupport,
}) => {
  const [viewMode, setViewMode] = useState<'mobile' | 'fluid'>('mobile');

  const scenarios: { id: OrderScenario; label: string; icon: React.FC<{ className?: string }>; tag: string }[] = [
    { id: 'out_for_delivery', label: '1. Out for Delivery', icon: Truck, tag: 'Standard' },
    { id: 'delayed', label: '2. Delayed Order', icon: AlertTriangle, tag: 'Requirement 1' },
    { id: 'delivered_not_received', label: '3. Delivered Not Received', icon: AlertTriangle, tag: 'Requirement 2' },
    { id: 'tracking_not_available', label: '4. Tracking Not Available', icon: Clock, tag: 'Requirement 3' },
    { id: 'delivered', label: '5. Delivered Clean', icon: PackageCheck, tag: 'Complete' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Reviewer Control Bar */}
      <header className="bg-slate-950/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Brand & Project Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md">
              ST
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-white tracking-tight">SwiftTrack E-Commerce</h1>
                <span className="text-[10px] uppercase font-bold bg-indigo-900/80 text-indigo-300 border border-indigo-700/60 px-2 py-0.5 rounded-full">
                  Interactive Evaluation Bar
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Candidate: <span className="text-slate-200 font-medium">Shafiqul Islam Sakib</span> · 360–430px Mobile Assessment
              </p>
            </div>
          </div>

          {/* Scenario Quick-Switcher Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            {scenarios.map((sc) => {
              const Icon = sc.icon;
              const isActive = activeScenario === sc.id && !isLoading;
              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    if (isLoading) onToggleLoading();
                    onScenarioChange(sc.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md scale-102'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sc.label}</span>
                  <span
                    className={`text-[9px] uppercase px-1 py-0.2 rounded ${
                      isActive ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {sc.tag}
                  </span>
                </button>
              );
            })}

            {/* Loading Toggle */}
            <button
              onClick={onToggleLoading}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                isLoading
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title="Simulate network loading skeleton"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Skeleton</span>
            </button>
          </div>

          {/* Viewport Frame Mode Toggle */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${
                viewMode === 'mobile' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Frame (390px)</span>
            </button>
            <button
              onClick={() => setViewMode('fluid')}
              className={`px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${
                viewMode === 'fluid' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Fluid Screen</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Canvas Area */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-6 lg:p-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
        {viewMode === 'mobile' ? (
          /* Mobile Smartphone Mockup Frame (390px optimal viewport) */
          <div className="relative w-full max-w-[410px] my-auto">
            {/* Phone outer bezel */}
            <div className="relative rounded-[48px] bg-slate-800 p-3 shadow-2xl ring-1 ring-slate-700/60 shadow-black/80">
              {/* Inner screen border */}
              <div className="rounded-[38px] overflow-hidden bg-slate-50 text-slate-900 border border-slate-300/40 flex flex-col h-[844px] shadow-inner relative">
                {/* Mobile Status Bar */}
                <div className="bg-white/95 backdrop-blur-md px-6 pt-3 pb-2 flex items-center justify-between text-xs text-slate-800 select-none border-b border-slate-100 z-30">
                  <span className="font-semibold text-xs tracking-tight">9:41</span>
                  {/* Dynamic Island / Camera Notch */}
                  <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto" />
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Signal className="w-3 h-3" />
                    <Wifi className="w-3 h-3" />
                    <Battery className="w-4 h-4" />
                  </div>
                </div>

                {/* Mobile App Navigation Bar */}
                <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 flex items-center justify-between border-b border-slate-200/80 sticky top-0 z-20">
                  <button
                    onClick={() => {}}
                    className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
                    aria-label="Back to store"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="text-center">
                    <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Track Package
                    </h2>
                    <span className="text-[10px] text-slate-500 font-medium">Real-time GPS Sync</span>
                  </div>
                  <button
                    onClick={onOpenSupport}
                    className="p-1.5 text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition"
                    aria-label="Open support"
                  >
                    <HelpCircle className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Content Scroll View */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
                  {children}
                </div>

                {/* Sticky Bottom Action Bar inside Mobile View */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200/80 flex items-center gap-2 z-20 shadow-lg">
                  <button
                    onClick={onOpenSupport}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <HelpCircle className="w-4 h-4 text-slate-300" />
                    <span>Need Help with Delivery?</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Fluid Screen View */
          <div className="w-full max-w-xl mx-auto bg-slate-50 text-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-300/40">
            {/* Fluid Header */}
            <div className="bg-white px-5 py-4 flex items-center justify-between border-b border-slate-200 sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <button
                  className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Track Package</h2>
                  <p className="text-xs text-slate-500">Live order delivery dashboard</p>
                </div>
              </div>
              <button
                onClick={onOpenSupport}
                className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4" />
                Help & Dispute
              </button>
            </div>

            <div className="p-5 space-y-4">{children}</div>
          </div>
        )}
      </main>
    </div>
  );
};
