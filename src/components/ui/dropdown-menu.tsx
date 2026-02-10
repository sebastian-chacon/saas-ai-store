"use client";

import * as React from "react";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { cn } from "./utils";

// --- Root ---
function DropdownMenu({ children }: { children: React.ReactNode }) {
  const id = React.useId();
  return <>{React.Children.map(children, (child) => 
    React.isValidElement(child) ? React.cloneElement(child, { menuId: id } as any) : child
  )}</>;
}

// --- Trigger ---
function DropdownMenuTrigger({
  className,
  menuId,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { menuId?: string }) {
  return (
    <button
      popoverTarget={menuId}
      data-slot="dropdown-menu-trigger"
      className={cn("cursor-default outline-none", className)}
      {...props}
    />
  );
}

// --- Content ---
function DropdownMenuContent({
  className,
  menuId,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { menuId?: string }) {
  return (
    <div
      id={menuId}
      popover="auto"
      data-slot="dropdown-menu-content"
      className={cn(
        "bg-popover text-popover-foreground z-50 min-w-32 overflow-hidden rounded-md border p-1 shadow-md m-0 mt-1",
        "open:animate-in open:fade-in-0 open:zoom-in-95",
        className
      )}
      {...props}
    />
  );
}

// --- Item ---
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <div
      data-slot="dropdown-menu-item"
      className={cn(
        "hover:bg-accent hover:text-accent-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none",
        variant === "destructive" && "text-destructive hover:bg-destructive/10",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}

// --- Checkbox & Radio Items ---
function DropdownMenuCheckboxItem({ className, children, checked, ...props }: any) {
  return (
    <DropdownMenuItem className={cn("pl-8", className)} {...props}>
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        {checked && <CheckIcon className="size-4" />}
      </span>
      {children}
    </DropdownMenuItem>
  );
}

function DropdownMenuRadioItem({ className, children, checked, ...props }: any) {
  return (
    <DropdownMenuItem className={cn("pl-8", className)} {...props}>
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        {checked && <CircleIcon className="size-2 fill-current" />}
      </span>
      {children}
    </DropdownMenuItem>
  );
}

// --- Sub Menus (Lógica simplificada con hover) ---
function DropdownMenuSub({ children }: { children: React.ReactNode }) {
  return <div className="relative group/sub">{children}</div>;
}

function DropdownMenuSubTrigger({ className, children, ...props }: any) {
  return (
    <div
      className={cn(
        "hover:bg-accent flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </div>
  );
}

function DropdownMenuSubContent({ className, ...props }: any) {
  return (
    <div
      className={cn(
        "absolute left-full top-0 ml-1 hidden group-hover/sub:block",
        "bg-popover text-popover-foreground min-w-32 rounded-md border p-1 shadow-lg animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    />
  );
}

// --- Otros ---
const DropdownMenuLabel = ({ className, inset, ...props }: any) => (
  <div className={cn("px-2 py-1.5 text-sm font-medium", inset && "pl-8", className)} {...props} />
);

const DropdownMenuSeparator = ({ className, ...props }: any) => (
  <div className={cn("bg-border -mx-1 my-1 h-px", className)} {...props} />
);

const DropdownMenuShortcut = ({ className, ...props }: any) => (
  <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
);

const DropdownMenuGroup = (props: any) => <div {...props} />;
const DropdownMenuPortal = ({ children }: any) => <>{children}</>;

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuGroup,
  DropdownMenuPortal,
};