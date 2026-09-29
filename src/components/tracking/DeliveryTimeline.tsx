import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  AlertTriangle, 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp,
  Circle,
  Truck
} from 'lucide-react';
import { TimelineStep } from '../../types/order';

interface DeliveryTimelineProps {
  timeline: TimelineStep[];
  scenario?: string;
}

export const DeliveryTimeline: React.FC<DeliveryTimelineProps> = ({ timeline }) => {
  const [showAllDetails, setShowAllDetails] = useState(true);

  const getStepIcon = (step: TimelineStep) => {
    switch (step.status) {
      case 'completed':
        return (
          <div className="w-7 h-7 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 shadow-xs">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        );
      case 'current':
        return (
          <div className="relative flex items-center justify-center">
            <span className="absolute w-7 h-7 rounded-full bg-indigo-400/30 animate-ping" />
            <div className="w-7 h-7 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-white shadow-md z-10">
              <Truck className="w-3.5 h-3.5" />
            </div>
          </div>
        );
      case 'delayed':
        return (
          <div className="relative flex items-center justify-center">
            <span className="absolute w-7 h-7 rounded-full bg-amber-400/30 animate-ping" />
            <div className="w-7 h-7 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-white shadow-md z-10">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
        );
      case 'alert':
        return (
          <div className="w-7 h-7 rounded-full bg-rose-600 border-2 border-white flex items-center justify-center text-white shadow-md z-10">
            <ShieldAlert className="w-3.5 h-3.5" />
          </div>
        );
      case 'upcoming':
      default:
        return (
          <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-slate-400">
            <Circle className="w-2.5 h-2.5 fill-slate-300 text-slate-300" />
          </div>
        );
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">Delivery Milestones</h3>
          <p className="text-xs text-slate-500">Live logistics scan updates</p>
        </div>
        <button
          onClick={() => setShowAllDetails(!showAllDetails)}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 transition"
        >
          {showAllDetails ? (
            <>
              Compact <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              All Details <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      <div className="relative pl-1">
        {timeline.map((step, index) => {
          const isLast = index === timeline.length - 1;
          const isCurrent = step.status === 'current';
          const isDelayed = step.status === 'delayed';
          const isAlert = step.status === 'alert';

          return (
            <div key={step.id} className="relative flex items-start gap-3.5 pb-6 last:pb-1 group">
              {/* Connecting vertical line */}
              {!isLast && (
                <div
                  className={`absolute left-[13px] top-7 bottom-0 w-0.5 ${
                    step.status === 'completed'
                      ? 'bg-emerald-400'
                      : isCurrent || isDelayed || isAlert
                      ? 'bg-slate-200'
                      : 'bg-slate-200'
                  }`}
                />
              )}

              {/* Status Icon */}
              <div className="shrink-0 relative z-10">{getStepIcon(step)}</div>

              {/* Step Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-baseline justify-between gap-2">
                  <h4
                    className={`text-xs font-bold leading-tight ${
                      isCurrent
                        ? 'text-indigo-900'
                        : isDelayed
                        ? 'text-amber-900'
                        : isAlert
                        ? 'text-rose-900'
                        : step.status === 'completed'
                        ? 'text-slate-800'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </h4>
                  {step.timestamp && (
                    <span className="text-[11px] font-mono text-slate-500 shrink-0">
                      {step.timestamp}
                    </span>
                  )}
                </div>

                <p
                  className={`text-xs mt-0.5 ${
                    isCurrent || isDelayed || isAlert ? 'text-slate-700' : 'text-slate-500'
                  }`}
                >
                  {step.description}
                </p>

                {/* Additional contextual badges: Location & Carrier notes */}
                {showAllDetails && (
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {step.location && (
                      <span className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {step.location}
                      </span>
                    )}

                    {step.carrierNote && (
                      <div
                        className={`text-[11px] px-2.5 py-1 rounded-lg w-full mt-1 border leading-relaxed ${
                          isDelayed
                            ? 'bg-amber-50 text-amber-900 border-amber-200'
                            : isAlert
                            ? 'bg-rose-50 text-rose-900 border-rose-200'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <span className="font-semibold">Courier Log:</span> {step.carrierNote}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
