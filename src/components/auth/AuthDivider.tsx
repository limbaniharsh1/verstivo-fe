import React from "react";

type AuthDividerProps = {
  label?: string;
};

export function AuthDivider({ label = "or" }: AuthDividerProps) {
  return (
    <div className="relative flex items-center justify-center my-5">
      <div className="border-t border-neutral-200/90 w-full" />
      <span className="bg-white px-3.5 text-[13px] text-neutral-400 font-normal absolute">
        {label}
      </span>
    </div>
  );
}
