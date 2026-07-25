"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useEscapeKey } from "@/hooks/useEscapeKey";

type DrawerPosition = "right" | "left" | "bottom" | "top";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  position?: DrawerPosition;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  closeButtonAriaLabel?: string;
};

export function Drawer({
  isOpen,
  onClose,
  title,
  position = "right",
  children,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  closeButtonAriaLabel = "Close drawer",
}: DrawerProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Manage body scroll lock & escape key
  useBodyScrollLock(isOpen);
  useEscapeKey(onClose, isOpen);

  // Mount/Unmount timing for exit animations
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    } else {
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isMounted) return null;

  const positionClasses = {
    right: "fixed inset-y-0 right-0 flex max-w-full pl-0 min-[380px]:pl-10",
    left: "fixed inset-y-0 left-0 flex max-w-full pr-0 min-[380px]:pr-10",
    bottom: "fixed inset-x-0 bottom-0 flex max-h-full pt-10",
    top: "fixed inset-x-0 top-0 flex max-h-full pb-10",
  };

  const animationClasses = {
    right: isOpen ? "animate-in slide-in-from-right duration-300" : "animate-out slide-out-to-right duration-300",
    left: isOpen ? "animate-in slide-in-from-left duration-300" : "animate-out slide-out-to-left duration-300",
    bottom: isOpen ? "animate-in slide-in-from-bottom duration-300" : "animate-out slide-out-to-bottom duration-300",
    top: isOpen ? "animate-in slide-in-from-top duration-300" : "animate-out slide-out-to-top duration-300",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "animate-in fade-in-0" : "animate-out fade-out-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div className={positionClasses[position]}>
        {/* Drawer Panel */}
        <div
          className={`w-screen max-w-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${animationClasses[position]} ${className}`}
        >
          {/* Header */}
          {title !== undefined && (
            <div
              className={`flex items-center justify-between px-4 min-[360px]:px-6 py-4 min-[360px]:py-5 border-b border-neutral-200 ${headerClassName}`}
            >
              {typeof title === "string" ? (
                <h2 className="text-lg min-[360px]:text-xl sm:text-2xl font-semibold text-black tracking-tight">
                  {title}
                </h2>
              ) : (
                title
              )}

              <button
                type="button"
                onClick={onClose}
                className="grid size-8 min-[360px]:size-9 place-items-center rounded-full text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label={closeButtonAriaLabel}
              >
                <X size={20} className="sm:size-5.5" strokeWidth={1.8} />
              </button>
            </div>
          )}

          {/* Content Body */}
          <div className={`flex-1 overflow-y-auto ${bodyClassName}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
