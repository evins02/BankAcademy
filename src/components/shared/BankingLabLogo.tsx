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
    <img
      src="/logo-light.png"
      alt="BankAcademy"
      width={px * 2}
      height={px * 2}
      style={{ width: px, height: px, display: "block", background: "transparent", imageRendering: "auto" }}
      className={cn(className)}
    />
  );
}
