import React, { useState } from 'react';
import { ShoppingBag, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { OrderItem, OrderPricing } from '../../types/order';

interface OrderSummaryCardProps {
  items: OrderItem[];
  pricing: OrderPricing;
  shippingAddress: {
    fullName: string;
    street: string;
    cityStateZip: string;
    notes?: string;
  };
  placedAt: string;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  items,
  pricing,
  shippingAddress,
  placedAt,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm space-y-4">
      {/* Header with expand/collapse */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 leading-tight">Order Items ({totalItemsCount})</h3>
            <span className="text-[11px] text-slate-500">Ordered on {placedAt}</span>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition"
          aria-label={isExpanded ? 'Collapse order summary' : 'Expand order summary'}
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Items list */}
      {isExpanded && (
        <div className="divide-y divide-slate-100">
          {items.map((item) => (
            <div key={item.id} className="py-3 first:pt-1 last:pb-1 flex items-center gap-3">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-xl border border-slate-200/80 bg-slate-50 shrink-0"
                onError={(e) => {
                  // Fallback for image load failure
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&q=80';
                }}
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-slate-800 truncate">{item.name}</h4>
                <p className="text-[11px] text-slate-500 truncate">{item.variant}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] text-slate-500 font-medium">Qty: {item.quantity}</span>
                  <span className="text-xs font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Pricing Breakdown */}
          <div className="pt-3.5 space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-slate-800">${pricing.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Courier Delivery</span>
              <span className="font-medium text-slate-800">
                {pricing.shipping === 0 ? (
                  <span className="text-emerald-600 font-semibold uppercase text-[10px]">Free</span>
                ) : (
                  `$${pricing.shipping.toFixed(2)}`
                )}
              </span>
            </div>
            {pricing.discount && pricing.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Discount / Promo</span>
                <span>-${pricing.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Estimated Tax</span>
              <span className="font-medium text-slate-800">${pricing.tax.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-slate-100 flex justify-between items-baseline text-sm font-bold text-slate-900">
              <span>Total Paid</span>
              <span className="text-base text-indigo-600">${pricing.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Destination Address */}
          <div className="pt-3.5 flex items-start gap-2.5 text-xs text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800 block">Delivering To</span>
              <p className="text-[11px] text-slate-600">{shippingAddress.fullName}</p>
              <p className="text-[11px] text-slate-600">{shippingAddress.street}</p>
              <p className="text-[11px] text-slate-600">{shippingAddress.cityStateZip}</p>
              {shippingAddress.notes && (
                <p className="text-[10px] text-slate-500 italic mt-0.5">Note: "{shippingAddress.notes}"</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
