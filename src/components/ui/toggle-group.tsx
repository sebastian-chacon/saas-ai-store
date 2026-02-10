"use client";

import * as React from "react";
import { cn } from "./utils";

function HoverCard({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      data-slot="hover-card" 
      className="group/hover-card relative inline-block" 
      {...props}
    >
      {children}
    </div>
  );
}

function HoverCardTrigger({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="hover-card-trigger"
      className={cn("cursor-default", className)}
      {...props}
    />
  );
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "center" | "end", sideOffset?: number }) {
  return (
    <div
      data-slot="hover-card-content"
      className={cn(
        // Posicionamiento y visibilidad
        "absolute z-50 w-64 opacity-0 invisible group-hover/hover-card:opacity-100 group-hover/hover-card:visible",
        "transition-all duration-200 ease-in-out",
        // Animaciones
        "group-hover/hover-card:animate-in group-hover/hover-card:fade-in-0 group-hover/hover-card:zoom-in-95",
        // Estilos visuales
        "bg-popover text-popover-foreground rounded-md border p-4 shadow-md outline-hidden",
        // Alineación (por defecto abajo centro)
        "top-full left-1/2 -translate-x-1/2 mt-(--side-offset,4px)",
        className,
      )}
      style={{ "--side-offset": `${sideOffset}px` } as React.CSSProperties}
      {...props}
    />
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };