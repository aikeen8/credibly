import React from "react";

type ButtonProps = {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "border-2 border-black rounded-none px-4 py-2 font-header uppercase text-sm transition-all";
    
  const variantStyles = {
    primary:
    "bg-brand-lime text-black hover:shadow-[4px_4px_0_#000] hover:-translate-y-[1px] active:translate-y-0",
    secondary:
    "bg-white text-black hover:shadow-[4px_4px_0_#000] hover:-translate-y-[1px] active:translate-y-0",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
