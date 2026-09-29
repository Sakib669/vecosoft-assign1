import React from 'react';
import { 
  Truck, 
  AlertTriangle, 
  PackageCheck, 
  Clock, 
  PackageSearch,
  AlertCircle
} from 'lucide-react';
import { OrderData } from '../../types/order';

interface DeliveryStatusCardProps {
  order: OrderData;
  onOpenSupport: () => void;
  onViewProof?: () => void;
}

export const DeliveryStatusCard: React.FC<DeliveryStatusCardProps> = ({
  order,
  onOpenSupport,
  onViewProof,
}) => {
  // Scenario-specific badge configuration
  const getBadgeConfig = () => {
    switch (order.scenario) {
      case 'delayed':
        return {
          label: 'Delayed in Transit',
          icon: AlertTriangle,
          bg: 'bg-amber-100 text-amber-800 border-amber-300',
          indicatorBg: 'bg-amber-500',
          accentBorder: 'border-amber-400',
        };
      case 'delivered_not_received':
        return {
          label: 'Delivery Dispute Open',
          icon: AlertCircle,
          bg: 'bg-rose-100 text-rose-800 border-rose-300',
          indicatorBg: 'bg-rose-500',
          accentBorder: 'border-rose-400',
        };
      case 'tracking_not_available':
        return {
          label: 'Preparing Fulfillment',
          icon: Clock,
          bg: 'bg-blue-100 text-blue-800 border-blue-300',
          indicatorBg: 'bg-blue-500',
          accentBorder: 'border-blue-400',
        };
      case 'delivered':
        return {
          label: 'Delivered',
          icon: PackageCheck,
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          indicatorBg: 'bg-emerald-500',
          accentBorder: 'border-emerald-400',
        };
      case 'out_for_delivery':
      default:
        return {
          label: 'Out for Delivery',
          icon: Truck,
          bg: 'bg-indigo-100 text-indigo-800 border-indigo-300',
          indicatorBg: 'bg-indigo-600',
          accentBorder: 'border-indigo-400',
        };
    }
  };

  const badge = getBadgeConfig();
  const BadgeIcon = badge.icon;

  // Completion calculation for top mini progress bar
  const getProgressPercentage = () => {
    switch (order.scenario) {
      case 'tracking_not_available':
        return 20;
      case 'delayed':
        return 50;
      case 'out_for_delivery':
        return 80;
      case 'delivered':
      case 'delivered_not_received':
        return 100;
      default:
        return 50;
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm transition-all hover:shadow-md ${badge.accentBorder ? `border-t-4` : ''}`}>
      {/* Top Meta: Order ID & Status Badge */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">Order ID:</span>
          <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">{order.orderId}</span>
        </div>

        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${badge.indicatorBg} ${order.scenario === 'out_for_delivery' ? 'animate-ping' : ''}`} />
          <BadgeIcon className="w-3.5 h-3.5" />
          <span>{badge.label}</span>
        </div>
      </div>

      {/* Primary Headline & Dynamic ETA */}
      <div className="mt-4">
        <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
          {order.scenario === 'delivered' || order.scenario === 'delivered_not_received'
            ? 'Delivered Timestamp'
            : order.scenario === 'delayed'
            ? 'Revised Estimated Arrival'
            : 'Estimated Arrival'}
        </span>
        <div className="flex items-baseline gap-2 mt-0.5">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {order.scenario === 'delayed'
              ? order.delayExplanation?.revisedEta.split(' between ')[0] || 'Tomorrow, Oct 27'
              : order.scenario === 'delivered' || order.scenario === 'delivered_not_received'
              ? order.deliveredAt
              : order.estimatedDelivery}
          </h2>
        </div>

        <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-normal">
          {order.subtext}
        </p>
      </div>

      {/* Progress Bar Gauge */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex justify-between items-center text-[11px] font-medium text-slate-500 mb-1.5">
          <span>Delivery Progress</span>
          <span className="font-semibold text-slate-700">{getProgressPercentage()}% Complete</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              order.scenario === 'delayed'
                ? 'bg-amber-500'
                : order.scenario === 'delivered_not_received'
                ? 'bg-rose-500'
                : order.scenario === 'delivered'
                ? 'bg-emerald-500'
                : 'bg-indigo-600'
            }`}
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Action Shortcut footer */}
      {order.scenario === 'delivered_not_received' && onViewProof && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={onViewProof}
            className="flex-1 py-2 px-3 text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl border border-rose-200 transition flex items-center justify-center gap-1.5"
          >
            <PackageSearch className="w-3.5 h-3.5" />
            Inspect Proof Photo
          </button>
          <button
            onClick={onOpenSupport}
            className="flex-1 py-2 px-3 text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 rounded-xl shadow-sm transition"
          >
            Escalate to Agent
          </button>
        </div>
      )}

      {order.scenario === 'delayed' && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={onOpenSupport}
            className="w-full py-2 px-3 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5" />
            Request Expedited Transit Update
          </button>
        </div>
      )}
    </div>
  );
};
