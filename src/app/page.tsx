"use client";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import AITemplateGenerator from "@/components/ai-template-generator";
import StorePreview from "@/components/store-preview";
import ProductManager from "@/components/product-manager";
import Dashboard from "@/components/dashboard";
import LandingPage from "@/components/landing-page";
import BackgroundLayout from "@/components/ui/background-layout";
import GlobalNav from "@/components/ui/global-nav";
import CustomerManager from "@/components/customer-manager";
import OrderManager from "@/components/order-manager";
import StoreSettings from "@/components/StoreSettings";

type View = "landing" | "dashboard" | "products" | "store" | "templates" | "customers" | "orders" | "settings";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("landing");

  return (
    <BackgroundLayout>
      <GlobalNav currentView={currentView} onNavigate={setCurrentView}>
        {currentView === "landing" && (
          <LandingPage onGetStarted={() => setCurrentView("dashboard")} />
        )}
        {currentView === "dashboard" && (
          <Dashboard onNavigate={setCurrentView} />
        )}
        {currentView === "products" && (
          <ProductManager onNavigate={setCurrentView} />
        )}
        {currentView === "store" && (
          <StorePreview onNavigate={setCurrentView} />
        )}
        {currentView === "templates" && (
          <AITemplateGenerator onNavigate={setCurrentView} />
        )}
        {currentView === "customers" && (
          <CustomerManager onNavigate={setCurrentView} />
        )}
        {currentView === "orders" && (
          <OrderManager onNavigate={setCurrentView} />
        )}
        {currentView === "settings" && (
          <StoreSettings onNavigate={setCurrentView} />
        )}
        {/* ... otros views */}
      </GlobalNav>
      <Toaster
        toastOptions={{
          style: {
            background: "rgba(15, 23, 42, 0.8)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "#fff",
          },
        }}
      />
    </BackgroundLayout>
  );
}