import React from 'react';
import { X, Clock, Camera, AlertCircle } from 'lucide-react';

interface ProofOfDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReportMissing: () => void;
  proof?: {
    deliveredAt: string;
    locationNote: string;
    signedBy?: string;
    photoUrl: string;
  };
}

export const ProofOfDeliveryModal: React.FC<ProofOfDeliveryModalProps> = ({
  isOpen,
  onClose,
  onReportMissing,
  proof,
}) => {
  if (!isOpen || !proof) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="proof-title"
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-slate-700" />
            <h3 id="proof-title" className="text-xs font-bold text-slate-900">Carrier Proof of Delivery</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60 transition"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3.5 overflow-y-auto">
          {/* Proof Photo */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-4/3">
            <img
              src={proof.photoUrl}
              alt="Proof of Delivery"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-300" />
              {proof.deliveredAt}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
              <span className="font-semibold text-slate-700 block text-[11px] uppercase tracking-wide">
                Driver Drop-Off Note
              </span>
              <p className="text-slate-800 font-medium">{proof.locationNote}</p>
            </div>

            {proof.signedBy && (
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-700">
                <span className="text-[11px] text-slate-500 font-medium">Signature:</span>
                <span className="font-semibold text-slate-900">{proof.signedBy}</span>
              </div>
            )}
          </div>

          {/* Disagreement action */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                onClose();
                onReportMissing();
              }}
              className="w-full py-2.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
              This is not my porch / Package is missing
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition"
            >
              Close Proof
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
