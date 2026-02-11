"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { 
  Store, Package, ShoppingCart, TrendingUp, 
  Users, Settings, Eye, Sparkles, Menu, X 
} from "lucide-react";

type View = "landing" | "dashboard" | "products" | "store" | "templates" | "customers" | "orders" | "settings";

interface GlobalNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
  children: React.ReactNode;
}

export default function GlobalNav({ currentView, onNavigate, children }: GlobalNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (currentView === "landing") return <>{children}</>;

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "products", label: "Productos", icon: Package },
    { id: "templates", label: "Plantillas IA", icon: Sparkles },
    { id: "orders", label: "Pedidos", icon: ShoppingCart },
    { id: "customers", label: "Clientes", icon: Users },
    { id: "settings", label: "Configuración", icon: Settings },
  ];

  const handleNavigate = (id: View) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    // 1. Agregamos h-screen y overflow-hidden al contenedor padre
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header Global - FIXED (No se mueve nunca) */}
      <header className="shrink-0 border-b border-white/10 backdrop-blur-xl bg-slate-900/50 z-50">
        <div className="px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsOpen(true)}
              className="p-2 -ml-2 text-slate-400 hover:text-white md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>

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
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => onNavigate("store")} className="hidden sm:flex border-white/20 text-white hover:bg-white/10">
              <Eye className="w-4 h-4 mr-2" /> Ver tienda
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-purple-600 to-cyan-600 flex items-center justify-center text-white text-sm font-semibold">MG</div>
              <span className="text-sm font-medium text-white hidden lg:inline">Mi Tienda Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Cuerpo inferior (Sidebar + Main) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar Desktop - FIJO (No scrollea con el contenido) */}
        <aside className="w-64 border-r border-white/10 backdrop-blur-xl bg-slate-900/30 hidden md:block shrink-0 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <NavButton 
                key={item.id} 
                item={item} 
                isActive={currentView === item.id} 
                onClick={() => handleNavigate(item.id as View)} 
              />
            ))}
          </nav>
        </aside>

        {/* Sidebar Mobile (Drawer) */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
              />
              <motion.aside
                initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-72 bg-slate-900 border-r border-white/10 z-60 md:hidden p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Store className="w-6 h-6 text-purple-400" />
                    <span className="font-bold text-white">Navegación</span>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <NavButton 
                      key={item.id} 
                      item={item} 
                      isActive={currentView === item.id} 
                      onClick={() => handleNavigate(item.id as View)} 
                    />
                  ))}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* CONTENIDO DINÁMICO - EL ÚNICO QUE SCROLLEA */}
        <main className="flex-1 overflow-y-auto relative overflow-x-hidden custom-scrollbar">
          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavButton({ item, isActive, onClick }: { item: any; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        isActive 
          ? "bg-linear-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 text-purple-300 font-medium shadow-[0_0_15px_rgba(168,85,247,0.1)]" 
          : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
      }`}
    >
      <item.icon className={`w-5 h-5 ${isActive ? "text-purple-400" : ""}`} />
      {item.label}
    </button>
  );
}