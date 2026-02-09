"use client";

import * as React from "react";
import { XIcon } from "lucide-react";
import { cn } from "./utils";

type SheetContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SheetContext = React.createContext<SheetContextType | null>(null);

function useSheet() {
  const ctx = React.useContext(SheetContext);
  if (!ctx) throw new Error("Sheet components must be used inside <Sheet>");
  return ctx;
}

function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <SheetContext.Provider value={{ open, setOpen: onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
}

function SheetTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setOpen } = useSheet();

  return (
    <div onClick={() => setOpen(true)}>
      {children}
    </div>
  );
}

function SheetClose({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setOpen } = useSheet();

  return (
    <div onClick={() => setOpen(false)}>
      {children}
    </div>
  );
}

function SheetContent({
  children,
  side = "right",
  className,
}: {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  className?: string;
}) {
  const { open, setOpen } = useSheet();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed bg-background shadow-lg transition-transform duration-300 ease-in-out",
          side === "right" && "top-0 right-0 h-full w-80 translate-x-0",
          side === "left" && "top-0 left-0 h-full w-80 translate-x-0",
          side === "top" && "top-0 left-0 w-full h-64",
          side === "bottom" && "bottom-0 left-0 w-full h-64",
          className
        )}
      >
        {children}

        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4"
        >
          <XIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}

function SheetHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("p-4 border-b", className)}>
      {children}
    </div>
  );
}

function SheetFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("p-4 mt-auto border-t", className)}>
      {children}
    </div>
  );
}

function SheetTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-lg font-semibold", className)}>
      {children}
    </h2>
  );
}

function SheetDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
