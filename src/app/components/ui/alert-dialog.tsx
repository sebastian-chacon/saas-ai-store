"use client";

import * as React from "react";
import { cn } from "./utils";

type AlertDialogContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AlertDialogContext = React.createContext<AlertDialogContextType | null>(
  null
);

export function AlertDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

export function AlertDialogTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(AlertDialogContext);
  if (!context) throw new Error("Must be inside AlertDialog");

  return (
    <button
      onClick={() => context.setOpen(true)}
      className={className}
    >
      {children}
    </button>
  );
}

export function AlertDialogContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(AlertDialogContext);
  if (!context) throw new Error("Must be inside AlertDialog");

  if (!context.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => context.setOpen(false)}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function AlertDialogHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 space-y-2", className)}>
      {children}
    </div>
  );
}

export function AlertDialogFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-6 flex justify-end gap-2", className)}>
      {children}
    </div>
  );
}

export function AlertDialogTitle({
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

export function AlertDialogDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-gray-500", className)}>
      {children}
    </p>
  );
}

export function AlertDialogAction({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const context = React.useContext(AlertDialogContext);
  if (!context) throw new Error("Must be inside AlertDialog");

  return (
    <button
      onClick={() => {
        onClick?.();
        context.setOpen(false);
      }}
      className={cn(
        "rounded-md bg-black px-4 py-2 text-white hover:bg-black/80",
        className
      )}
    >
      {children}
    </button>
  );
}

export function AlertDialogCancel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(AlertDialogContext);
  if (!context) throw new Error("Must be inside AlertDialog");

  return (
    <button
      onClick={() => context.setOpen(false)}
      className={cn(
        "rounded-md border px-4 py-2 hover:bg-gray-100",
        className
      )}
    >
      {children}
    </button>
  );
}
