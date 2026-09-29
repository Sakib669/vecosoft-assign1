import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  PhoneCall, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  LifeBuoy
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  defaultIssue?: string;
}

export const SupportModal: React.FC<SupportModalProps> = ({
  isOpen,
  onClose,
  orderId,
  defaultIssue,
}) => {
  const { showToast } = useToast();
  const [issueType, setIssueType] = useState(defaultIssue || 'not_received');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Support ticket #TCK-4920 created. Agent will reply within 15 minutes.', 'success');
    }, 900);
  };

  const handleReset = () => {
    setSubmitted(false);
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <h3 id="modal-title" className="text-sm font-bold text-slate-900">Delivery Resolution Center</h3>
              <p className="text-[11px] text-slate-500">Order: {orderId}</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Inquiry Case Submitted</h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                Ticket <strong className="text-slate-800">#TCK-4920</strong> has been assigned to our Last-Mile Priority Team. You will receive an SMS and email update shortly.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 text-left space-y-1">
                <div className="flex justify-between">
                  <span>Priority Level:</span>
                  <span className="font-semibold text-rose-600">Urgent Delivery Resolution</span>
                </div>
                <div className="flex justify-between">
                  <span>Expected Response:</span>
                  <span className="font-semibold text-slate-700">&lt; 15 minutes</span>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition shadow-xs mt-2"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Quick Contact Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    showToast('Connecting to 24/7 live AI delivery dispatcher...', 'info');
                  }}
                  className="p-3 rounded-2xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100/70 text-indigo-900 transition flex flex-col items-center text-center gap-1.5"
                >
                  <MessageSquare className="w-5 h-5 text-indigo-600" />
                  <span className="text-xs font-bold">Live Chat</span>
                  <span className="text-[10px] text-indigo-700/80">Wait time: ~1 min</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    showToast('Initiating priority callback to +1 (555) 019-2831', 'info');
                  }}
                  className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 transition flex flex-col items-center text-center gap-1.5"
                >
                  <PhoneCall className="w-5 h-5 text-slate-700" />
                  <span className="text-xs font-bold">Call Agent</span>
                  <span className="text-[10px] text-slate-500">Free instant callback</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-2 text-[11px] uppercase font-semibold text-slate-400 absolute">
                  Or Report an Issue
                </span>
              </div>

              {/* Issue selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  What is the issue with your delivery?
                </label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white text-slate-800"
                >
                  <option value="not_received">Package marked delivered, but I didn't get it</option>
                  <option value="delayed">Delivery is taking significantly longer than expected</option>
                  <option value="wrong_address">Incorrect delivery address on file</option>
                  <option value="damaged">Package arrived opened or damaged</option>
                  <option value="other">Other delivery inquiry</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Additional Details (Optional)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Checked with front desk, porch is empty. Buzzer was not rung..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-800 resize-none"
                />
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-[11px] text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Buyer Protection Guarantee: All claims resolved or refunded within 24h.</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? (
                  <span className="inline-block animate-spin mr-2">⏳</span>
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                {isSubmitting ? 'Transmitting Request...' : 'Submit Resolution Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
