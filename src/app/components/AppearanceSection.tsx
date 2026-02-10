"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Type,
  Monitor,
  Smartphone,
  ShoppingBag,
  Sparkles,
  RefreshCw,
  Layout,
  MousePointer2,
  Save,
  Search,
  Menu,
  Star,
  ChevronRight,
  Undo2,
  Redo2
} from "lucide-react";
import { Card } from "./ui/card";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

// --- TIPOS ---
interface ThemeConfig {
  brandName: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  cardColor: string;
  fontId: string;
  borderRadius: number;
  isGlassmorphism: boolean;
  shadowIntensity: number;
}

const colorThemes = [
  { name: "Esmeralda", primary: "#10b981", secondary: "#34d399", bg: "#020617", card: "#0f172a" },
  { name: "Océano", primary: "#0ea5e9", secondary: "#38bdf8", bg: "#0f172a", card: "#1e293b" },
  { name: "Violeta", primary: "#8b5cf6", secondary: "#a78bfa", bg: "#020617", card: "#0f172a" },
  { name: "Rosa Neón", primary: "#f43f5e", secondary: "#fb7185", bg: "#000000", card: "#111111" },
];

const fonts = [
  { id: "sans", name: "Inter Tight", style: "font-sans", desc: "Moderno y Limpio" },
  { id: "serif", name: "Playfair Display", style: "font-serif", desc: "Elegante y Lujoso" },
  { id: "mono", name: "JetBrains Mono", style: "font-mono", desc: "Técnico y Preciso" },
];

export default function AppearanceSection() {
  const [config, setConfig] = useState<ThemeConfig>({
    brandName: "MagicBuy",
    primaryColor: colorThemes[0].primary,
    secondaryColor: colorThemes[0].secondary,
    backgroundColor: colorThemes[0].bg,
    cardColor: colorThemes[0].card,
    fontId: fonts[0].id,
    borderRadius: 12,
    isGlassmorphism: true,
    shadowIntensity: 0.2
  });

  // --- ESTADOS DE HISTORIAL ---
  const [history, setHistory] = useState<ThemeConfig[]>([]);
  const [redoStack, setRedoStack] = useState<ThemeConfig[]>([]);

  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");

  const currentFont = fonts.find(f => f.id === config.fontId) || fonts[0];

  // --- LÓGICA DE HISTORIAL ---
  const pushToHistory = (newConfig: ThemeConfig) => {
    setHistory(prev => [...prev, config]);
    setRedoStack([]); // Al hacer un cambio nuevo, limpiamos el redo
    setConfig(newConfig);
  };

  const undo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setRedoStack(prev => [config, ...prev]);
    setHistory(prev => prev.slice(0, -1));
    setConfig(previous);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setHistory(prev => [...prev, config]);
    setRedoStack(prev => prev.slice(1));
    setConfig(next);
  };

  const updateConfig = (key: keyof ThemeConfig, value: any) => {
    pushToHistory({ ...config, [key]: value });
  };

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomTheme = colorThemes[Math.floor(Math.random() * colorThemes.length)];
      const aiConfig = {
        ...config,
        primaryColor: randomTheme.primary,
        secondaryColor: randomTheme.secondary,
        backgroundColor: randomTheme.bg,
        cardColor: randomTheme.card,
        borderRadius: Math.floor(Math.random() * 20),
        fontId: fonts[Math.floor(Math.random() * fonts.length)].id
      };
      pushToHistory(aiConfig);
      setIsGenerating(false);
      setShowAIPanel(false);
      toast.success("ADN de marca generado con éxito");
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-10 max-w-375 mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight italic">MOTOR DE DISEÑO</h2>
            <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em]">Personalización en tiempo real</p>
          </div>
          {/* BOTONES DE HISTORIAL AÑADIDOS */}
          <div className="flex gap-1 bg-white/5 p-1 rounded-lg border border-white/5">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={undo} 
              disabled={history.length === 0}
              className="h-8 w-8 text-slate-400 hover:text-white disabled:opacity-20"
            >
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={redo} 
              disabled={redoStack.length === 0}
              className="h-8 w-8 text-slate-400 hover:text-white disabled:opacity-20"
            >
              <Redo2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowAIPanel(!showAIPanel)}
            className="border-white/5 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all"
          >
            <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
            IA Stylist
          </Button>
          <Button className="bg-white text-black hover:bg-slate-200 px-6 font-bold">
            <Save className="w-4 h-4 mr-2" />
            Publicar
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showAIPanel && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <Card className="p-4 border-purple-500/30 bg-purple-500/5 mb-6 overflow-hidden">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <Label className="text-purple-300 text-[10px] uppercase font-bold tracking-widest">Estilo deseado</Label>
                  <Input
                    placeholder="Ej: Elegante, oscuro, minimalista con toques neón..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-black/40 border-white/5 text-white focus:border-purple-500/50"
                  />
                </div>
                <Button onClick={handleGenerateAI} disabled={isGenerating || !prompt} className="bg-purple-600 hover:bg-purple-700 text-white min-w-35">
                  {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Generar Estilo"}
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-8 items-start">

        {/* COLUMNA IZQUIERDA: CONTROLES */}
        <div className="space-y-6 max-h-[calc(100vh-180px)] overflow-y-auto pr-2 custom-scrollbar">

          {/* SECCIÓN COLORES AVANZADA */}
          <Card className="p-6 bg-slate-900/40 border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-6 text-emerald-400 font-bold uppercase text-[10px] tracking-[0.2em]">
              <Palette className="w-4 h-4" /> Paleta de Colores
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <ColorInput label="Primario" value={config.primaryColor} onChange={(v) => updateConfig("primaryColor", v)} />
                <ColorInput label="Secundario" value={config.secondaryColor} onChange={(v) => updateConfig("secondaryColor", v)} />
                <ColorInput label="Fondo" value={config.backgroundColor} onChange={(v) => updateConfig("backgroundColor", v)} />
                <ColorInput label="Cards" value={config.cardColor} onChange={(v) => updateConfig("cardColor", v)} />
              </div>

              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-3">Temas Rápidos</p>
                <div className="flex gap-2">
                  {colorThemes.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => {
                        pushToHistory({ ...config, primaryColor: theme.primary, secondaryColor: theme.secondary, backgroundColor: theme.bg, cardColor: theme.card });
                      }}
                      className="w-8 h-8 rounded-full border border-white/10 p-0.5 transition-transform hover:scale-110"
                      style={{ backgroundColor: theme.primary }}
                      title={theme.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* SECCIÓN TIPOGRAFÍA */}
          <Card className="p-6 bg-slate-900/40 border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-6 text-purple-400 font-bold uppercase text-[10px] tracking-[0.2em]">
              <Type className="w-4 h-4" /> Tipografía
            </div>
            <div className="space-y-2">
              {fonts.map((f) => (
                <button
                  key={f.id}
                  onClick={() => updateConfig("fontId", f.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all group ${config.fontId === f.id ? "border-purple-500/50 bg-purple-500/5" : "border-white/5 hover:bg-white/5"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`text-white text-md ${f.style}`}>{f.name}</p>
                      <p className="text-[9px] text-slate-500 mt-0.5 uppercase tracking-tighter">{f.desc}</p>
                    </div>
                    {config.fontId === f.id && <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#8b5cf6]" />}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* SECCIÓN UI/UX */}
          <Card className="p-6 bg-slate-900/40 border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-6 text-blue-400 font-bold uppercase text-[10px] tracking-[0.2em]">
              <Layout className="w-4 h-4" /> Estética UI
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-slate-400">
                  <span>Radio de Borde</span>
                  <span>{config.borderRadius}px</span>
                </div>
                <Slider
                  max={30}
                  className="cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-2">
                  <MousePointer2 className="w-3 h-3 text-blue-400" />
                  <span className="text-xs text-white">Glassmorphism</span>
                </div>
                <input
                  type="checkbox"
                  checked={config.isGlassmorphism}
                  onChange={(e) => updateConfig("isGlassmorphism", e.target.checked)}
                  className="accent-blue-500 h-4 w-4 cursor-pointer"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* COLUMNA DERECHA: PREVIEW */}
        <aside className="relative">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Simulador en vivo</span>
            </div>
            <div className="flex bg-slate-900/80 p-1 rounded-lg border border-white/10">
              <button onClick={() => setPreviewDevice("desktop")} className={`p-1.5 rounded-md transition-all ${previewDevice === 'desktop' ? 'bg-white text-black shadow-lg' : 'text-slate-500'}`}><Monitor size={14} /></button>
              <button onClick={() => setPreviewDevice("mobile")} className={`p-1.5 rounded-md transition-all ${previewDevice === 'mobile' ? 'bg-white text-black shadow-lg' : 'text-slate-500'}`}><Smartphone size={14} /></button>
            </div>
          </div>

          <Card
            className={`transition-all duration-700 relative overflow-hidden mx-auto shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)] border-white/10 ${previewDevice === 'desktop' ? 'w-full h-175' : 'w-[320px] h-162.5 rounded-[3rem] border-10 border-slate-800'
              }`}
            style={{ backgroundColor: config.backgroundColor }}
          >
            <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${config.primaryColor}33, transparent 70%)` }} />

            <div className={`relative h-full flex flex-col ${currentFont.style} text-white`}>
              <nav className="h-16 px-6 flex items-center justify-between border-b border-white/5 backdrop-blur-md">
                <span className="font-black text-lg tracking-tighter">{config.brandName.toUpperCase()}</span>
                <div className="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest opacity-60">
                  {previewDevice === 'desktop' ?
                    <><span>Tienda</span><span>Nuevo</span><span>Colección</span></> : <></>
                  }
                </div>
                <div className="flex gap-4">
                  <Search size={16} className="opacity-50" />
                  <div className="relative">
                    <ShoppingBag size={16} />
                    <span className="absolute -top-2 -right-2 bg-white text-black text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">2</span>
                  </div>
                  <Menu size={16} className={`${previewDevice === 'desktop' ? 'hidden' : ''}`} />
                </div>
              </nav>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <section className="p-10 text-center relative">
                  <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter leading-none">
                    NUEVA <span style={{ color: config.primaryColor }}>ERA</span> DIGITAL.
                  </h1>
                  <p className="text-slate-400 text-xs mb-8 max-w-xs mx-auto opacity-70">Diseños pensados para el futuro de tu comercio online.</p>
                  <button
                    className="px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-transform active:scale-95 shadow-lg"
                    style={{
                      backgroundColor: config.primaryColor,
                      color: '#fff',
                      borderRadius: `${config.borderRadius}px`,
                    }}
                  >
                    Explorar ahora
                  </button>
                </section>

                <section className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i}
                      className="p-4 border border-white/5 group"
                      style={{
                        backgroundColor: config.cardColor,
                        borderRadius: `${config.borderRadius}px`,
                        backdropFilter: config.isGlassmorphism ? "blur(10px)" : "none",
                      }}
                    >
                      <div className="aspect-square bg-white/5 rounded-lg mb-4 relative overflow-hidden">
                        <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 backdrop-blur-md">
                          <Star size={10} className="text-yellow-500 fill-yellow-500" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] text-slate-500 uppercase font-bold">Gadget Pro</p>
                        <h4 className="text-sm font-bold">Elemento_{i}</h4>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-xs font-mono" style={{ color: config.primaryColor }}>$129.00</span>
                          <ChevronRight size={14} className="opacity-30 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              </div>

              <div className="p-4 flex justify-center opacity-10 border-t border-white/5">
                <div className="w-24 h-1 bg-white rounded-full" />
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

// --- SUBCOMPONENTE DE ENTRADA DE COLOR ---
function ColorInput({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">{label}</Label>
      <div className="flex gap-2">
        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10 shrink-0">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full scale-150 cursor-pointer bg-transparent"
          />
        </div>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 bg-black/20 border-white/5 font-mono text-[10px] uppercase text-center focus:border-emerald-500/50"
        />
      </div>
    </div>
  );
}