"use client";

import * as React from "react";
import { XIcon } from "lucide-react";
import { cn } from "./utils";

function Sheet({ open, onOpenChange, children }: any) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    if (open) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [open]);

  return (
    <div data-slot="sheet">
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child as any, { dialogRef, onOpenChange }) : child
      )}
    </div>
  );
}

function SheetContent({ side = "right", className, children, dialogRef, onOpenChange, ...props }: any) {
  return (
    <dialog
      ref={dialogRef}
      onClose={() => onOpenChange?.(false)}
      className={cn(
        "fixed z-50 bg-background p-6 shadow-lg transition ease-in-out duration-300",
        "backdrop:bg-black/50 backdrop:backdrop-blur-sm",
        side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r open:animate-in open:slide-in-from-left-full sm:max-w-sm",
        side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l open:animate-in open:slide-in-from-right-full sm:max-w-sm",
        className
      )}
      {...props}
    >
      {children}
      <button 
        onClick={() => onOpenChange?.(false)}
        className="absolute right-4 top-4 opacity-70 hover:opacity-100"
      >
        <XIcon className="size-4" />
      </button>
    </dialog>
  );
}

const SheetHeader = ({ className, ...props }: any) => <div className={cn("flex flex-col gap-2", className)} {...props} />;
const SheetTitle = ({ className, ...props }: any) => <h2 className={cn("text-lg font-semibold", className)} {...props} />;
const SheetDescription = ({ className, ...props }: any) => <p className={cn("text-sm text-muted-foreground", className)} {...props} />;

export { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription };