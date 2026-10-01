import type React from "react";

interface OwlMascotProps extends React.SVGProps<SVGSVGElement> {
  showBooks?: boolean;
  size?: number;
}

export function OwlMascot({ size = 180, showBooks = true, className, ...props }: OwlMascotProps) {
  return (
    <svg
      aria-label="Word Wizards Owl Mascot"
      className={className}
      fill="none"
      height={showBooks ? size : size * 0.85}
      role="img"
      viewBox={showBooks ? "0 0 200 200" : "0 0 200 160"}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id="hatGradient" x1="60" x2="140" y1="20" y2="90">
          <stop stopColor="#7c3aed" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="bodyGradient" x1="60" x2="140" y1="70" y2="150">
          <stop stopColor="#b45309" />
          <stop offset="1" stopColor="#78350f" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="bellyGradient" x1="80" x2="120" y1="95" y2="135">
          <stop stopColor="#fef3c7" />
          <stop offset="1" stopColor="#fde68a" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="book1" x1="40" x2="160" y1="140" y2="155">
          <stop stopColor="#22c55e" />
          <stop offset="1" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="book2" x1="35" x2="165" y1="155" y2="170">
          <stop stopColor="#0284c7" />
          <stop offset="1" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="book3" x1="30" x2="170" y1="170" y2="190">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
      </defs>

      {/* Book stack if enabled */}
      {showBooks && (
        <g id="books">
          {/* Bottom Book: Grow */}
          <rect fill="url(#book3)" height="18" rx="4" width="140" x="30" y="172" />
          <path d="M30 178h140" opacity="0.6" stroke="#4338ca" strokeWidth="2" />
          <rect fill="#e0e7ff" height="14" rx="2" width="7" x="25" y="174" />
          <text
            fill="#ffffff"
            fontFamily="sans-serif"
            fontSize="9"
            fontWeight="700"
            textAnchor="middle"
            x="100"
            y="185"
          >
            Grow
          </text>

          {/* Middle Book: Practice */}
          <rect fill="url(#book2)" height="17" rx="4" width="128" x="36" y="156" />
          <path d="M36 162h128" opacity="0.6" stroke="#075985" strokeWidth="2" />
          <rect fill="#e0f2fe" height="13" rx="2" width="7" x="31" y="158" />
          <text
            fill="#ffffff"
            fontFamily="sans-serif"
            fontSize="9"
            fontWeight="700"
            textAnchor="middle"
            x="100"
            y="168"
          >
            Practice
          </text>

          {/* Top Book: Learn */}
          <rect fill="url(#book1)" height="16" rx="4" width="116" x="42" y="141" />
          <path d="M42 147h116" opacity="0.6" stroke="#15803d" strokeWidth="2" />
          <rect fill="#dcfce7" height="12" rx="2" width="7" x="37" y="143" />
          <text
            fill="#ffffff"
            fontFamily="sans-serif"
            fontSize="9"
            fontWeight="700"
            textAnchor="middle"
            x="100"
            y="153"
          >
            Learn
          </text>
        </g>
      )}

      {/* Magic Wand in wing */}
      <g id="wand">
        <line stroke="#d97706" strokeLinecap="round" strokeWidth="4" x1="140" x2="165" y1="105" y2="70" />
        <polygon fill="#fbbf24" points="165,65 168,72 175,73 170,78 171,85 165,81 159,85 160,78 155,73 162,72" />
        <circle cx="172" cy="62" fill="#fef08a" r="2" />
        <circle cx="156" cy="88" fill="#fef08a" r="1.5" />
      </g>

      {/* Owl Body */}
      <ellipse cx="100" cy="105" fill="url(#bodyGradient)" rx="40" ry="38" />

      {/* Wings */}
      <ellipse cx="64" cy="110" fill="#78350f" rx="12" ry="24" transform="rotate(18 64 110)" />
      <ellipse cx="136" cy="110" fill="#78350f" rx="12" ry="24" transform="rotate(-18 136 110)" />

      {/* Owl Belly */}
      <ellipse cx="100" cy="114" fill="url(#bellyGradient)" rx="24" ry="25" />
      {/* Belly feather marks */}
      <path
        d="M92 110q8 4 16 0M92 118q8 4 16 0M94 126q6 3 12 0"
        fill="none"
        opacity="0.5"
        stroke="#d97706"
        strokeLinecap="round"
        strokeWidth="2"
      />

      {/* Owl Eyes Background */}
      <circle cx="84" cy="88" fill="#ffffff" r="15" stroke="#fef3c7" strokeWidth="3" />
      <circle cx="116" cy="88" fill="#ffffff" r="15" stroke="#fef3c7" strokeWidth="3" />

      {/* Pupils */}
      <circle cx="85" cy="88" fill="#1e1b4b" r="8" />
      <circle cx="115" cy="88" fill="#1e1b4b" r="8" />
      {/* Eye glint */}
      <circle cx="83" cy="85" fill="#ffffff" r="3" />
      <circle cx="113" cy="85" fill="#ffffff" r="3" />
      <circle cx="87" cy="90" fill="#ffffff" r="1.5" />
      <circle cx="117" cy="90" fill="#ffffff" r="1.5" />

      {/* Beak */}
      <polygon fill="#f59e0b" points="100,92 94,101 106,101" stroke="#d97706" strokeLinejoin="round" strokeWidth="1" />

      {/* Wizard Hat */}
      <g id="wizard-hat">
        {/* Hat Rim */}
        <ellipse cx="100" cy="68" fill="#4338ca" rx="46" ry="12" />
        <ellipse cx="100" cy="67" fill="#4f46e5" rx="42" ry="9" />
        {/* Hat Cone */}
        <path d="M68 66 Q88 35 96 16 Q100 12 106 18 Q120 40 132 66 Z" fill="url(#hatGradient)" />
        {/* Hat Band */}
        <path d="M69 64 C80 69 120 69 131 64 L132 60 C120 65 80 65 68 60 Z" fill="#f59e0b" />
        {/* Stars on Hat */}
        <polygon
          fill="#fde047"
          opacity="0.9"
          points="98,34 100,38 104,39 101,42 102,46 98,44 94,46 95,42 92,39 96,38"
        />
        <circle cx="112" cy="48" fill="#fde047" opacity="0.8" r="2" />
        <circle cx="86" cy="52" fill="#fde047" opacity="0.8" r="1.5" />
      </g>

      {/* Feet */}
      {showBooks && (
        <g id="feet">
          <ellipse cx="88" cy="141" fill="#f59e0b" rx="6" ry="3" />
          <ellipse cx="112" cy="141" fill="#f59e0b" rx="6" ry="3" />
        </g>
      )}

      {/* Magic Sparkles around hat */}
      <polygon fill="#f59e0b" opacity="0.8" points="62,35 64,39 68,40 65,43 66,47 62,45 58,47 59,43 56,40 60,39" />
      <polygon
        fill="#818cf8"
        opacity="0.9"
        points="144,30 146,33 149,34 147,36 148,39 145,37 142,39 143,36 141,34 144,33"
      />
    </svg>
  );
}
