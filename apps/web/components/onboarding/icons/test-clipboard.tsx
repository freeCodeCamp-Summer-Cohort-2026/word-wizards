import type React from "react";

export function TestClipboardIcon({
  size = 140,
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      aria-label="Placement Test Clipboard"
      className={className}
      fill="none"
      height={size}
      role="img"
      viewBox="0 0 160 160"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id="boardGrad" x1="20" x2="130" y1="20" y2="150">
          <stop stopColor="#60a5fa" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="paperGrad" x1="35" x2="115" y1="35" y2="140">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#f8fafc" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="pencilGrad" x1="120" x2="145" y1="70" y2="135">
          <stop stopColor="#a855f7" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>

      {/* Board Base */}
      <rect fill="url(#boardGrad)" height="122" rx="10" stroke="#2563eb" strokeWidth="2" width="95" x="25" y="24" />

      {/* Paper Sheet */}
      <rect fill="url(#paperGrad)" height="106" rx="6" width="79" x="33" y="32" />

      {/* Top Clip */}
      <rect fill="#94a3b8" height="14" rx="4" stroke="#64748b" strokeWidth="1.5" width="40" x="52" y="18" />
      <ellipse cx="72" cy="22" fill="#cbd5e1" rx="6" ry="3" />

      {/* Checklist items */}
      {/* Item 1 */}
      <rect fill="#dcfce7" height="12" rx="3" stroke="#22c55e" strokeWidth="1.5" width="12" x="42" y="46" />
      <path d="M45 52l2 2 5-5" stroke="#16a34a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <rect fill="#cbd5e1" height="4" rx="2" width="42" x="60" y="50" />

      {/* Item 2 */}
      <rect fill="#dcfce7" height="12" rx="3" stroke="#22c55e" strokeWidth="1.5" width="12" x="42" y="68" />
      <path d="M45 74l2 2 5-5" stroke="#16a34a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <rect fill="#cbd5e1" height="4" rx="2" width="38" x="60" y="72" />

      {/* Item 3 */}
      <rect fill="#dcfce7" height="12" rx="3" stroke="#22c55e" strokeWidth="1.5" width="12" x="42" y="90" />
      <path d="M45 96l2 2 5-5" stroke="#16a34a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <rect fill="#cbd5e1" height="4" rx="2" width="32" x="60" y="94" />

      {/* Item 4 */}
      <rect fill="#f1f5f9" height="12" rx="3" stroke="#94a3b8" strokeWidth="1.5" width="12" x="42" y="112" />
      <rect fill="#cbd5e1" height="4" rx="2" width="28" x="60" y="116" />

      {/* Pencil */}
      <g transform="rotate(-30 125 100)">
        {/* Pencil body */}
        <rect fill="url(#pencilGrad)" height="65" rx="3" width="14" x="110" y="50" />
        {/* Eraser */}
        <rect fill="#f43f5e" height="8" rx="2" width="14" x="110" y="44" />
        <rect fill="#cbd5e1" height="4" width="14" x="110" y="50" />
        {/* Tip */}
        <polygon fill="#fde68a" points="110,115 124,115 117,130" />
        <polygon fill="#1e293b" points="115,125 119,125 117,130" />
      </g>
    </svg>
  );
}
