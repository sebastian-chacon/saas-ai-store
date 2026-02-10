"use client";

import * as React from "react";
import { cn } from "./utils";

// El Provider no es necesario en la versión nativa, 
// así que exportamos un componente que solo renderiza sus hijos.
function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function Tooltip({ children }: { children: React.ReactNode }) {
  return (
    <div className="group/tooltip relative inline-flex">
      {children}
    </div>
  );
}

function TooltipTrigger({ asChild, children, ...props }: any) {
  // Simplemente actuamos como un contenedor o pasamos el hijo
  return <>{children}</>;
}

function TooltipContent({ 
  className, 
  side = "top", 
  children, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { side?: "top" | "right" | "bottom" | "left" }) {
  
  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
  };

  return (
    <div
      role="tooltip"
      className={cn(
        "bg-popover text-popover-foreground z-50 overflow-hidden rounded-md border px-3 py-1.5 text-xs shadow-md animate-in fade-in-0 zoom-in-95",
        "pointer-events-none absolute invisible opacity-0 group-hover/tooltip:visible group-hover/tooltip:opacity-100 transition-all",
        sideClasses[side],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };