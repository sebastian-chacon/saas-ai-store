"use client";

import * as React from "react";
import { MinusIcon } from "lucide-react";
import { cn } from "./utils";

interface InputOTPProps extends React.InputHTMLAttributes<HTMLInputElement> {
  maxLength: number;
  value: string;
  onValueChange: (value: string) => void;
  containerClassName?: string;
}

// Contexto para evitar pasar props manualmente a cada slot
const OTPContext = React.createContext<{ value: string; maxLength: number; focused: boolean } | null>(null);

function InputOTP({
  className,
  containerClassName,
  maxLength,
  value,
  onValueChange,
  children,
  ...props
}: InputOTPProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, maxLength);
    onValueChange(val);
  };

  return (
    <OTPContext.Provider value={{ value, maxLength, focused: isFocused }}>
      <div 
        className={cn("relative flex items-center gap-2 has-disabled:opacity-50", containerClassName)}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Input oculto que maneja la lógica real */}
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="absolute inset-0 opacity-0 cursor-default"
          {...props}
        />
        {children}
      </div>
    </OTPContext.Provider>
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-0", className)} // gap-0 porque los bordes suelen colapsar
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number }) {
  const context = React.useContext(OTPContext);
  if (!context) return null;

  const char = context.value[index] || "";
  const isActive = context.focused && (
    context.value.length === index || (index === context.maxLength - 1 && context.value.length === context.maxLength)
  );

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input bg-background text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        "data-[active=true]:z-10 data-[active=true]:ring-[3px] data-[active=true]:ring-ring/50 data-[active=true]:border-ring",
        className
      )}
      {...props}
    >
      {char}
      {isActive && !char && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon className="size-4" />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };