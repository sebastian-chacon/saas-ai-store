"use client";
import { motion } from "framer-motion";
import { Button } from "./button";
import { 
  Store, Package, ShoppingCart, TrendingUp, 
  Users, Settings, Eye, Sparkles 
} from "lucide-react";

type View = "landing" | "dashboard" | "products" | "store" | "templates";

interface GlobalNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
  children: React.ReactNode;
}

export default function GlobalNav({ currentView, onNavigate, children }: GlobalNavProps) {
  // No mostrar Nav en la Landing Page
  if (currentView === "landing") return <>{children}</>;

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "products", label: "Productos", icon: Package },
    { id: "templates", label: "Plantillas IA", icon: Sparkles },
    { id: "orders", label: "Pedidos", icon: ShoppingCart },
    { id: "customers", label: "Clientes", icon: Users },
    { id: "settings", label: "Configuración", icon: Settings },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Global */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-slate-900/50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate("landing")}>
            <div className="relative">
              <Store className="w-7 h-7 text-purple-400" />
              <motion.div
                className="absolute inset-0 bg-purple-500/50 blur-lg"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              MiTienda
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => onNavigate("store")} className="border-white/20 text-white hover:bg-white/10">
              <Eye className="w-4 h-4 mr-2" /> Ver tienda
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-purple-600 to-cyan-600 flex items-center justify-center text-white text-sm font-semibold">MG</div>
              <span className="text-sm font-medium text-white hidden sm:inline">Mi Tienda Online</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Global */}
        <aside className="w-64 border-r border-white/10 backdrop-blur-xl bg-slate-900/30 hidden md:block">
          <nav className="p-4 space-y-1 sticky top-18.25">
            {menuItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as View)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    isActive 
                      ? "bg-linear-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 text-purple-300 font-medium" 
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-purple-400" : ""}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Contenido Dinámico */}
        <main className="flex-1 relative">
          {children}
        </main>
      </div>
    </div>
  );
}