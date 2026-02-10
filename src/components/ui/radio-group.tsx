"use client";

import * as React from "react";
import { CircleIcon } from "lucide-react";
import { cn } from "./utils";

function RadioGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="radio-group"
      role="radiogroup"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  id,
  value,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative flex items-center">
      <input
        type="radio"
        id={id}
        value={value}
        className={cn(
          "peer border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
          className
        )}
        {...props}
      />
      {/* El icono del centro (el indicador) solo se muestra cuando el input está :checked */}
      <CircleIcon 
        className="fill-primary pointer-events-none absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity peer-checked:opacity-100" 
      />
    </div>
  );
}

export { RadioGroup, RadioGroupItem };