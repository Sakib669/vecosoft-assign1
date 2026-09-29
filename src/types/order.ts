export type OrderScenario = 
  | 'out_for_delivery'
  | 'delayed'
  | 'delivered_not_received'
  | 'tracking_not_available'
  | 'delivered';

export type StepStatus = 'completed' | 'current' | 'upcoming' | 'delayed' | 'alert';

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  timestamp?: string;
  location?: string;
  status: StepStatus;
  carrierNote?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface CarrierInfo {
  name: string;
  trackingNumber: string;
  service: string;
  phone?: string;
  driverName?: string;
  driverVehicle?: string;
}

export interface OrderPricing {
  subtotal: number;
  shipping: number;
  tax: number;
  discount?: number;
  total: number;
}

export interface OrderData {
  orderId: string;
  scenario: OrderScenario;
  placedAt: string;
  estimatedDelivery: string;
  deliveredAt?: string;
  carrier: CarrierInfo;
  shippingAddress: {
    fullName: string;
    street: string;
    cityStateZip: string;
    notes?: string;
  };
  items: OrderItem[];
  pricing: OrderPricing;
  headline: string;
  subtext: string;
  statusType: 'success' | 'warning' | 'error' | 'info';
  timeline: TimelineStep[];
  delayExplanation?: {
    cause: string;
    revisedEta: string;
    actionableAdvice: string;
  };
  proofOfDelivery?: {
    deliveredAt: string;
    locationNote: string;
    signedBy?: string;
    photoUrl: string;
  };
}
