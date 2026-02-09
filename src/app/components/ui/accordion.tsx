"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "./utils";

type AccordionContextType = {
  openItem: string | null;
  setOpenItem: (value: string | null) => void;
};

const AccordionContext = React.createContext<AccordionContextType | null>(null);

export function Accordion({
  children,
  defaultValue = null,
}: {
  children: React.ReactNode;
  defaultValue?: string | null;
}) {
  const [openItem, setOpenItem] = React.useState<string | null>(defaultValue);

  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem }}>
      <div className="w-full">{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-b last:border-none", className)}>
      {children}
    </div>
  );
}

export function AccordionTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionTrigger must be used inside Accordion");

  const { openItem, setOpenItem } = context;
  const isOpen = openItem === value;

  return (
    <button
      onClick={() => setOpenItem(isOpen ? null : value)}
      className={cn(
        "flex w-full items-center justify-between py-4 text-left text-sm font-medium transition hover:underline",
        className
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
}

export function AccordionContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionContent must be used inside Accordion");

  const { openItem } = context;
  const isOpen = openItem === value;

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div className={cn("pb-4 text-sm", className)}>{children}</div>
    </div>
  );
}
