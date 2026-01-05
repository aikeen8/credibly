import React from "react";

type ButtonProps = {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "border-2 border-black rounded-none px-4 py-2 font-header uppercase text-sm transition-all";
    
  const variantStyles = {
    primary:
    "bg-brand-lime text-black hover:shadow-[4px_4px_0_#000] hover:-translate-y-[1px] active:translate-y-0 active:shadow-none",
    secondary:
    "bg-white text-black hover:shadow-[4px_4px_0_#000] hover:-translate-y-[1px] active:translate-y-0 active:shadow-none",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}