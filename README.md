# SwiftTrack — Modern E-Commerce Mobile Order Tracking Screen

A production-grade mobile order tracking experience built for e-commerce applications, engineered to eliminate delivery ambiguity through clear visual hierarchy, dynamic milestones, and proactive situational UX.

Optimized specifically for **360px–430px mobile device viewports** with an integrated interactive evaluator toolbar and dual display mode (Smartphone Mockup vs. Fluid Responsive Screen).

---

## 🌟 Live Demo & Repository
- **Live Demo**: *[Deploy via Vercel / Netlify or run locally]*
- **GitHub Repository**: `[Your GitHub Repository Link]`
- **AI Prompt History**: Complete refined prompt log available at [`AI_PROMPT_HISTORY.txt`](./AI_PROMPT_HISTORY.txt).

---

## 🎯 Key Problem & Solutions Implemented

Legacy delivery screens merely showed static text labels (*Processing*, *Shipped*, *Out for Delivery*, *Delivered*), leading to confusion when real-world logistics complications arose. 

This redesigned solution handles the complete delivery lifecycle and explicitly solves all 3 critical edge scenarios:

### 1. ⚠️ Delayed Order
- **The Problem**: Estimated arrival window has elapsed due to air freight / weather holds.
- **The Solution**: 
  - Immediate visual alert banner with transparent explanation of the logistics bottleneck (e.g. FAA weather grounding).
  - Explicit revised ETA window (`Tomorrow, Oct 27 between 10:00 AM – 2:00 PM`).
  - Automatic courtesy store credit ($15) applied to customer account.
  - Actionable next steps: 1-click **Priority Courier Dispatch Request** and **Change Delivery Address** options.

### 2. 🚨 Delivered but Not Received
- **The Problem**: Courier marked parcel as delivered, but recipient reports it missing.
- **The Solution**:
  - High-visibility resolution banner highlighting exact drop-off timestamp (`Oct 24 at 1:42 PM`).
  - **Carrier Drop Photo Inspection**: Customers can tap **"Inspect Proof Photo"** to see driver doorstep photo and placement note (*Front Porch / Near Planter box*).
  - **One-Tap Dispute Flow**: Instant **Missing Parcel Claim (#DSP-8820)** button with guaranteed 24-hour refund/reship policy.
  - Direct hotline to emergency delivery dispatch.

### 3. ⏳ Tracking Not Available Yet
- **The Problem**: Customer ordered recently; courier barcode scan has not occurred yet.
- **The Solution**:
  - Eliminates broken/empty screens with a dedicated warehouse fulfillment pipeline card.
  - Real-time fulfillment progress gauge showing item picking, quality inspection, and packing (Shelf #B-14).
  - Countdown to courier hand-off (`Expected dispatch: Today by 6:00 PM`).
  - Interactive **"Alert Me on First Scan"** toggle that triggers automated SMS/email alerts upon initial courier scan.

---

## 🛠️ Feature Highlights

- **Visual Delivery Timeline**: Non-linear progress milestones with pulsing active states, carrier scan timestamps, geo-locations, and driver remarks.
- **Order & Product Summary**: Expandable item summary with product imagery, quantities, price breakdown (subtotal, shipping, taxes, promo discounts), and delivery address.
- **Carrier Logistics Card**: Verified carrier credentials (FedEx, DHL, UPS, OnTrac), copyable tracking number with clipboard toast notification, and driver contact action.
- **Interactive Support Modal**: Full issue reporting flow with issue categorizer, ticket submission (#TCK-4920), and instant live chat/callback triggers.
- **Interactive Reviewer Toolbar**: Evaluators can instantly switch between all 5 order scenarios and test the skeleton loading state with 1 click.
- **Device Viewport Toggle**: Switch seamlessly between a 390px iPhone mobile frame (with status bar and dynamic island) and full fluid responsive screen.

---

## 💻 Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks (`useState`, `useCallback`, `useContext`) + Toast Notification Context

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Node.js `v18.0.0` or later
- npm `v9.0.0` or later

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone <REPO_URL>
   cd assigment-demo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` to test the screen.

4. **Production Build & Verification**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 📱 Mobile Viewport Compliance (360px – 430px)

The UI was architected with a mobile-first philosophy:
- Minimum supported width: `360px` (e.g. Galaxy S8/S9, Xperia)
- Optimal target viewport: `390px` – `414px` (iPhone 12/13/14/15/16 Pro, Pixel 7)
- Maximum mobile width: `430px` (iPhone Pro Max, Plus models)
- Fluid desktop fallback for wide monitor inspection.

---

## 📄 License
MIT © 2026 Shafiqul Islam Sakib
