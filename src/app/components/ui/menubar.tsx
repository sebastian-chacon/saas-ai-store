"use client";

import * as React from "react";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { cn } from "./utils";

// --- Root ---
function Menubar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="menubar"
      className={cn(
        "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
        className
      )}
      {...props}
    />
  );
}

// --- Menu Wrapper (Contexto para ID único) ---
function MenubarMenu({ children }: { children: React.ReactNode }) {
  const id = React.useId();
  return <>{React.Children.map(children, (child) => 
    React.isValidElement(child) ? React.cloneElement(child, { menuId: id } as any) : child
  )}</>;
}

// --- Trigger ---
function MenubarTrigger({
  className,
  menuId,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { menuId?: string }) {
  return (
    <button
      popoverTarget={menuId}
      className={cn(
        "hover:bg-accent hover:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none cursor-default",
        className
      )}
      {...props}
    />
  );
}

// --- Content ---
function MenubarContent({
  className,
  menuId,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { menuId?: string }) {
  return (
    <div
      id={menuId}
      popover="auto"
      className={cn(
        "bg-popover text-popover-foreground z-50 min-w-48 overflow-hidden rounded-md border p-1 shadow-md m-0 mt-2",
        "open:animate-in open:fade-in-0 open:zoom-in-95",
        className
      )}
      {...props}
    />
  );
}

// --- Items y Labels ---
function MenubarItem({
  className,
  inset,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  return (
    <div
      className={cn(
        "hover:bg-accent hover:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}

function MenubarSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("bg-border -mx-1 my-1 h-px", className)} {...props} />;
}

function MenubarShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
      {...props}
    />
  );
}

// --- Checkbox & Radio (Simplificados) ---
function MenubarCheckboxItem({ className, checked, children, ...props }: any) {
  return (
    <MenubarItem className={cn("pl-8", className)} {...props}>
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        {checked && <CheckIcon className="size-4" />}
      </span>
      {children}
    </MenubarItem>
  );
}

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarCheckboxItem,
};