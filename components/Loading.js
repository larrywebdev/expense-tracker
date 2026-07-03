"use client";
import { useLinkStatus } from "next/link";

export function NavIcon({ Icon, className }) {
  const { pending } = useLinkStatus();

  if (pending) {
    return (
      <span className={`flex items-center justify-center gap-0.5 ${className}`}>
        <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1 h-1 rounded-full bg-current animate-bounce" />
      </span>
    );
  }

  return <Icon className={className} />;
}
