import React from "react";

type CardProps = {
  children: React.ReactNode;
};

export function Card({ children }: CardProps) {
  return (
    <div className="bg-white border-2 border-black rounded-none">
      {children}
    </div>
  );
}

export function CardHeader({ children }: CardProps) {
  return (
    <div className="border-b-2 border-black px-4 py-3 font-header uppercase text-sm">
      {children}
    </div>
  );
}

export function CardContent({ children }: CardProps) {
  return <div className="p-4">{children}</div>;
}
