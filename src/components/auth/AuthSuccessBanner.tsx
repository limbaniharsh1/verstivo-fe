import React from "react";
import { CheckCircle2 } from "lucide-react";

type AuthSuccessBannerProps = {
  message: string;
};

export function AuthSuccessBanner({ message }: AuthSuccessBannerProps) {
  return (
    <div className="mb-5 p-3.5 rounded-[10px] bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13.5px] flex items-center gap-2 animate-in fade-in duration-300">
      <CheckCircle2 size={17} className="text-emerald-600 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
