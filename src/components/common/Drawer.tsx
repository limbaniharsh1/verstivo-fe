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
  footer?: React.ReactNode;
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
  footer,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  closeButtonAriaLabel = "Close drawer",
}: DrawerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Manage body scroll lock & escape key
  useBodyScrollLock(isOpen);
  useEscapeKey(onClose, isOpen);

  // Mount/Unmount timing for exit animations
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const timer = setTimeout(() => setIsVisible(true), 20);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isMounted) return null;

  const positionClasses = {
    right: "fixed inset-y-0 right-0 flex max-w-full pl-0 min-[380px]:pl-10 h-[100dvh]",
    left: "fixed inset-y-0 left-0 flex max-w-full pr-0 min-[380px]:pr-10 h-[100dvh]",
    bottom: "fixed inset-x-0 bottom-0 flex max-h-full pt-10 h-[100dvh]",
    top: "fixed inset-x-0 top-0 flex max-h-full pb-10 h-[100dvh]",
  };

  const getTranslationClass = (pos: DrawerPosition) => {
    switch (pos) {
      case "right":
        return "translate-x-full";
      case "left":
        return "-translate-x-full";
      case "bottom":
        return "translate-y-full";
      case "top":
        return "-translate-y-full";
      default:
        return "translate-x-full";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden h-[100dvh]">
      {/* Dimmed Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ease-in-out h-[100dvh] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div className={positionClasses[position]}>
        {/* Drawer Panel */}
        <div
          className={`w-screen max-w-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out h-full max-h-[100dvh] overscroll-contain ${
            isVisible ? "translate-x-0 translate-y-0" : getTranslationClass(position)
          } ${className}`}
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
          <div className={`flex-1 overflow-y-auto overscroll-contain ${bodyClassName}`}>
            {children}
          </div>

          {/* Fixed Footer */}
          {footer && (
            <div className="shrink-0">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
