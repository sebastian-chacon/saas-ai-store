"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "./utils";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Seleccionar...",
  className,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? ""
  );

  const ref = React.useRef<HTMLDivElement>(null);

  const selectedValue = value ?? internalValue;

  const selectedOption = options.find(
    (opt) => opt.value === selectedValue
  );

  const handleSelect = (val: string) => {
    if (!value) setInternalValue(val);
    onValueChange?.(val);
    setOpen(false);
  };

  // cerrar al hacer click afuera
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="border-input bg-input-background flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm"
      >
        <span className="truncate">
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDownIcon className="size-4 opacity-50" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="bg-popover text-popover-foreground absolute z-50 mt-1 w-full rounded-md border shadow-md">
          <ul className="max-h-60 overflow-auto p-1">
            {options.map((option) => {
              const isSelected = option.value === selectedValue;

              return (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm hover:bg-accent",
                    isSelected && "bg-accent font-medium"
                  )}
                >
                  {option.label}
                  {isSelected && (
                    <CheckIcon className="size-4" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export { Select };
