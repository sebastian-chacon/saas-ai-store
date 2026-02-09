"use client";

import * as React from "react";
import { XIcon } from "lucide-react";
import { cn } from "./utils";

// --- Tipado para soportar estado controlado ---
interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Dialog({ children, open, onOpenChange }: DialogProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  // Sincroniza el estado de React con el elemento <dialog> nativo
  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [open]);

  // Pasamos el ref y el estado a los hijos mediante clonación
  return (
    <div data-slot="dialog">
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, { 
              dialogRef, 
              open, 
              onOpenChange 
            })
          : child
      )}
    </div>
  );
}

// --- Trigger (Opcional si usas el estado open manualmente) ---
function DialogTrigger({ children, dialogRef }: any) {
  if (!React.isValidElement(children)) return null;
  return React.cloneElement(children as React.ReactElement<any>, {
    onClick: () => dialogRef?.current?.showModal(),
  });
}

function DialogContent({ 
  className, 
  children, 
  dialogRef, 
  onOpenChange, 
  ...props 
}: any) {
  return (
    <dialog
      ref={dialogRef}
      onClose={() => onOpenChange?.(false)}
      className={cn(
        "bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg sm:max-w-lg outline-none",
        "backdrop:bg-black/50 backdrop:backdrop-blur-sm",
        "open:animate-in open:fade-in-0 open:zoom-in-95 duration-200",
        className
      )}
      onClick={(e) => {
        // Cierre al hacer click en el overlay (backdrop)
        if (e.target === dialogRef?.current) onOpenChange?.(false);
      }}
      {...props}
    >
      {children}
      <button
        onClick={() => onOpenChange?.(false)}
        className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <XIcon className="size-4" />
        <span className="sr-only">Close</span>
      </button>
    </dialog>
  );
}

// --- Subcomponentes de apoyo ---
const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-2 text-center sm:text-left", className)} {...props} />
);

const DialogTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-lg leading-none font-semibold", className)} {...props} />
);

const DialogDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-muted-foreground text-sm", className)} {...props} />
);

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
);

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};