import { cn } from "@/lib/utils";

/** Mark only: rising path inside a soft coin/tile */
export const LogoIcon = ({ className, ...props }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={cn("size-9 shrink-0", className)}
    {...props}
  >
    <rect width="40" height="40" rx="12" fill="#10B981" />
    <path
      d="M11 25.5c2.2-1.4 4.1-4.1 5.6-6.6 1.2 1.6 2.6 3 4.4 3.6 2.6.9 5.1-.4 7.5-3.5"
      stroke="#052E1C"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25.2 16.2h4.3v4.3"
      stroke="#052E1C"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12.2" cy="27.2" r="1.6" fill="#052E1C" />
  </svg>
);

/**
 * Full wordmark. Pass `inverted` on dark surfaces so type stays light.
 */
export const Logo = ({ className, inverted = false, ...props }) => (
  <span
    className={cn("inline-flex items-center gap-2.5", className)}
    {...props}
  >
    <LogoIcon className="size-9" />
    <span
      className={cn(
        "text-[1.05rem] font-semibold tracking-[-0.03em]",
        inverted ? "text-zinc-50" : "text-foreground",
      )}
    >
      Smart
      <span className={inverted ? "text-emerald-300" : "text-emerald-600"}>
        {" "}
        Save
      </span>
    </span>
  </span>
);

export default Logo;
