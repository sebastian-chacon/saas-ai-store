"use client";

import React from "react";

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number; // ejemplo: 16/9, 1, 4/3
}

export function AspectRatio({
  ratio = 1,
  className,
  style,
  children,
  ...props
}: AspectRatioProps) {
  return (
    <div
      style={{
        aspectRatio: ratio,
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}
