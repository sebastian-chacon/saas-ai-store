'use client'
import { useState } from "react";
import { Toaster } from "./components/ui/sonner";
import AITemplateGenerator from "./components/ai-template-generator";
import StorePreview from "./components/store-preview";
import ProductManager from "./components/product-manager";
import Dashboard from "./components/dashboard";
import LandingPage from "./components/landing-page";

type View = "landing" | "dashboard" | "products" | "store" | "templates";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("landing");

  const renderView = () => {
    switch (currentView) {
      case "landing":
        return <LandingPage onGetStarted={() => setCurrentView("dashboard")} />;
      case "dashboard":
        return <Dashboard onNavigate={setCurrentView} />;
      case "products":
        return <ProductManager onNavigate={setCurrentView} />;
      case "store":
        return <StorePreview onNavigate={setCurrentView} />;
      case "templates":
        return <AITemplateGenerator onNavigate={setCurrentView} />;
      default:
        return <LandingPage onGetStarted={() => setCurrentView("dashboard")} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {renderView()}
      <Toaster />
    </div>
  );
}