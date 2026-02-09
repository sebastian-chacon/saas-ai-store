"use client";

import React, { useState } from "react";
import { cn } from "./utils";

type ToggleVariant = "default" | "outline";
type ToggleSize = "default" | "sm" | "lg";

interface ToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ToggleVariant;
  size?: ToggleSize;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

export function Toggle({
  className,
  variant = "default",
  size = "default",
  pressed,
  onPressedChange,
  onClick,
  ...props
}: ToggleProps) {
  const [internalPressed, setInternalPressed] = useState(false);

  const isControlled = pressed !== undefined;
  const isPressed = isControlled ? pressed : internalPressed;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isControlled) {
      setInternalPressed(!internalPressed);
    }

    onPressedChange?.(!isPressed);
    onClick?.(e);
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-transparent hover:bg-muted",
    outline:
      "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    default: "h-9 px-2 min-w-9",
    sm: "h-8 px-1.5 min-w-8",
    lg: "h-10 px-2.5 min-w-10",
  };

  const activeStyles = isPressed
    ? "bg-accent text-accent-foreground"
    : "";

  return (
    <button
      type="button"
      aria-pressed={isPressed}
      data-state={isPressed ? "on" : "off"}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        activeStyles,
        className
      )}
      onClick={handleClick}
      {...props}
    />
  );
}
