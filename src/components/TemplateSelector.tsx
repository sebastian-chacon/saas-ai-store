"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor, Smartphone, CheckCircle2, Sparkles,
  ArrowRight, RefreshCw, Wand2, Zap, Play,
  Layout, ArrowLeft, Search, ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const MASTER_TEMPLATES = [
  {
    id: "premium-tech",
    name: "Nexus Onyx",
    tag: "High-Tech",
    previewImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "luxury-fashion",
    name: "Vogue & Silk",
    tag: "Luxury",
    previewImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
  }
];

export default function TemplateSelector() {
  const [mode, setMode] = useState<"manual" | "ai">("manual");
  const [selectedTemplate, setSelectedTemplate] = useState(MASTER_TEMPLATES[0].id);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");

  const handleAiGenerate = () => {
    if (!aiPrompt) return toast.error("Escribe tu visión");
    setIsAiGenerating(true);
    setTimeout(() => {
      setIsAiGenerating(false);
      toast.success("Interfaz generada por la IA");
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto min-h-150 flex flex-col">

      <AnimatePresence mode="wait">
        {mode === "manual" ? (
          /* --- VISTA 1: PLANTILLAS POR DEFECTO --- */
          <motion.div
            key="manual-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase">Elige tu Base</h2>
                <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em]">Selecciona un diseño curado o deja que la IA cree algo único.</p>
              </div>
              <Button
                onClick={() => setMode("ai")}
                className="bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black px-8 rounded-xl group"
              >
                <Sparkles className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                GENERAR CON IA
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {MASTER_TEMPLATES.map((tpl) => (
                <Card
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl.id)}
                  className={`group relative overflow-hidden bg-slate-900/40 border-white/5 cursor-pointer transition-all duration-500 ${selectedTemplate === tpl.id ? 'ring-2 ring-emerald-500' : ''}`}
                >
                  <div className="aspect-video relative">
                    <img src={tpl.previewImage} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 group-hover:opacity-0 transition-opacity" />
                    <div className="absolute bottom-6 left-6">
                      <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{tpl.tag}</p>
                      <h3 className="text-2xl font-black text-white italic">{tpl.name.toUpperCase()}</h3>
                    </div>
                    {selectedTemplate === tpl.id && (
                      <div className="absolute top-6 right-6 bg-emerald-500 p-1 rounded-full text-black">
                        <CheckCircle2 size={20} />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-end pt-8">
              <Button className="px-12 bg-white text-black font-black uppercase tracking-widest rounded-xl">
                Confirmar Selección <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        ) : (
          /* --- VISTA 2: STUDIO DE IA (REMPLAZA TODO) --- */
          <motion.div
            key="ai-view"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setMode("manual")}
                className="text-slate-500 hover:text-white"
              >
                <ArrowLeft className="mr-2 w-4 h-4" /> Volver a lo básico
              </Button>
              <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/5">
                <button onClick={() => setPreviewDevice("desktop")} className={`p-2 rounded-lg ${previewDevice === 'desktop' ? 'bg-white text-black' : 'text-slate-500'}`}><Monitor size={16} /></button>
                <button onClick={() => setPreviewDevice("mobile")} className={`p-2 rounded-lg ${previewDevice === 'mobile' ? 'bg-white text-black' : 'text-slate-500'}`}><Smartphone size={16} /></button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-center">
              {/* LADO IZQUIERDO: INPUT CENTRAL Y STATUS */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <Wand2 size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">AI Engine Active</span>
                  </div>
                  <h2 className="text-5xl font-black text-white tracking-tighter leading-tight">¿Qué tienes en mente <br /> <span className="text-purple-500 italic">hoy?</span></h2>
                </div>

                <div className="relative group">
                  <Input
                    placeholder="Escribe el alma de tu negocio..."
                    className="h-14 bg-white/5 border-white/10 text-xl pl-6 pr-44 rounded-3xl focus:ring-purple-500/50 transition-all shadow-2xl"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                  <Button
                    onClick={handleAiGenerate}
                    disabled={isAiGenerating}
                    className="absolute right-3 top-3 bottom-3 bg-white text-black hover:bg-slate-200 px-8 rounded-2xl font-black uppercase tracking-tighter"
                  >
                    {isAiGenerating ? <RefreshCw className="animate-spin" /> : "Construir UI"}
                  </Button>
                </div>
              </div>

              {/* LADO DERECHO: PREVIEW DINÁMICO */}
              <div className="relative">
                <AnimatePresence>
                  {isAiGenerating && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute inset-0 z-10 bg-black/60 backdrop-blur-md rounded-[2.5rem] flex flex-col items-center justify-center text-center p-8"
                    >
                      <RefreshCw className="w-12 h-12 text-purple-500 animate-spin mb-4" />
                      <p className="text-white font-bold italic tracking-tighter">LA IA ESTÁ ESCRIBIENDO EL CÓDIGO...</p>
                      <div className="w-48 h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-purple-500"
                          initial={{ width: 0 }} animate={{ width: "100%" }}
                          transition={{ duration: 3 }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Card className={`relative overflow-hidden border-white/10 bg-[#050505] shadow-[0_0_80px_-20px_rgba(168,85,247,0.3)] transition-all duration-700 ${previewDevice === 'mobile' ? 'w-75 h-125 mx-auto rounded-[3rem] border-8 border-slate-900' : 'w-full aspect-4/5 rounded-[2.5rem]'
                  }`}>
                  {/* SIMULADOR DE TIENDA GENERADA */}
                  <div className="h-full flex flex-col">
                    <nav className="p-6 flex justify-between">
                      <div className="w-12 h-2 bg-white/20 rounded-full" />
                      <div className="flex gap-2">
                        <div className="w-4 h-4 bg-white/10 rounded-full" />
                        <div className="w-4 h-4 bg-white/10 rounded-full" />
                      </div>
                    </nav>
                    <div className="flex-1 p-8 space-y-4">
                      <div className="w-full h-40 bg-white/5 rounded-3xl animate-pulse" />
                      <div className="w-2/3 h-8 bg-white/10 rounded-full" />
                      <div className="w-full h-4 bg-white/5 rounded-full" />
                      <div className="w-1/2 h-4 bg-white/5 rounded-full" />
                      <div className="pt-8 grid grid-cols-2 gap-4">
                        <div className="aspect-square bg-white/5 rounded-2xl" />
                        <div className="aspect-square bg-white/5 rounded-2xl" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}