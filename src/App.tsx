import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { mockOrders } from './data/mockOrders';
import { OrderScenario } from './types/order';
import { MobileSimulator } from './components/layout/MobileSimulator';
import { DeliveryStatusCard } from './components/tracking/DeliveryStatusCard';
import { SituationalBanner } from './components/tracking/SituationalBanner';
import { DeliveryTimeline } from './components/tracking/DeliveryTimeline';
import { CarrierCard } from './components/tracking/CarrierCard';
import { OrderSummaryCard } from './components/tracking/OrderSummaryCard';
import { SupportModal } from './components/tracking/SupportModal';
import { ProofOfDeliveryModal } from './components/tracking/ProofOfDeliveryModal';
import { LoadingSkeleton } from './components/tracking/LoadingSkeleton';

const OrderTrackingApp: React.FC = () => {
  const [scenario, setScenario] = useState<OrderScenario>('out_for_delivery');
  const [isLoading, setIsLoading] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isProofOpen, setIsProofOpen] = useState(false);
  const [supportDefaultIssue, setSupportDefaultIssue] = useState<string | undefined>(undefined);

  const currentOrder = mockOrders[scenario];

  const handleOpenSupport = (defaultIssue?: string) => {
    setSupportDefaultIssue(defaultIssue);
    setIsSupportOpen(true);
  };

  const handleToggleLoading = () => {
    setIsLoading((prev) => !prev);
  };

  const handleScenarioChange = (newScenario: OrderScenario) => {
    setIsLoading(true);
    setScenario(newScenario);
    // Simulate natural brief data fetching transition
    setTimeout(() => {
      setIsLoading(false);
    }, 350);
  };

  return (
    <MobileSimulator
      activeScenario={scenario}
      onScenarioChange={handleScenarioChange}
      isLoading={isLoading}
      onToggleLoading={handleToggleLoading}
      onOpenSupport={() => handleOpenSupport()}
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {/* 1. Main Delivery Status Overview & Dynamic ETA */}
          <DeliveryStatusCard
            order={currentOrder}
            onOpenSupport={() => handleOpenSupport(scenario === 'delayed' ? 'delayed' : 'not_received')}
            onViewProof={() => setIsProofOpen(true)}
          />

          {/* 2. Situational Alert Banners (Delayed, Delivered Not Received, Tracking Not Available) */}
          <SituationalBanner
            order={currentOrder}
            onOpenSupport={() => handleOpenSupport('not_received')}
            onViewProof={() => setIsProofOpen(true)}
          />

          {/* 3. Detailed Visual Delivery Timeline with Milestone Statuses */}
          <DeliveryTimeline
            timeline={currentOrder.timeline}
            scenario={scenario}
          />

          {/* 4. Carrier Logistics & Driver Information */}
          <CarrierCard
            carrier={currentOrder.carrier}
            isPendingTracking={scenario === 'tracking_not_available'}
          />

          {/* 5. Collapsible Order / Product Summary with Address & Pricing */}
          <OrderSummaryCard
            items={currentOrder.items}
            pricing={currentOrder.pricing}
            shippingAddress={currentOrder.shippingAddress}
            placedAt={currentOrder.placedAt}
          />
        </>
      )}

      {/* Interactive Modals */}
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        orderId={currentOrder.orderId}
        defaultIssue={supportDefaultIssue}
      />

      <ProofOfDeliveryModal
        isOpen={isProofOpen}
        onClose={() => setIsProofOpen(false)}
        onReportMissing={() => {
          setIsProofOpen(false);
          handleOpenSupport('not_received');
        }}
        proof={currentOrder.proofOfDelivery}
      />
    </MobileSimulator>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <OrderTrackingApp />
    </ToastProvider>
  );
}
