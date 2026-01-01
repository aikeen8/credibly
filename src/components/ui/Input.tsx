import React from "react";

type InputProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-[10px] font-header uppercase">
          {label}
        </label>
      )}

      <input
        className="
          bg-white
          border-2 border-black
          rounded-none
          px-3 py-2
          text-sm
          outline-none
          focus:shadow-[3px_3px_0_#000]
          transition-shadow
        "
        {...props}
      />
    </div>
  );
}
