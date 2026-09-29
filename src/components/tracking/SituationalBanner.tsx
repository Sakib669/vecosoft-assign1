import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  Sparkles, 
  Bell, 
  Check, 
  ShieldAlert, 
  Camera,
  MessageSquare
} from 'lucide-react';
import { OrderData } from '../../types/order';
import { useToast } from '../../context/ToastContext';

interface SituationalBannerProps {
  order: OrderData;
  onOpenSupport: () => void;
  onViewProof?: () => void;
}

export const SituationalBanner: React.FC<SituationalBannerProps> = ({
  order,
  onOpenSupport,
  onViewProof,
}) => {
  const { showToast } = useToast();
  const [subscribedNotifications, setSubscribedNotifications] = useState(false);
  const [claimStatus, setClaimStatus] = useState<'idle' | 'opened'>('idle');

  // 1. DELAYED ORDER STATE
  if (order.scenario === 'delayed') {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50/90 p-4 text-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-200/80 text-amber-900 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-amber-800" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-amber-950">
                Shipment Delay Explanation
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-200/60 text-amber-900">
                Air Freight Hold
              </span>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              {order.delayExplanation?.cause}
            </p>

            <div className="mt-2.5 p-2.5 rounded-xl bg-white/80 border border-amber-200/80 text-xs space-y-1 text-slate-700">
              <div className="flex items-center gap-1.5 font-semibold text-amber-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Automatic Courtesy Compensation
              </div>
              <p className="text-[11px] text-slate-600">
                {order.delayExplanation?.actionableAdvice}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  showToast('Priority dispatch request submitted to carrier dispatch.', 'success');
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition"
              >
                Confirm Priority Delivery
              </button>
              <button
                onClick={onOpenSupport}
                className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold transition"
              >
                Change Delivery Address
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. DELIVERED BUT NOT RECEIVED STATE
  if (order.scenario === 'delivered_not_received') {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50/90 p-4 text-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-rose-200/80 text-rose-900 shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5 text-rose-700" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-rose-950">
                Cannot Find Your Package?
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-200/60 text-rose-900">
                Action Required
              </span>
            </div>

            <p className="text-xs text-rose-900/90 leading-relaxed">
              The carrier marked this as delivered at <strong className="font-semibold">{order.deliveredAt}</strong>, but you haven't received it. Here are your guaranteed resolution steps:
            </p>

            <div className="grid grid-cols-1 gap-2 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-white/90 border border-rose-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 block text-xs">1. Carrier Drop Photo</span>
                  <span className="text-[11px] text-slate-500">View proof photo captured by driver at doorstep</span>
                </div>
                <button
                  onClick={onViewProof}
                  className="px-2.5 py-1 text-xs font-semibold bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg transition shrink-0 flex items-center gap-1"
                >
                  <Camera className="w-3.5 h-3.5" />
                  View Photo
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-white/90 border border-rose-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 block text-xs">2. Open Instant Lost Claim</span>
                  <span className="text-[11px] text-slate-500">
                    {claimStatus === 'opened' ? 'Case #DSP-8820 in review (refund/reship)' : 'Guaranteed 24-hr refund or free replacement'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setClaimStatus('opened');
                    showToast('Missing Parcel Claim #DSP-8820 opened. Resolution team notified.', 'warning');
                  }}
                  disabled={claimStatus === 'opened'}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition shrink-0 ${
                    claimStatus === 'opened'
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      : 'bg-rose-600 hover:bg-rose-700 text-white'
                  }`}
                >
                  {claimStatus === 'opened' ? 'Claim Filed' : 'File Claim'}
                </button>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[11px]">Need urgent phone assistance?</span>
              <button
                onClick={onOpenSupport}
                className="text-rose-700 hover:text-rose-900 font-semibold flex items-center gap-1 transition"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Live Agent Hotline
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. TRACKING NOT AVAILABLE YET STATE
  if (order.scenario === 'tracking_not_available') {
    return (
      <div className="rounded-2xl border border-blue-200 bg-blue-50/90 p-4 text-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-blue-200/80 text-blue-900 shrink-0 mt-0.5">
            <Clock className="w-5 h-5 text-blue-700" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-blue-950">
                Tracking Number Assigning Soon
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-200/60 text-blue-900">
                Processing Order
              </span>
            </div>

            <p className="text-xs text-blue-900/90 leading-relaxed">
              Your order is safe! Our fulfillment center is currently inspecting and boxing your items. Tracking links activate within 1–4 hours of courier pickup.
            </p>

            {/* Warehouse step progress preview */}
            <div className="p-3 bg-white/90 border border-blue-200/80 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">Fulfillment Pipeline</span>
                <span className="text-blue-700 font-mono text-[11px]">Step 2 of 4</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full w-2/5 animate-pulse" />
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span className="text-blue-700 font-medium">Picking & Boxing</span>
                <span>Expected Dispatch: Today by 6:00 PM</span>
              </div>
            </div>

            {/* Notification toggle */}
            <div className="pt-1 flex items-center justify-between">
              <button
                onClick={() => {
                  setSubscribedNotifications(!subscribedNotifications);
                  showToast(
                    subscribedNotifications
                      ? 'SMS & Email notifications disabled.'
                      : 'Subscribed! You will receive live SMS when courier scans package.',
                    'success'
                  );
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  subscribedNotifications
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                }`}
              >
                {subscribedNotifications ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    SMS Alerts Activated
                  </>
                ) : (
                  <>
                    <Bell className="w-3.5 h-3.5" />
                    Alert Me on First Scan
                  </>
                )}
              </button>

              <button
                onClick={onOpenSupport}
                className="text-xs text-slate-600 hover:text-blue-700 font-medium transition"
              >
                Questions? Ask Support
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No situational banner needed for standard delivered / in-transit (clean display)
  return null;
};
