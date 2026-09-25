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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-light.png"
      alt="BankAcademy"
      width={px}
      height={px}
      style={{ display: "block" }}
      className={cn(className)}
    />
  );
}
