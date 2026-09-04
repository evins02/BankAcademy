import Image from "next/image";
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
    <Image
      src="/logo-light.png"
      alt="BankAcademy"
      width={px}
      height={px}
      quality={100}
      style={{ display: "block" }}
      className={cn(className)}
    />
  );
}
