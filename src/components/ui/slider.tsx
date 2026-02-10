"use client";

import React, { useState } from "react";
import { cn } from "./utils";

interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
}

export function Slider({
  className,
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  disabled,
  ...props
}: SliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const percentage = ((currentValue - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);

    if (!isControlled) {
      setInternalValue(newValue);
    }

    onValueChange?.(newValue);
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Track background */}
      <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-muted" />

      {/* Active range */}
      <div
        className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-primary"
        style={{ width: `${percentage}%` }}
      />

      {/* Input real */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        disabled={disabled}
        onChange={handleChange}
        className="relative z-10 w-full appearance-none bg-transparent
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:w-4
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-white
        [&::-webkit-slider-thumb]:border
        [&::-webkit-slider-thumb]:border-primary
        [&::-webkit-slider-thumb]:shadow
        [&::-webkit-slider-thumb]:cursor-pointer"
        {...props}
      />
    </div>
  );
}
