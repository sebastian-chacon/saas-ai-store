"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import { cn } from "./utils";

// --- Componente Principal (Group) ---
function ResizablePanelGroup({
  className,
  children,
  direction = "horizontal",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { direction?: "horizontal" | "vertical" }) {
  return (
    <div
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full",
        direction === "vertical" ? "flex-col" : "flex-row",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// --- Panel Individual ---
function ResizablePanel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="resizable-panel"
      className={cn("flex-1 overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// --- El Tirador (Handle) ---
function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { withHandle?: boolean }) {
  // Nota: Esta es una implementación visual. 
  // Para que sea funcional sin librerías, necesitarías añadir event listeners de mouse.
  return (
    <div
      data-slot="resizable-handle"
      className={cn(
        "bg-border relative flex w-px items-center justify-center hover:bg-ring transition-colors cursor-col-resize",
        "after:absolute after:inset-y-0 after:left-1/2 after:w-2 after:-translate-x-1/2", // Área táctil
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-sm border shadow-sm">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </div>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };