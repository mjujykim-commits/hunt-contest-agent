import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[110px] w-full rounded-md border border-white/12 bg-black/30 px-3 py-2 text-sm text-[var(--ink)] placeholder:text-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)]/40",
      className
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";
