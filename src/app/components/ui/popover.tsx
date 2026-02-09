"use client";

import * as React from "react";
import { cn } from "./utils";

// Usamos un ID único para conectar el trigger con el contenido
function Popover({ children }: { children: React.ReactNode }) {
  const id = React.useId();
  // Pasamos el ID a los hijos para que se vinculen
  return <>{React.Children.map(children, (child) => 
    React.isValidElement(child) ? React.cloneElement(child, { popoverId: id } as any) : child
  )}</>;
}

function PopoverTrigger({ 
  className, 
  popoverId, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { popoverId?: string }) {
  return (
    <button
      data-slot="popover-trigger"
      popoverTarget={popoverId}
      className={cn("cursor-pointer", className)}
      {...props}
    />
  );
}

function PopoverContent({
  className,
  popoverId,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { popoverId?: string }) {
  return (
    <div
      id={popoverId}
      popover="auto"
      data-slot="popover-content"
      className={cn(
        "bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-md outline-hidden",
        "open:animate-in open:fade-in-0 open:zoom-in-95",
        // Estilos específicos para el elemento cuando está abierto como popover
        "m-0 mt-2", 
        className
      )}
      {...props}
    />
  );
}

// El Anchor en nativo es más complejo, usualmente el trigger hace de anchor por defecto
const PopoverAnchor = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("inline-block", className)} {...props} />
);

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };