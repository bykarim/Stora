import { cn } from "@/lib/utils";

/** Renard géométrique minimaliste — reprend le logo 1keti. */
export function FoxMark({
  className,
  strokeWidth = 5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* contour de la tête + oreilles */}
      <path d="M16 16 L13 53 L50 82 L87 53 L84 16 L60 41 L50 33 L40 41 Z" />
      {/* oreilles internes */}
      <path d="M27 25 L34 39" />
      <path d="M73 25 L66 39" />
      {/* yeux */}
      <path d="M29 52 L42 48 L37 57 Z" fill="currentColor" stroke="none" />
      <path d="M71 52 L58 48 L63 57 Z" fill="currentColor" stroke="none" />
      {/* museau + truffe */}
      <path d="M50 58 L44 53" />
      <path d="M50 58 L56 53" />
      <path d="M45 65 L55 65 L50 72 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  wordClassName,
  showWord = true,
}: {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
  showWord?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <FoxMark className={cn("h-7 w-7 text-ink", markClassName)} />
      {showWord && (
        <span
          className={cn(
            "text-[1.4rem] font-semibold tracking-tight text-ink",
            wordClassName
          )}
        >
          1keti
        </span>
      )}
    </span>
  );
}
