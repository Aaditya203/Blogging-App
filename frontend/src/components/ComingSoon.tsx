// components/ComingSoonBadge.tsx
import { Sparkles } from "lucide-react";

export function ComingSoonBadge() {
  return (
    <span className="ml-auto hidden lg:inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-600 animate-pulse">
      <Sparkles className="h-3 w-3" />
      Soon
    </span>
  );
}