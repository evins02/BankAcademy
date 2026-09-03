import { cn } from "@/lib/utils";

const SIZE_MAP = {
  sm: 32,
  md: 44,
  lg: 56,
} as const;

interface BankingLabLogoProps {
  size?: keyof typeof SIZE_MAP;
  className?: string;
}

export function BankingLabLogo({ size = "md", className }: BankingLabLogoProps) {
  const px = SIZE_MAP[size];
  return (
    <>
      {/* Light mode */}
      <img
        src="/logo-light.webp"
        alt="BankAcademy"
        width={px}
        height={px}
        style={{ width: px, height: px, display: "block", background: "transparent" }}
        className={cn("dark:hidden", className)}
      />
      {/* Dark mode */}
      <img
        src="/logo-dark.webp"
        alt="BankAcademy"
        width={px}
        height={px}
        style={{ width: px, height: px, display: "block", background: "transparent" }}
        className={cn("hidden dark:block", className)}
      />
    </>
  );
}
