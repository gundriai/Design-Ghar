import { ReactNode } from "react";

interface HoverEffectProps {
  children: ReactNode;
}

/**
 * CardHoverEffect: A wrapper that adds a modern animated border and glow effect on hover, inspired by Aceternity UI.
 * Usage: <CardHoverEffect> ...card content... </CardHoverEffect>
 */
export function CardHoverEffect({ children }: HoverEffectProps) {
  return (
    <div className="relative group cursor-pointer transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] gap-6">
      {/* Add a soft purple-pink gradient for the gap/transition area between cards */}
      <div className="absolute -inset-1 rounded-2xl blur-lg opacity-0 group-hover:opacity-80 transition duration-700 group-hover:duration-300 z-0 bg-[linear-gradient(120deg,_rgba(168,85,247,0.12)_0%,_rgba(236,72,153,0.10)_100%)] pointer-events-none" />
      <div className="absolute -inset-0.5 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500 group-hover:duration-200 z-10 bg-[linear-gradient(135deg,_rgba(0,174,239,0.18)_0%,_#fff_80%)]" />
      <div className="relative z-20 rounded-xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}
