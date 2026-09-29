import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse p-1">
      {/* Top Status Card Skeleton */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-slate-200 rounded w-28" />
          <div className="h-6 bg-slate-200 rounded-full w-24" />
        </div>
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-slate-200 rounded w-20" />
          <div className="h-7 bg-slate-200 rounded w-48" />
          <div className="h-3.5 bg-slate-200 rounded w-full" />
        </div>
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="flex justify-between">
            <div className="h-3 bg-slate-200 rounded w-24" />
            <div className="h-3 bg-slate-200 rounded w-16" />
          </div>
          <div className="h-2 bg-slate-200 rounded-full w-full" />
        </div>
      </div>

      {/* Timeline Skeleton */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-5">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-slate-200 rounded w-32" />
          <div className="h-3 bg-slate-200 rounded w-16" />
        </div>
        <div className="space-y-6 pt-2 pl-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-slate-200 shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-3.5 bg-slate-200 rounded w-36" />
                <div className="h-2.5 bg-slate-200 rounded w-48" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary Skeleton */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="h-4 bg-slate-200 rounded w-28" />
        <div className="flex gap-3 pt-2">
          <div className="w-14 h-14 bg-slate-200 rounded-xl shrink-0" />
          <div className="space-y-2 flex-1 pt-1">
            <div className="h-3.5 bg-slate-200 rounded w-40" />
            <div className="h-3 bg-slate-200 rounded w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};
