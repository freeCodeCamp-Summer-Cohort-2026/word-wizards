"use client";

import { CheckIcon } from "@phosphor-icons/react";
import type React from "react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  accent?: "purple" | "green" | "blue" | "amber";
  badge?: string;
  className?: string;
  description?: string;
  icon?: React.ReactNode;
  id: string;
  onSelect: () => void;
  radioPosition?: "top-right" | "right" | "none";
  selected: boolean;
  title: string;
}

export function OptionCard({
  id,
  selected,
  onSelect,
  title,
  description,
  icon,
  badge,
  accent = "purple",
  className,
  radioPosition = "right",
}: OptionCardProps) {
  const accentClasses = {
    amber: selected
      ? "border-amber-500 bg-amber-50/70 shadow-[0_4px_16px_rgba(245,158,11,0.14)]"
      : "border-[#e7e3f3] hover:border-amber-400/40 hover:bg-amber-50/30",
    blue: selected
      ? "border-blue-500 bg-blue-50/70 shadow-[0_4px_16px_rgba(59,130,246,0.14)]"
      : "border-[#e7e3f3] hover:border-blue-400/40 hover:bg-blue-50/30",
    green: selected
      ? "border-emerald-500 bg-emerald-50/70 shadow-[0_4px_16px_rgba(16,185,129,0.14)]"
      : "border-[#e7e3f3] hover:border-emerald-400/40 hover:bg-emerald-50/30",
    purple: selected
      ? "border-[#6c4cf6] bg-[#f5f2ff] shadow-[0_4px_16px_rgba(108,76,246,0.14)]"
      : "border-[#e7e3f3] hover:border-[#6c4cf6]/40 hover:bg-[#faf9ff]",
  }[accent];

  const radioColor = {
    amber: "border-amber-500 bg-amber-500",
    blue: "border-blue-600 bg-blue-600",
    green: "border-emerald-600 bg-emerald-600",
    purple: "border-[#6c4cf6] bg-[#6c4cf6]",
  }[accent];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <button
      aria-pressed={selected}
      className={cn(
        "group relative flex cursor-pointer select-none items-center rounded-2xl border-2 p-4 text-left transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#6c4cf6] focus-visible:ring-offset-2",
        accentClasses,
        className,
      )}
      id={`option-${id}`}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      type="button"
    >
      {/* Optional Top-Right Badge */}
      {badge && (
        <span className="absolute -top-2.5 right-4 rounded-full bg-[#6c4cf6] px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
          {badge}
        </span>
      )}

      {/* Left Icon */}
      {icon && (
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105",
            selected ? "bg-white shadow-sm" : "bg-[#f4f1ff]",
          )}
        >
          {icon}
        </div>
      )}

      {/* Content */}
      <div className={cn("flex flex-1 flex-col", icon ? "ml-3.5" : "")}>
        <div className="flex items-center gap-1.5">
          <span className="text-base font-semibold text-[#111a46]">{title}</span>
        </div>
        {description && <span className="mt-0.5 text-xs text-[#64748b] leading-relaxed">{description}</span>}
      </div>

      {/* Radio Indicator */}
      {radioPosition !== "none" && (
        <div
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
            selected ? radioColor : "border-[#cbd5e1] bg-white group-hover:border-[#94a3b8]",
          )}
        >
          {selected && <CheckIcon className="text-white" size={12} weight="bold" />}
        </div>
      )}
    </button>
  );
}
