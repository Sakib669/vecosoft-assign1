import React, { useState } from 'react';
import { Truck, Copy, Check, Phone, ShieldCheck, User } from 'lucide-react';
import { CarrierInfo } from '../../types/order';
import { useToast } from '../../context/ToastContext';

interface CarrierCardProps {
  carrier: CarrierInfo;
  isPendingTracking?: boolean;
}

export const CarrierCard: React.FC<CarrierCardProps> = ({ carrier, isPendingTracking }) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (isPendingTracking) return;
    navigator.clipboard.writeText(carrier.trackingNumber);
    setCopied(true);
    showToast(`Tracking number ${carrier.trackingNumber} copied to clipboard!`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 leading-tight">{carrier.name}</h4>
            <span className="text-[11px] text-slate-500">{carrier.service}</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          Verified
        </div>
      </div>

      {/* Tracking Number Section */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">
            Tracking Number
          </span>
          <span className="font-mono text-xs font-bold text-slate-800 truncate block">
            {carrier.trackingNumber}
          </span>
        </div>

        {!isPendingTracking && (
          <button
            onClick={handleCopy}
            className="p-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 transition flex items-center gap-1 text-xs shrink-0 shadow-xs"
            title="Copy tracking number"
            aria-label="Copy tracking code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px] font-medium text-emerald-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium">Copy</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Driver info if assigned */}
      {carrier.driverName && (
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
              <User className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold text-slate-800">{carrier.driverName}</span>
              {carrier.driverVehicle && (
                <span className="text-[11px] text-slate-400 block">{carrier.driverVehicle}</span>
              )}
            </div>
          </div>

          {carrier.phone && (
            <a
              href={`tel:${carrier.phone}`}
              onClick={(e) => {
                e.preventDefault();
                showToast(`Dialing carrier line: ${carrier.phone}`, 'info');
              }}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              Call
            </a>
          )}
        </div>
      )}
    </div>
  );
};
