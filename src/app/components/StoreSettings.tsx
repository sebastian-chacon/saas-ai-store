"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Store, CreditCard, Bell, Shield, Palette, Save, ArrowLeft, Globe, Upload
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import AppearanceSection from "./AppearanceSection";
import TemplateSelector from "./TemplateSelector";

export default function StoreSettings({ onNavigate }: { onNavigate: (view: any) => void }) {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);


  const [storeConfig, setStoreConfig] = useState({
    name: "Mi Tienda Online",
    templateId: "premium-tech", // Template por defecto
    // Aquí podrías guardar el resto de la config que viene de AppearanceSection
  });

  const handleTemplateSelect = (id: string) => {
    setStoreConfig(prev => ({ ...prev, templateId: id }));
    toast.success(`Plantilla ${id} seleccionada`);
    // Opcional: Saltar automáticamente a apariencia
    // setActiveTab("appearance"); 
  };
  
  const menuItems = [
    { id: "general", label: "General", icon: Store },
    { id: "TeampleSelector", label: "Seleccionar Teample", icon: Shield },
    { id: "appearance", label: "Apariencia", icon: Palette },
    { id: "payments", label: "Pagos", icon: CreditCard },
    { id: "notifications", label: "Notificaciones", icon: Bell },
    { id: "security", label: "Seguridad", icon: Shield },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Cambios guardados correctamente");
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* HEADER DE LA SECCIÓN */}
      <div className="px-8 py-6 border-b border-white/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-6xl mx-auto w-full">
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="mb-2 text-slate-400 hover:text-white p-0 hover:bg-transparent"
              onClick={() => onNavigate("dashboard")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Panel de Control
            </Button>
            <h1 className="text-3xl font-bold text-white tracking-tight">Configuración</h1>
            <p className="text-slate-500 text-sm">Gestiona los detalles de tu negocio y su imagen.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-white/10 text-slate-400" onClick={() => onNavigate("dashboard")}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-emerald-600 hover:bg-emerald-500 text-white min-w-35">
              {isSaving ? "Guardando..." : <><Save className="w-4 h-4 mr-2" /> Guardar</>}
            </Button>
          </div>
        </div>

        {/* NAVEGACIÓN HORIZONTAL (Tabs en lugar de Sidebar) */}
        <div className="items-center gap-1 mt-8 grid md:grid-cols-3 lg:flex grid-cols-1 max-w-6xl mx-auto w-full">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all relative ${activeTab === item.id ? "text-white" : "text-slate-500 hover:text-slate-300"
                }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 border border-white/10 rounded-full -z-10"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ÁREA DE CONTENIDO (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-6xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeTab === "general" && (
              <motion.div key="general" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <Card className="p-8 bg-slate-900/40 border-white/10 space-y-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-24 h-24 rounded-3xl bg-white/5 border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-slate-500 hover:border-emerald-500/50 hover:text-emerald-400 cursor-pointer transition-all shrink-0">
                      <Upload className="w-6 h-6 mb-1" />
                      <span className="text-[10px] font-black">LOGO</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                      <div className="space-y-2">
                        <Label>Nombre de la Tienda</Label>
                        <Input className="bg-white/5 border-white/10" placeholder="Ej: Mi Tienda Online" />
                      </div>
                      <div className="space-y-2">
                        <Label>Dominio</Label>
                        <div className="flex gap-2">
                          <Input className="bg-white/5 border-white/10" placeholder="nombre" />
                          <div className="px-3 py-2 rounded-lg bg-white/5 text-slate-500 text-sm border border-white/10 flex items-center">.saas.com</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <Label>Descripción de la Tienda</Label>
                    <Textarea className="bg-white/5 border-white/10 min-h-30" placeholder="Cuéntale a tus clientes de qué trata tu negocio..." />
                  </div>
                </Card>

                <Card className="p-8 bg-slate-900/40 border-white/10">
                  <div className="flex items-center gap-3 mb-8">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-bold text-white tracking-tight">Región y Moneda</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Moneda Principal</Label>
                      <select className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-white">
                        <option>ARS - Peso Argentino</option>
                        <option>USD - Dólar Estadounidense</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Idioma</Label>
                      <select className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-white">
                        <option>Español (Latinoamérica)</option>
                        <option>English</option>
                      </select>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
            {activeTab === "TeampleSelector" && (
              <motion.div key="TeampleSelector" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <TemplateSelector />
              </motion.div>
            )}

            {activeTab === "appearance" && (
              <motion.div key="appearance" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <AppearanceSection />
              </motion.div>
            )}

            {activeTab === "payments" && (
              <motion.div
                key="payments"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card className="p-6 bg-slate-900/40 backdrop-blur-md border-white/10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <CreditCard className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">
                          Pasarelas de Pago
                        </h3>
                        <p className="text-sm text-slate-400">
                          Configura cómo recibirás el dinero.
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="border-white/10 hover:bg-white/5 text-white"
                    >
                      Conectar Proveedor
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {["Stripe", "Mercado Pago", "PayPal"].map((gateway) => (
                      <div
                        key={gateway}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-emerald-500/30 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center font-bold text-[10px] text-slate-400 uppercase tracking-tighter">
                            {gateway[0]}
                          </div>
                          <span className="font-medium text-slate-200">
                            {gateway}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
                          Desconectado
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}