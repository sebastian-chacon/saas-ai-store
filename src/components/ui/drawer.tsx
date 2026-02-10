"use client";

import * as React from "react";
import { cn } from "./utils";

// --- Root ---
function Drawer({ children }: { children: React.ReactNode }) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  // Proveemos una forma de que el trigger abra el dialog
  return (
    <div data-slot="drawer">
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { dialogRef } as any)
          : child
      )}
    </div>
  );
}

// --- Trigger ---
function DrawerTrigger({
  className,
  dialogRef,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { dialogRef?: React.RefObject<HTMLDialogElement | null> }) {
  return (
    <button
      data-slot="drawer-trigger"
      className={cn(className)}
      onClick={() => dialogRef?.current?.showModal()}
      {...props}
    />
  );
}

// --- Content ---
function DrawerContent({
  className,
  children,
  dialogRef,
  ...props
}: React.HTMLAttributes<HTMLDialogElement> & { dialogRef?: React.RefObject<HTMLDialogElement | null> }) {
  return (
    <dialog
      ref={dialogRef}
      data-slot="drawer-content"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 m-0 flex h-auto max-h-[80vh] w-full flex-col rounded-t-lg border-t bg-background p-0 shadow-lg outline-none",
        "backdrop:bg-black/50 backdrop:backdrop-blur-sm",
        "open:animate-in open:slide-in-from-bottom-full duration-300",
        className
      )}
      onClick={(e) => {
        // Cerrar al hacer click en el backdrop
        if (e.target === dialogRef?.current) dialogRef.current.close();
      }}
      {...props}
    >
      {/* Tirador visual (Handle) */}
      <div className="mx-auto mt-4 h-2 w-25 shrink-0 rounded-full bg-muted" />
      {children}
    </dialog>
  );
}

// --- Close ---
function DrawerClose({
  className,
  dialogRef,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { dialogRef?: React.RefObject<HTMLDialogElement | null> }) {
  return (
    <button
      data-slot="drawer-close"
      className={cn(className)}
      onClick={() => dialogRef?.current?.close()}
      {...props}
    />
  );
}

// --- Header, Footer, Title, Description ---
const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1.5 p-4", className)} {...props} />
);

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);

const DrawerTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-foreground font-semibold leading-none tracking-tight", className)} {...props} />
);

const DrawerDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-muted-foreground text-sm", className)} {...props} />
);

// Shims para no romper compatibilidad
const DrawerPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const DrawerOverlay = () => null; 

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerPortal,
  DrawerOverlay,
};