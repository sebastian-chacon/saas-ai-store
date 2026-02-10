"use client";
import { motion } from "framer-motion";

export default function BackgroundLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-white overflow-x-hidden">
      <style jsx global>{`
        :root {
          --glow-primary: rgba(139, 92, 246, 0.2);   /* Púrpura */
          --glow-secondary: rgba(6, 182, 212, 0.15); /* Cyan */
          --grid-color: rgba(139, 92, 246, 0.07);
        }
      `}</style>

      {/* Capa de Fondo Fija */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-purple-950/20 to-slate-950" />
        
        {/* Luces animadas */}
        <motion.div
          className="absolute top-0 left-1/4 w-125 h-125 rounded-full blur-[120px]"
          style={{ backgroundColor: 'var(--glow-primary)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-125 h-125 rounded-full blur-[120px]"
          style={{ backgroundColor: 'var(--glow-secondary)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grilla técnica */}
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem'
          }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}