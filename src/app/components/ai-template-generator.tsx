'use client'
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Sparkles,
  Wand2,
  Palette,
  Zap,
  ArrowLeft,
  Download,
  Eye,
  RefreshCw,
  ShoppingBag,
  Heart,
  Coffee,
  Shirt,
  Laptop,
  Home as HomeIcon,
  Check,
  Rocket
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

type View = "landing" | "dashboard" | "products" | "store" | "templates";

interface AITemplateGeneratorProps {
  onNavigate: (view: View) => void;
}

interface Template {
  id: string;
  name: string;
  style: string;
  colors: string[];
  industry: string;
  description: string;
  preview: string;
}

const industries = [
  { icon: ShoppingBag, label: "Moda", value: "fashion" },
  { icon: Coffee, label: "Alimentos", value: "food" },
  { icon: Laptop, label: "Tecnología", value: "tech" },
  { icon: Heart, label: "Belleza", value: "beauty" },
  { icon: HomeIcon, label: "Hogar", value: "home" },
  { icon: Shirt, label: "Deportes", value: "sports" }
];

const styles = [
  { label: "Minimalista", value: "minimal" },
  { label: "Futurista", value: "futuristic" },
  { label: "Elegante", value: "elegant" },
  { label: "Vibrante", value: "vibrant" },
  { label: "Moderno", value: "modern" },
  { label: "Clásico", value: "classic" }
];

export default function AITemplateGenerator({ onNavigate }: AITemplateGeneratorProps) {
  const [step, setStep] = useState<"input" | "generating" | "results">("input");
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [generatedTemplates, setGeneratedTemplates] = useState<Template[]>([]);
  const [progress, setProgress] = useState(0);

  const generateTemplates = async () => {
    if (!businessName || !description || !selectedIndustry || !selectedStyle) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    setStep("generating");
    setProgress(0);

    // Simulate AI processing
    const stages = [
      "Analizando descripción del negocio...",
      "Seleccionando paleta de colores...",
      "Generando layout responsive...",
      "Optimizando componentes...",
      "Finalizando plantillas..."
    ];

    for (let i = 0; i < stages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress(((i + 1) / stages.length) * 100);
      toast.info(stages[i]);
    }

    // Generate mock templates
    const templates: Template[] = [
      {
        id: "1",
        name: `${businessName} - Premium`,
        style: selectedStyle,
        colors: getColorPalette(selectedIndustry, 0),
        industry: selectedIndustry,
        description: "Diseño premium con efectos glassmorphism y animaciones suaves",
        preview: "modern"
      },
      {
        id: "2",
        name: `${businessName} - Classic`,
        style: selectedStyle,
        colors: getColorPalette(selectedIndustry, 1),
        industry: selectedIndustry,
        description: "Diseño clásico y profesional optimizado para conversiones",
        preview: "classic"
      },
      {
        id: "3",
        name: `${businessName} - Bold`,
        style: selectedStyle,
        colors: getColorPalette(selectedIndustry, 2),
        industry: selectedIndustry,
        description: "Diseño audaz con colores vibrantes y tipografía impactante",
        preview: "bold"
      }
    ];

    setGeneratedTemplates(templates);
    setStep("results");
    toast.success("¡Plantillas generadas exitosamente!");
  };

  const getColorPalette = (industry: string, variant: number): string[] => {
    const palettes: Record<string, string[][]> = {
      fashion: [
        ["#FF6B9D", "#C44569", "#F8B500", "#FFC93C"],
        ["#2D3436", "#DFE6E9", "#FF7675", "#74B9FF"],
        ["#A29BFE", "#6C5CE7", "#FD79A8", "#FDCB6E"]
      ],
      food: [
        ["#FF6348", "#FF4757", "#FFA502", "#FFD32A"],
        ["#26DE81", "#20BF6B", "#FC5C65", "#FD9644"],
        ["#D63031", "#E17055", "#FDCB6E", "#6C5CE7"]
      ],
      tech: [
        ["#00D2FF", "#3A7BD5", "#667EEA", "#764BA2"],
        ["#0F2027", "#203A43", "#2C5364", "#4CA1AF"],
        ["#667EEA", "#764BA2", "#F093FB", "#4FACFE"]
      ],
      beauty: [
        ["#FD79A8", "#FDCB6E", "#E84393", "#6C5CE7"],
        ["#FFB6C1", "#FFC0CB", "#FFD700", "#DDA0DD"],
        ["#E84393", "#FD79A8", "#A29BFE", "#FDCB6E"]
      ],
      home: [
        ["#55EFC4", "#00B894", "#81ECEC", "#74B9FF"],
        ["#A8E6CF", "#FFD3B6", "#FFAAA5", "#FF8B94"],
        ["#2ECC71", "#3498DB", "#9B59B6", "#E74C3C"]
      ],
      sports: [
        ["#00B894", "#00CEC9", "#0984E3", "#6C5CE7"],
        ["#FF6348", "#FF4757", "#FFA502", "#1E90FF"],
        ["#E74C3C", "#3498DB", "#2ECC71", "#F39C12"]
      ]
    };

    return palettes[industry]?.[variant] || ["#667EEA", "#764BA2", "#F093FB", "#4FACFE"];
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-xl bg-slate-900/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("dashboard")}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-purple-400" />
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-8 h-8 text-cyan-400 opacity-50" />
                </motion.div>
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI Template Generator
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="relative container mx-auto px-4 py-12">
        {step === "input" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <Wand2 className="w-20 h-20 text-purple-400" />
                  <motion.div
                    className="absolute -inset-4 bg-purple-500/20 rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
              <h1 className="text-5xl font-bold text-white mb-4">
                Crea tu tienda con{" "}
                <span className="bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Inteligencia Artificial
                </span>
              </h1>
              <p className="text-xl text-slate-300">
                Describe tu negocio y nuestra IA generará plantillas personalizadas en segundos
              </p>
            </div>

            <Card className="p-8 bg-slate-900/50 backdrop-blur-xl border-white/10 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="businessName" className="text-white text-lg mb-2 block">
                    Nombre del Negocio
                  </Label>
                  <Input
                    id="businessName"
                    placeholder="Mi Tienda Increíble"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="bg-slate-800/50 border-white/10 text-white placeholder:text-slate-400 text-lg p-6"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-white text-lg mb-2 block">
                    Descripción del Negocio
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Vendo productos artesanales hechos a mano, enfocados en la sostenibilidad y el diseño único..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="bg-slate-800/50 border-white/10 text-white placeholder:text-slate-400 text-lg"
                  />
                </div>

                <div>
                  <Label className="text-white text-lg mb-3 block">Industria</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {industries.map((industry) => (
                      <motion.button
                        key={industry.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedIndustry(industry.value)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedIndustry === industry.value
                            ? "border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/50"
                            : "border-white/10 bg-slate-800/30 hover:border-white/20"
                        }`}
                      >
                        <industry.icon className={`w-8 h-8 mx-auto mb-2 ${
                          selectedIndustry === industry.value ? "text-purple-400" : "text-slate-400"
                        }`} />
                        <div className={`text-sm font-medium ${
                          selectedIndustry === industry.value ? "text-purple-300" : "text-slate-300"
                        }`}>
                          {industry.label}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-white text-lg mb-3 block">Estilo de Diseño</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {styles.map((style) => (
                      <motion.button
                        key={style.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedStyle(style.value)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedStyle === style.value
                            ? "border-cyan-500 bg-cyan-500/20 shadow-lg shadow-cyan-500/50"
                            : "border-white/10 bg-slate-800/30 hover:border-white/20"
                        }`}
                      >
                        <Palette className={`w-6 h-6 mx-auto mb-2 ${
                          selectedStyle === style.value ? "text-cyan-400" : "text-slate-400"
                        }`} />
                        <div className={`text-sm font-medium ${
                          selectedStyle === style.value ? "text-cyan-300" : "text-slate-300"
                        }`}>
                          {style.label}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={generateTemplates}
                    className="w-full bg-linear-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white text-lg py-6 shadow-lg shadow-purple-500/50"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generar Plantillas con IA
                    <Zap className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )}

        {step === "generating" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1.5, repeat: Infinity }
              }}
              className="inline-block mb-8"
            >
              <Sparkles className="w-32 h-32 text-purple-400" />
            </motion.div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Generando tus plantillas...
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Nuestra IA está creando diseños personalizados para tu negocio
            </p>
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-linear-to-r from-purple-500 to-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="text-slate-300 text-lg font-medium">{Math.round(progress)}%</div>
            </div>
          </motion.div>
        )}

        {step === "results" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <Check className="w-20 h-20 text-green-400" />
                  <motion.div
                    className="absolute -inset-4 bg-green-500/20 rounded-full blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-4">
                ¡Plantillas Generadas! 🎉
              </h2>
              <p className="text-xl text-slate-300">
                Hemos creado {generatedTemplates.length} plantillas únicas para {businessName}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {generatedTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden bg-slate-900/50 backdrop-blur-xl border-white/10 hover:border-purple-500/50 transition-all group">
                    <div className="aspect-video bg-linear-to-br from-slate-800 to-slate-900 relative overflow-hidden">
                      {/* Mock preview */}
                      <div className="absolute inset-0 p-6">
                        <div className="flex flex-col h-full gap-2">
                          <div className="flex gap-2">
                            {template.colors.map((color, i) => (
                              <div
                                key={i}
                                className="h-8 flex-1 rounded"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <div className="flex-1 bg-white/5 rounded-lg backdrop-blur-sm" />
                          <div className="grid grid-cols-3 gap-2">
                            <div className="h-12 bg-white/5 rounded backdrop-blur-sm" />
                            <div className="h-12 bg-white/5 rounded backdrop-blur-sm" />
                            <div className="h-12 bg-white/5 rounded backdrop-blur-sm" />
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <Eye className="w-4 h-4 mr-1" />
                          Vista previa
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                      <p className="text-slate-400 text-sm mb-4">{template.description}</p>
                      <div className="flex gap-2 mb-4">
                        {template.colors.slice(0, 4).map((color, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full border-2 border-white/20"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-linear-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                          <Rocket className="w-4 h-4 mr-2" />
                          Usar plantilla
                        </Button>
                        <Button variant="outline" size="icon" className="border-white/10 text-white hover:bg-white/10">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setStep("input")}
                variant="outline"
                size="lg"
                className="border-white/10 text-white hover:bg-white/10"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Generar más plantillas
              </Button>
              <Button
                onClick={() => onNavigate("dashboard")}
                size="lg"
                className="bg-linear-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              >
                Continuar al Dashboard
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
