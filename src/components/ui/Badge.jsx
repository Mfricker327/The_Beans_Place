import { cn } from "../../lib/utils";

export default function Badge({ children, className, variant = "default", ...props }) {
  const variants = {
    default: "bg-[var(--brown-100)] text-[var(--brown-800)] border border-[var(--brown-300)]",
    outline:
      "border border-[var(--brown-600)]/40 bg-transparent text-[var(--brown-700)]",
    accent:
      "bg-[var(--amber)]/20 text-[var(--brown-800)] border border-[var(--amber)]/40",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
